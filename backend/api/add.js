module.exports = function (app) {
    app.get('/add', (req, res) => {
        res.send({ add: [] });
    });
}