module.exports = function (request, response) {
	console.log(request);
	response.status(200).send();
};
