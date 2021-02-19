const { request, response } = require('express');
const DataAccess = require('../scripts/DataAccess');

module.exports = function(app) {

	// if the user sends a request to the base url, send them a link to the github page
	app.get('/', (request, response) => {
		response.send('Welcome to TrivAPI. For use instructions visit the GitHub page at: https://github.com/idbart/TriviAPI#readme');
	});

	// for when the user asks for a question
	app.get('/question', async (request, response) => {
		
		// get a random question and send it in JSON format
		var question = await DataAccess.getRandomQuestion();
		response.json(question);
	});
	// for when the user asks for a question by its id
	app.get('/question/:id', async (request, response) => {

		// get a question by its id and send it in JSON format
		var question = await DataAccess.getQuestion(request.params.id);

		if(question)
		{
			response.json(question);
		}
		else
		{
			response.sendStatus(404);
		}
	});

	// for when the user asks for a question of a specific category
	app.get('/question/category/:category', async (request, response) => {

		// get a random question in the given category and send it in JSON format
		var question = await DataAccess.getRandomQuestion(request.params.category);

		if(question)
		{
			response.json(question);
		}
		else
		{
			response.sendStatus(404);
		}
	});

	// for when the user posts a new question
	app.post('/question', async (request, response) => {

		// save a new question in the db with the data in the body of the request
		try
		{
			var newQuestion = await DataAccess.saveQuestion(request.body);

			// set the location header to the URL where the new question can be accessed
			response.location(`/question/${newQuestion._id}`);
			// set the status code to 201 and send the new question back to the client
			response.status(201).json(newQuestion);
		}
		// if there is an error saving the new question, send a 400
		catch(e)
		{
			response.sendStatus(400);
		}
	});
};