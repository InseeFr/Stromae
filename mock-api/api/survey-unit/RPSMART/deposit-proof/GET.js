const fs = require('fs');
const path = require('path');

module.exports = function (request, response) {
	let targetFileName = './proof.pdf';

	// // Check is a type parameter exist
	// if (request.query.type) {
	// 	// Generate a new targetfilename with that type parameter
	// 	targetFileName = 'GET_' + request.query.type + '.pdf';
	// }
	const filePath = path.join(__dirname, targetFileName);
	// If file does not exist then respond with 404 header
	try {
		fs.accessSync(filePath);
	} catch (err) {
		return response.status(404);
	}
	// Respond with filePath
	response.sendFile(filePath);
};
