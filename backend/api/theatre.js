module.exports = function (app) {
    app.get('/theatre', (req, res) => {
        res.send({ theatre: [] });
    });
}