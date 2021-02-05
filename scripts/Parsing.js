
module.exports.validateQuestion = function(question) {
	return question.category && question.question && question.answer && question.source;
};