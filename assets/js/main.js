var TaskModel = Backbone.Model.extend();
var TaskCollection = Backbone.Collection.extend({
	model: TaskModel,
	url: '/task'
});
var TaskView = Backbone.View.extend();
var TaskCollectionView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
		this.collection = new TaskCollection();
		this.collection.bind('sync', this.render);
		this.collection.fetch();
	},
	render: function(){
		var that = this;
		_.each(this.collection.models, function(task){
			that.$el.append('<div class="task"><input type="checkbox" class="chkDone" />' + task.get('title') + '</div>');
		});
	}
});


var taskCollectionView = new TaskCollectionView({
	el: document.querySelector('.app')
});