
module.exports = function(app) {

	// if the user sends a request to the base url, send them a link to the github page
	app.get('/', (request, response) => {
		response.send('Welcome to TrivAPI. For use instructions visit the GitHub page at: https://github.com/idbart/TriviAPI#readme');
	});

	// for when the user asks for a question
	app.get('/question', (request, response) => {

		if(request.query.id)
		{
			
		}
		else
		{

		}
	});

	// for when the user asks for a question of a specific category
	app.get('/question/:category', (request, response) => {

	});

	// for when the user posts a new question
	app.post('/question', (request, response) => {

	});
};