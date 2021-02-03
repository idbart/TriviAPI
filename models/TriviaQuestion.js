
// the model for a question
module.exports = class TriviaQuestion {
	constructor(id, question, answer, source) 
	{
		// every question must have an id, an answer, and a source for the information (could be a url or a book or anything)
		this._id = id;
		this.question = question;
		this.answer = answer;
		this.source = source;
	}
};