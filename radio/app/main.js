$(function(){
// https://dirble.com/api-doc#get-all-stations
// http://music.163.com/#/playlist?id=109716611

var PAGE_ITEMS = 30;
var _app;
var _audio;
var _currentIndex = 0;

function init(){
	_app = new AppView({collection: new RadioList(), el:$('#cw-playlist tbody')});
    _app.collection.on('on-item-click', onItemClick);
    $('#btn-prev').click(onBtnPrevClick);
    $('#btn-next').click(onBtnNextClick);
    $('#btn-play').click(onBtnPlayClick);
	//default
	// getRadioList(0, onGetListCallback);
}

var RadioModel = Backbone.Model.extend({
  defaults: function() {
    return {
        selected: false,
        country: '',
        cover: '',
        name: '',
        title: '',
        website: '',
        date: '',
        stream:''
    };
  }
});

var RadioView = Backbone.View.extend({
  tagName: 'tr',
  template: _.template($('#template-radio-item').html()),
  events: {
    'click a' : 'onClick',
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.update);
    this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  },
  update: function(){
    //if it's selected
    if(this.model.get('selected')){
        this.onClick();
    }
  },
  onClick: function(){
    var data = _.clone(this.model.attributes);
    data.index = this.collection.indexOf(this.model);
    this.collection.trigger('on-item-click', data);
    this.$el.addClass('selected');
  }
});

var RadioList = Backbone.Collection.extend({
  model: RadioModel,
  url : "http://us.ibio8.com/labs/jsonp.php",
  sync : function(method, collection, options) {
    // By setting the dataType to "jsonp", jQuery creates a function
    // and adds it as a callback parameter to the request, e.g.:
    // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
    // If you want another name for the callback, also specify the
    // jsonpCallback option.
    // After this function is called (by the JSONP response), the script tag
    // is removed and the parse method is called, just as it would be
    // when AJAX was used.
    options.dataType = "jsonp";
    return Backbone.sync(method, collection, options);
  },
  parse : function(response) {
    var list = [];
    var reg = /^https?:\/\//;
    _.each(response, function(o){
        if(o.streams && o.streams.length > 0 && reg.test(o.streams[0].stream)){
            list.push({
                name:o.name, 
                country:o.country, 
                image:o.image.thumb.url || 'res/no-image.gif', 
                website:o.website, 
                title:o.categories[0].title, 
                stream:o.streams[0].stream, 
                date:new Date(o.created_at).toDateString()
            });
        }
    }, this);
    //
    return list;
  }
});

var AppView = Backbone.View.extend({
  el: null,
  initialize: function() {
    var page = 1;
    var data = {
        'ibio-url':encodeURIComponent('http://api.dirble.com/v2/stations?token=46fdae797a4f18a50cbd335c4b&page=' + page + '&per_page=' + PAGE_ITEMS)
    };
    //order by
    // this.collection.comparator = 'name';
    this.listenTo(this.collection, 'reset', this.addAll);
    this.collection.fetch({reset:true, data:data});
  },
  addOne: function(model) {
    var view = new RadioView({model:model, collection:this.collection});
    this.$el.append(view.render().el);
  },
  addAll: function() {
    this.$el.empty();
    this.collection.each(function(model){
      this.addOne(model);
    }, this);
    //default play the first one
    this.collection.at(_currentIndex).set('selected', true);
  }
});

function onItemClick(data){
    _currentIndex = data.index;
    _app.$('tr').removeClass('selected');
    $('#cwrp-splash h1').text(data.title + ' - ' + data.name);
    $('#cwr-cover img').prop('src', data.image);
    if(_audio){
        _audio.pause();
    }
    console.log(data.stream);
    $('#btn-play').addClass('status-pause');
    _audio = new Audio(data.stream);
    _audio.play();    
}

function onBtnPrevClick(){
    _app.collection.at(_currentIndex).set('selected', false);
    _currentIndex--;
    if(_currentIndex < 0){
        _currentIndex = _app.collection.length - 1;
    }
    console.log(_currentIndex);
    _app.collection.at(_currentIndex).set('selected', true);
}

function onBtnNextClick(){
    _app.collection.at(_currentIndex).set('selected', false);
    _currentIndex++;
    if(_currentIndex >= _app.collection.length){
        _currentIndex = 0;
    }
    console.log(_currentIndex);
    _app.collection.at(_currentIndex).set('selected', true);
}

function onBtnPlayClick(){
    if(_audio){
        //next --> play
        if(_audio.paused){
            $(this).addClass('status-pause');
            _audio.play();
        }else{
            $(this).removeClass('status-pause');
            _audio.pause();
        }
    //the first time
    }else{
        _app.collection.at(_currentIndex).set('selected', true);
    }
}

/*
function getRadioList(page, callback){
	//It's because it starts from 0
	page++;
	$.ajax({
	  url: 'http://us.ibio8.com/labs/jsonp.php',
	  dataType: "jsonp",
      data: {
        'ibio-url' : encodeURIComponent('http://api.dirble.com/v2/stations?token=46fdae797a4f18a50cbd335c4b&page=' + page + '&per_page=' + PAGE_ITEMS)
      },
	  success: callback
	});
}

function onGetListCallback(response){
	console.log(response);

    // var audio = new Audio('http://pub8.di.fm:80/di_vocaltrance');
    // audio.play();
}*/

init();
});