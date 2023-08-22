
const theaterModel = require("../model/theaterModel");
const filmModel = require("../model/filmModel");


const JWT = require('jsonwebtoken');

async function checkIsFilmExists(filmId) {
    return await filmModel.findOne({ _id: filmId }).exec();
}


async function checkTheaterWithEmailId(emailId) {
    return await theaterModel.findOne({ emailId }).exec();
}

async function checkTheater(emailId, password) {
    return await theaterModel.findOne({ emailId, password }).exec();
}

module.exports = function (app) {
    // GET APi to get all the users
    app.get('/theater/all', async (req, res) => {
        theaterModel.find().then((theaterRes) => {
            res.send({ theaters: theaterRes });
        }).catch((error) => {
            res.status(400).send({ message: "Some error occured", error });
        });
    })

    app.get('/theater/some', async (req, res) => {
        const filmId = req.query.id || '';

        theaterModel.find({ film: filmId }).then((theaterRes) => {
            res.send({ theaters: theaterRes });
        }).catch((error) => {
            res.status(400).send({ message: "Some error occured", error });
        });
    })

    // To create new user//registration
    app.post('/theater/create', async (req, res) => {
        const credentials = req.body;

        if (credentials.name && credentials.emailId && credentials.location && credentials.password) {
            const theater = await checkTheaterWithEmailId(credentials.emailId);

            if (!theater) {

                theaterModel.create({
                    name: credentials.name,
                    location: credentials.location,
                    emailId: credentials.emailId,
                    password: credentials.password
                }).then(() => {
                    res.send({ message: "Theater created succesfully", status: 1 })
                }).catch(() => {
                    res.send({ message: "Error creating the theater.", status: 0 })
                })
            } else {
                res.status(400).send({ message: 'Theater with email id already exists.' });
            }

        } else {
            res.status(400).send({ message: 'Theater name, and other fields missing.' });
        }

    });

    // For user login
    app.post('/theater/login', async (req, res) => {
        const credentials = req.body;

        if (credentials.emailId && credentials.password) {
            const theaterDetails = await checkTheater(credentials.emailId, credentials.password);

            if (theaterDetails && theaterDetails.emailId) {
                const requiredDetails = { id: theaterDetails._id, emailId: theaterDetails.emailId, password: theaterDetails.password, name: theaterDetails.name };

                const token = JWT.sign(requiredDetails, process.env.JWT_SECRET, { "algorithm": "HS256", expiresIn: '3d' })

                res.send({ token, ...requiredDetails });
            } else {
                res.status(404).send({ message: 'No user found' });
            }
        } else {
            res.status(400).send({ message: 'Username or password missing.' });  
        }
    })

    // User token verify API, use it when refreshing the application
    app.get('/theater/verify', async (req, res) => {
        const bearerToken = req.headers['authorization'] || '';

        // Remove Bearer from string
        token = bearerToken.replace(/^Bearer\s+/, "");

        if (token) {
            let theaterDetails = null;

            try {
                theaterDetails = JWT.verify(token, process.env.JWT_SECRET);

                if (theaterDetails) {
                    const { _doc: actualObj } = await theaterModel.findOne({ emailId: theaterDetails.emailId }).exec();

                    res.send(actualObj);
                }
            } catch(err) {
                res.status(400).send(err)
            }
        } else {
            res.status(400).send({ message: 'Token not available' })
        }
    });

    app.get('/theater/details', async (req, res) => {
        const bearerToken = req.headers['authorization'] || '';

        // Remove Bearer from string
        token = bearerToken.replace(/^Bearer\s+/, "");

        if (token) {
            let theaterDetails = null;

            try {
                theaterDetails = JWT.verify(token, process.env.JWT_SECRET);

                if (theaterDetails) {
                    const { _doc: actualObj } = await theaterModel.findOne({ emailId: theaterDetails.emailId }).populate("film").exec();

                    res.send(actualObj);
                }
            } catch(err) {
                res.status(400).send(err)
            }
        } else {
            res.status(400).send({ message: 'Token not available' })
        }
    });

    app.put('/theater/update', async (req, res) => {
        const data = req.body;
        const bearerToken = req.headers['authorization'] || '';

        // Remove Bearer from string
        token = bearerToken.replace(/^Bearer\s+/, "");

        if (token) {
            theaterDetails = JWT.verify(token, process.env.JWT_SECRET);
    
            if (data.filmId) {
                const film = await checkIsFilmExists(data.filmId);
    
                if (film) {
    
                    theaterModel.findOneAndUpdate({ _id: theaterDetails.id }, {
                        film: data.filmId
                    }).then(() => {
                        res.send({ message: "Theater updated succesfully", status: 1 })
                    }).catch(() => {
                        res.send({ message: "Error udating the theater.", status: 0 })
                    })
                } else {
                    res.status(400).send({ message: 'Theater or film not exist.' });
                }
    
            } else {
                res.status(400).send({ message: 'Theater id or Film id missing.' });
            }
        } else {
            res.status(400).send({ message: 'Authorization required' });
        }
    });

    app.get('/theater/film', async (req, res) => {
        const theaterId = req.query.id;

        if (theaterId) {
            theaterModel.findById(theaterId).exec().then((result) => {
                console.log(result)
                if (result) {
                    res.send({ theater: result });
                } else {
                    res.send({ theater: null });
                }
            }).catch((err) => {
                res.status(400).send({ message: 'Theater error.', error: err });
            });

        } else {
            res.status(400).send({ message: 'Theater id missing in params.' });
        }
    })
}





