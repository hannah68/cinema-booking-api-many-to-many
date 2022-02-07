const prisma = require('../utils/prisma');


const getSeatByScreenId = async(req, res) => {
    const {screenId} = req.params;
    const seats = await prisma.seat.findMany({
        where: {
            id: parseInt(screenId)
        },
        include: {
            screen: true,
            tickets: true
        }
    })
    res.json({data: seats});
}

module.exports = { getSeatByScreenId }