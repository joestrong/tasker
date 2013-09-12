var TaskModel = Backbone.Model.extend();
var TaskCollection = Backbone.Collection.extend({
	model: TaskModel,
	url: '/task'
});
var TaskView = Backbone.View.extend({
	tagName: 'div',
	className: 'task',
	events: {
		'click .chkDone': 'toggleChecked'
	},
	render: function(){
		this.$el.html('<input type="checkbox" class="chkDone" /><span class="lblText">' + this.model.get('title') + '</span>');
		return this;
	},
	toggleChecked: function(){
		var checkbox = this.$el.find('.chkDone').get(0),
			label = this.$el.find('.lblText').get(0);
		if(checkbox.checked === true){
			this.model.set('done', true);
			label.style.textDecoration = 'line-through';
		}else{
			this.model.set('done', false);
			label.style.textDecoration = 'none';
		}
	}
});
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
			var taskView = new TaskView({ model: task });
			that.$el.append(taskView.render().el);
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