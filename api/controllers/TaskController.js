/**
 * TaskController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  createTest: function (req, res) {
  	Task.create({
  		title: 'test task',
  		description: 'test'
  	}).done(function(err){
		res.end('created');
  	});
  }

};
