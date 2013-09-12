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
		this.collection.bind('add', this.render);
		this.collection.fetch();
	},
	events: {
		'click #btnNew': 'addTask'
	},
	render: function(){
		var that = this;
		this.$el.html('');
		_.each(this.collection.models, function(task){
			that.$el.append('<div class="task"><input type="checkbox" class="chkDone" />' + task.get('title') + '</div>');
		});
		this.$el.append('<input type="text" id="txtNew" />')
		this.$el.append('<button id="btnNew" class="btn">New task</button>');
	},
	addTask: function(){
		var txtNew = this.$el.find('#txtNew');
		this.collection.add({ title: txtNew.val() });
		console.log(this.collection.models);
	}
});


var taskCollectionView = new TaskCollectionView({
	el: document.querySelector('.app')
});