const filmModel = require("../model/filmModel");

module.exports = function (app) {
    app.get('/film/all', (req, res) => {
        filmModel.find().then((result) => {
            res.send({ films: result })
        }).catch((error) => {
            res.status(400).send({ message: "Some error occured", error });
        });
    });

    app.post('/film/create', (req, res) => {
        const filmDetails = req.body;

        if (filmDetails.name && filmDetails.image && filmDetails.trailerLink && filmDetails.language && filmDetails.releaseDate) {
            filmModel.create({
                name: filmDetails.name,
                image: filmDetails.image,
                trailerLink: filmDetails.trailerLink,
                language: filmDetails.language,
                releaseDate: filmDetails.releaseDate
            })
            .then(() => {
                res.send({ message: "Film created succesfully", status: 1 });
            })
            .catch(() => {
                res.send({ message: "Error creating the film.", status: 0 });
            })
        } else {
            res.status(400).send({ message: 'required fields missing!' });
        }

    });
}