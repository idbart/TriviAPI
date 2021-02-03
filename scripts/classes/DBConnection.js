const { MongoClient } = require('mongodb');

// a class for maintaing a connection to the database
module.exports =  class DBConnection {

	constructor()
	{
		this._client = new MongoClient(process.env.CONNECTION_STRING, { useUnifiedTopology: true });
	}

	// get the db connection
	getConn()
	{
		return new Promise(async (resolve, reject) => {
			if(!this._client.isConnected())
			{
				try
				{
					// connect to the cluster if not already done
					await this._client.connect();
				}
				catch(e)
				{
					// catch the error and print it if the application is in debug 
					if(process.env.DEBUG) console.log("ERROR: ", e);
					reject(e);
				}
			}

			// resolve the promise with a connection to the database
			resolve(this._client.db(process.env.DATABASE_NAME));
		});
	}
	// close the connection
	close()
	{
		this._client.close();
	}
}