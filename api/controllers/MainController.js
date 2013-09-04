/**
 * MainController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

module.exports = {

  index: function (req, res) {
  	Task.find().exec(function(err, tasks){
  		renderView(tasks);
  	});

  	function renderView(tasks){
		res.view({ tasks: tasks });
  	}
  }

};
