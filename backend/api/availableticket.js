module.exports = function (app) {
    app.get('/availabletickets', (req, res) => {
        res.send({ availabletickets: [] });
    });
}