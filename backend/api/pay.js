module.exports = function (app) {
    app.get('/pay', (req, res) => {
        res.send({ pay: [] });
    });
}