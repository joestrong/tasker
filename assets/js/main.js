var TaskModel = Backbone.Model.extend({
	defaults: {
		deleted: false
	},
	toggleChecked: function(){
		var currentDone = this.get('done');
		this.set('done', !currentDone);
		this.save();
	}
});
var TaskCollection = Backbone.Collection.extend({
	model: TaskModel,
	url: '/task',
	getInbox: function(){
		var models = this.where({ deleted: false });
		return new TaskCollection(models);
	}
});
var TaskView = Backbone.View.extend({
	tagName: 'div',
	className: 'task',
	events: {
		'click .chkDone': 'toggleChecked',
		'click .delete': 'delete'
	},
	initialize: function(){
		_.bindAll(this, 'render');
		this.model.bind('change', this.render);
	},
	render: function(){
		var checked = '';
		if(this.model.get('done') === true){
			checked = ' checked'
			this.$el.addClass('done');
		}
		this.$el.html('');
		this.$el.append('<input type="checkbox" class="chkDone"' + checked + ' />');
		this.$el.append('<span class="lblText">' + this.model.get('title') + '</span>');
		this.$el.append('<button class="delete">Delete</button>');
		return this;
	},
	toggleChecked: function(){
		this.model.toggleChecked();
	},
	delete: function(){
		this.model.set('deleted', true);
		this.model.save();
	}
});
var TaskCollectionView = Backbone.View.extend({
	initialize: function(){
		_.bindAll(this, 'render');
		this.collection = new TaskCollection();
		this.collection.bind('sync', this.render);
		this.collection.fetch();
	},
	events: {
		'click #btnNew': 'addTask'
	},
	render: function(){
		var that = this;
		this.$el.html('');
		_.each(this.collection.getInbox().models, function(task){
			var taskView = new TaskView({ model: task });
			that.$el.append(taskView.render().el);
		});
		this.$el.append('<input type="text" id="txtNew" />')
		this.$el.append('<button id="btnNew" class="btn">New task</button>');
	},
	addTask: function(){
		var txtNew = this.$el.find('#txtNew'),
			newTask = new TaskModel({ title: txtNew.val() });
		this.collection.add(newTask);
		newTask.save();
	}
});


var taskCollectionView = new TaskCollectionView({
	el: document.querySelector('.app')
});