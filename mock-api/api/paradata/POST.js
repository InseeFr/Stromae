module.exports = function (request, response) {
    response.sendFile('POST.json', { root: __dirname });
}