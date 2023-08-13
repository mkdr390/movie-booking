
const userModel = require("../model/usermodel");


const JWT = require('jsonwebtoken');


async function checkUserWithEmailId(emailId) {
    return await userModel.findOne({ emailId }).exec();
}

async function checkUser(emailId, password) {
    return await userModel.findOne({ emailId, password }).exec();
}

module.exports = function (app) {
    // GET APi to get all the users
    app.get('/users', (req, res) => {
        userModel.find().then((userRes) => {
            res.send({ users: userRes });
        }).catch((error) => {
            res.status(400).send({ message: "Some error occured", error });
        });
    })

    // To create new user//registration
    app.post('/user/create', async (req, res) => {
        const credentials = req.body;

        if (credentials.fullName && credentials.emailId && credentials.phoneNumber && credentials.password) {
            const user = await checkUserWithEmailId(credentials.emailId);

            if (!user) {

                userModel.create({
                    fullName: credentials.fullName,
                    emailId: credentials.emailId,
                    phoneNumber: credentials.phoneNumber,
                    password: credentials.password
                }).then(() => {
                    res.send({ message: "User created succesfully", status: 1 })
                }).catch(() => {
                    res.send({ message: "Error createing the user.", status: 0 })
                })
            } else {
                res.status(400).send({ message: 'User with username already exists.' });
            }

        } else {
            res.status(400).send({ message: 'Fullname, EmailId, phone number or password missing.' });
        }

    });

    // For user login
    app.post('/user/login', async (req, res) => {
        const credentials = req.body;

        if (credentials.emailId && credentials.password) {
            const userDetails = await checkUser(credentials.emailId, credentials.password);

            if (userDetails && userDetails.emailId) {
                const requiredDetails = { id: userDetails._id, emailId: userDetails.emailId, password: userDetails.password, fullName: userDetails.fullName };

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
    app.get('/user/verify', async (req, res) => {
        const bearerToken = req.headers['authorization'] || '';

        // Remove Bearer from string
        token = bearerToken.replace(/^Bearer\s+/, "");

        if (token) {
            let userDetails = null;

            try {
                userDetails = JWT.verify(token, process.env.JWT_SECRET);

                if (userDetails) {
                    const { _doc: actualObj } = await userModel.findOne({ emailId: userDetails.emailId }).exec();

                    const user = {
                        id: actualObj._id,
                        emailId: actualObj.emailId,
                        fullName: actualObj.fullName
                    }

                    res.send(user);
                }
            } catch(err) {
                res.status(400).send(err)
            }
        } else {
            res.status(400).send({ message: 'Token not available' })
        }
    });
}





