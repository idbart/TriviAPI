const DBConnection = require('./classes/DBConnection');
const TriviaQuestion = require('../models/TriviaQuestion');
const Parsing = require('./Parsing');

module.exports.saveQuestion = async function(question) {

	var conn = new DBConnection();

	return new Promise(async function(resolve, reject) {

		// verify that the question object contains the proper fields 
		if(Parsing.validateQuestion(question))
		{
			try
			{
				// get a connection to the db and the collection
				var db = await conn.getConn();
				var collection = db.collection('questions'); 

				await collection.insertOne({ 
					category: question.category, 
					question: question.question, 
					answer: question.answer, 
					source: question.source 
				});
				resolve();
			}
			catch(e)
			{
				reject(e);
			}
		}
		else
		{
			reject("question not properly formated");
		}
	});
};

module.exports.getQuestion = async function(id) {
	if(id)
	{
		var conn = new DBConnection();

		return new Promise(async function(resolve, reject) {
			try
			{
				// get a connection to the db and the collection
				var db = await conn.getConn();
				var collection = db.collection('questions');

				// query the db for a document by the provided id and resolve the promise with it
				var data = await collection.findOne({ _id: id });
				resolve(data);
			}
			catch(e)
			{
				if(process.env.DEBUG) console.log("ERROR: ", e);
				resolve(e);
			}
			finally
			{
				conn.close();
			}
		});
	}
	else
	{
		return null;
	}
};

module.exports.getRandomQuestion = function(category) {
	
	return new Promise(async function(resolve, reject) {

		var conn = new DBConnection();
		try
		{
			// get a connection to the db and the collection
			var db = await conn.getConn();
			var collection = db.collection('questions');

			// build a pipeline to get a random document
			var pipeline = [];
			// if a category was given than filter the documents for that category first
			if(category)
			{
				pipeline.push({ $match: { category } });
			}
			pipeline.push({ $sample: { size: 1 } });
			
			// run the pipeline and resolve the promise with the resulting document
			collection.aggregate(pipeline, async function(error, cursor) {

				if(error)
				{
					resolve(error);
				}	
				else 
				{
					resolve(await cursor.next());
				}

				conn.close();
			});
		}
		catch(e)
		{
			conn.close();

			if(process.env.DEBUG) console.log("ERROR: ", e);
			resolve(e);
		}
	});
};

