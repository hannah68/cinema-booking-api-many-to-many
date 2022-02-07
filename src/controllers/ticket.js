const prisma = require('../utils/prisma');

const createTicket = async(req,res) => {
    const { customerId, screeningId, seatId } = req.body;

    // cusromerId: 1,
    // screeningId: 2, 
    // seatId: [1,2,3]

    let seatsArr = [];

    seatId.forEach((seatId) => {
        seats = {
            seat: {
                connect: {
                    id: seatId,
                },
            },
        };
        seatsArr.push(seats);
    });
//    console.log(seatsArr);

    const createTicket = await prisma.ticket.create({
        data: {
            customer: {
                connect: {
                    id: customerId
                }
            },
            screening: {
                connect: {
                    id: screeningId
                }
            },
            seats: {
                create: seatsArr
            }
        },
        include: {
            customer: true,
            screening: true,
            seats: true,
        }
    })
    return res.json({data: createTicket})
}

module.exports = {
    createTicket
}