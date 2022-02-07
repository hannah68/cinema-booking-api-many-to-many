const { PrismaClient } = require('@prisma/client');
const res = require('express/lib/response');
const prisma = new PrismaClient();

async function seed() {
    const customer = await createCustomer();
    const movies = await createMovies();
    const screens = await createScreens();
    await createScreenings(screens, movies);
    await createTickets(customer, screens);
    await createSeats(screens);
    process.exit(0);
}

// create a customer=================================
async function createCustomer() {
    const customer = await prisma.customer.create({
        data: {
            name: 'Alice',
            contact: {
                create: {
                    email: 'alice@boolean.co.uk',
                    phone: '1234567890'
                }
            }
        },
        include: {
            contact: true
        }
    });
    console.log('Customer created', customer);
    return customer;
}

// create movies========================================
async function createMovies() {
    const rawMovies = [
        { title: 'The Matrix', runtimeMins: 120 },
        { title: 'Dodgeball', runtimeMins: 154 },
    ];
    const movies = [];
    for (const rawMovie of rawMovies) {
        const movie = await prisma.movie.create({ data: rawMovie });
        movies.push(movie);
    }
    console.log('Movies created', movies);
    return movies;
}

// create screens=======================================
async function createScreens() {
    const rawScreens = [
        { number: 1 }, { number: 2 }
    ];
    const screens = [];
    for (const rawScreen of rawScreens) {
        const screen = await prisma.screen.create({
            data: rawScreen
        });
        console.log('Screen created', screen);
        screens.push(screen);
    }
    return screens;
}

// create screening====================================
async function createScreenings(screens, movies) {
    const screeningDate = new Date();
    for (const screen of screens) {
        for (let i = 0; i < movies.length; i++) {
            screeningDate.setDate(screeningDate.getDate() + i);

            const screening = await prisma.screening.create({
                data: {
                    startsAt: screeningDate,
                    movie: {
                        connect: {
                            id: movies[i].id
                        }
                    },
                    screen: {
                        connect: {
                            id: screen.id
                        }
                    }
                }
            });
            console.log('Screening created', screening);
        }
    }
}

// create seats=========================================
async function createSeats(screens) {
    const numberOfSeats = 2;

    for(let i = 0; i < screens.length; i++){
        for(let j = 1; j <= numberOfSeats; j++){
            const seat = await prisma.seat.create({
                data: {
                    numberOfSeat: j,
                    screen: {
                        connect: {
                            id: screens[i].id
                        }
                    }
                }
            })
            console.log('seat created', seat);
        }
    }
}

// create tickets======================================
async function createTickets(customer, screens){
    const ticket = await prisma.ticket.create({
        data: {
            screening: {
                create: {
                    screenId: 1,
                    movieId: 1,
                    startsAt: new Date(),
                }
            },
            customer: {
                connect: {
                    id: customer.id
                }
            },
            seats: {
                create: [
                    {
                        seat: {
                            create: {
                                numberOfSeat: 1,
                                screen: {
                                    connect: {
                                        id: screens[0].id
                                    }
                                }
                            }
                        
                        }
                    }
                ]
            }
        }
    })
    console.log('ticket created', ticket);
}


seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));