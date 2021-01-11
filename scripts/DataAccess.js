const { MongoClient } = require('mongodb');

// get a connection to the database and run any commands needed through a callback
async function getDBConnection(callback)
{
	var client = new MongoClient(process.env.CONNECTION_STRING);

	try
	{
		// connect to the cluster
		await client.connect();
		// get the db
		const db = client.db(process.env.DATABASE_NAME);

		// run the callback and pass it the db connection
		callback(db);
	}
	catch(e)
	{
		// print the error if one is thrown
		console.log(e);
	}
	finally
	{
		// close the db connection no matter what happens
		client.close();
	}
}

module.exports.saveQuestion = function(question) {

};

module.exports.getQuestion = function(id) {
	if(id)
	{

	}
	else
	{
		return null;
	}
};

module.exports.getRandomQuestion = function(category) {

};

