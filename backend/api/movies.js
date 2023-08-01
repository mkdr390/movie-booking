module.exports = function (app) {
    app.get('/movies', (req, res) => {
        res.send({ movies: [] });
    });
}