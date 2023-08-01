module.exports = function (app) {
    app.get('/bookshow', (req, res) => {
        res.send({ bookshow: [] });
    });
}