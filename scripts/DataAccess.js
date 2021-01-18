const { MongoClient } = require('mongodb');

// get a connection to the database and run any commands needed through a callback
function getDBConnection()
{
	return new Promise(async function (resolve, reject) {

		var client = new MongoClient(process.env.CONNECTION_STRING, { useUnifiedTopology: true });

		try
		{
			// connect to the cluster
			await client.connect();
	
			if (process.env.DEBUG) console.log(client.isConnected() ? "db connection sucessfull" : "db connection unsucessfull");
			
			// get the db
			const db = client.db(process.env.DATABASE_NAME);
	
			resolve(db);
		}
		catch(e)
		{
			// print the error if one is thrown
			if(process.env.DEBUG) console.log("ERROR: ", e);
			reject(e);
		}

		// idk wtf is happening hear
		// ill figure it out later 

		// finally
		// {
		// 	// close the db connection no matter what happens
		// 	client.close();
		// }
	});
}

module.exports.saveQuestion = function(question) {

};

module.exports.getQuestion = async function(id) {
	if(id)
	{

	}
	else
	{
		return null;
	}
};

module.exports.getRandomQuestion = function(category) {
	
	return new Promise(async function(resolve, reject) {
		try
		{
			// get a connection to the db and the collection
			var conn = await getDBConnection();
			var collection = conn.collection('questions');

			if(category)
			{

			}
			else
			{
				// find a way to explain this later
				var count = await collection.countDocuments();
				var id = Math.ceil(Math.random() * count) - 1;

				var data = await collection.findOne({ id });
				resolve(data);
			}
		}
		catch(e)
		{
			if(process.env.DEBUG) console.log("ERROR: ", e);
			reject(e);
		}
	});
};

