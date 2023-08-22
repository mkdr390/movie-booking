const ticketModel = require('../model/ticketmodel')
const theaterModel = require('../model/theaterModel')
const JWT = require('jsonwebtoken');

async function createSeats(theater, seats, date, time) {
    try {
        const theTheater = await theaterModel.findById(theater);


        const theSeats = theTheater.seats;

        const targetedIndex = theSeats.findIndex(seat => seat.date === date);
        const targetedSeats = targetedIndex != -1 ? theSeats[targetedIndex] : {};
        const seatsAvailable = targetedSeats[time] || 100;
        const remainingSeats = seatsAvailable - seats;
        targetedSeats[time] = remainingSeats;
        targetedSeats.date = date;
        let seatNames = [];
        for (i = seatsAvailable; i > remainingSeats; i--) {
            seatNames.push('T' + i.toString());
        }

        const finalSeats = targetedIndex != -1 ? [
            ...(theSeats.splice(0, targetedIndex)),
            targetedSeats,
            ...(theSeats.splice(targetedIndex, theSeats.length)),
        ] : [...theSeats, targetedSeats]



        return {
            seatNames,
            seats: finalSeats
        }



    } catch(err) {
        return {}
    }
}

module.exports = function (app) {
    app.post('/ticket/book', async (req, res) => {
        const bearerToken = req.headers['authorization'] || '';

        // Remove Bearer from string
        token = bearerToken.replace(/^Bearer\s+/, "");

        if (token) {
            let userDetails = null;

            try {
                userDetails = JWT.verify(token, process.env.JWT_SECRET);

                if (userDetails.id) {
                    
                    const bookingData = req.body;

                    if (bookingData.film && bookingData.theater && bookingData.date && bookingData.time && bookingData.seats) {

                        const seats = await createSeats(bookingData.theater, bookingData.seats, bookingData.date, bookingData.time);

                        ticketModel.create({
                            film: bookingData.film,
                            theater: bookingData.theater,
                            date: bookingData.date,
                            time: bookingData.time,
                            paid: false,
                            amount: bookingData.seats * 150,
                            seats: seats.seatNames,
                            user: userDetails.id
                        }).then(async (result) => {
                            await theaterModel.findByIdAndUpdate(bookingData.theater, { seats: seats.seats });
                            res.send({ message: "Ordered ticket successfully!", ticket: result })
                        }).catch((err) => {
                            res.status(400).send({ message: 'Error booking!', error: err })
                        })

                    } else {
                        res.status(400).send({ message: 'Film, Theater, date and time required!' })
                    }
                }
            } catch(err) {
                res.status(400).send(err)
            }
        } else {
            res.status(400).send({ message: 'Authorization needed!' })
        }
    })

    app.put('/ticket/update', async (req, res) => {
        const data = req.body;
        const ticketId = data.ticketId;

        ticketModel.updateOne({ _id: ticketId }, {
            paid: true
        }).then(() => {
            res.send({ message: "Successfully updated the payment" })
        }).catch(() => {
            res.status(400).send({ message: 'Error payment!' })
        })
    })

    app.get('/ticket/details', async (req, res) => {
        const ticketId = req.query.id;

        ticketModel.findOne({ _id: ticketId }).populate(['film', 'theater']).then((result) => {
            res.send({ ticket: result });
        }).catch(() => {
            res.send({ ticket: null })
        })
    })

    app.get('/ticket/theater', async (req, res) => {
        const theaterId = req.query.theater;
        const dateValue = req.query.date;

        if (theaterId) {
            let filter = { theater: theaterId };
            if (dateValue) {
                filter.date = dateValue;
            }
            ticketModel.find(filter).populate('film').then((tickets) => {
                res.send({ tickets: tickets });
            }).catch(() => {
                res.status(400).send({ message: 'Error getting tickets' })
            })
        } else {
            res.status(400).send({ message: 'Theater Id missing!' })
        }
    })

    app.get('/ticket/user', async (req, res) => {
        const userId = req.query.user;

        if (userId) {
            ticketModel.find({ user: userId  }).then((tickets) => {
                res.send({ tickets: tickets });
            }).catch(() => {
                res.status(400).send({ message: 'Error getting tickets' })
            })
        } else {
            res.status(400).send({ message: 'User Id missing!' })
        }
    })
}