const fs = require('fs');
const path = require('path');

module.exports = function (request, response) {
	let targetFileName = './data_.json';
	// Check is a type parameter exist
	if (request.query.type) {
		// Generate a new targetfilename with that type parameter
		targetFileName = 'GET_' + request.query.type + '.json';
	}
	const filePath = path.join(__dirname, targetFileName);
	// If file does not exist then respond with 404 header
	try {
		fs.accessSync(filePath);
	} catch (err) {
		response.statusCode = 301;
		response.end();
	}
	// Respond with filePath
	response.sendFile(filePath);
};
