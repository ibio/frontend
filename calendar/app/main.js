$(function() {
// http://holidayapi.com/

var _app;
var _currentYear, _currentJSMonth;
var _selectedModel, _selectedNoteIndex;
var _currentKey;
var _activeDay;
var _currentCountry;

function init(){
  //current
  var date = new Date();
  _currentYear = date.getFullYear();
  _currentJSMonth = date.getMonth();
  _activeDay = date.getDate();
  _currentKey = [_currentYear, _currentJSMonth, date.getDate()].join('-');
  _app = new AppView({collection:new DayMap(), el:$('#ccg-days')});
  _app.collection.on('on-day-click', onDayClick);
  $('#ccp-left').click(onBtnPrevMonthClick);
  $('#ccp-right').click(onBtnNextMonthClick);
  $('#ccnt-btn-add').click(onBtnAddNoteClick);
  $('#ccnbt-btn-return').click(onBtnReturnClick);
  $('#ccnbt-btn-delete').click(onBtnDeleteClick);
  $('#ccnb-text').keyup(onTextKeyUp);
  $('#cc-holidays li a').click(onBtnHolidayClick);
  //start
  // $('#cc-holidays a:eq(0)').click();
  _currentCountry = 'us';
  $('#cc-holidays li.us').addClass('selected');
  changeMonth(_currentYear, _currentJSMonth, _activeDay);
}

//for all modules to use
var DayModel = Backbone.Model.extend({
  defaults: function() {
    /*id type: 2015-9-21*/
    return {
      year: '',
      month: '',
      date: '',
      day: '',
      country: '',
      adjacent:'',
      holidays:'',
      notes: []
    };
  }
});

var DayView = Backbone.View.extend({
  tagName: 'li',
  className: 'day',
  template: _.template($('#template-day').html()),
  events: {
    'click a' : 'onClick',
  },
  initialize: function() {
    this.listenTo(this.model, 'change', this.update);
    this.listenTo(this.model, 'check', this.onClick);
    // this.listenTo(this.model, 'destroy', this.remove);
  },
  render: function(isCurrent) {
    var data = this.model.attributes;
    //weekends
    if(data.day == 0 || data.day == 6){
      this.$el.addClass('weekend');
    }
    if(data.adjacent){
      this.$el.addClass('adjacent');
    }
    //current date
    if(isCurrent){
      this.$el.addClass('current');
    }
    this.$el.html(this.template({date:data.date}));
    this.update(this.model);
    return this;
  },
  update: function(model){
    //update by model
    var notes = model.get('notes') || [];
    var num = (notes.length > 9) ? '9+' : notes.length;
    this.$('span').text(num);
    if(notes.length > 0){
      this.$('span').css('display', 'inline-block');
    }
    if(model.get('holidays')){
      this.$('i').text(model.get('holidays'));
      this.$('i').css('display', 'inline-block');
      this.$('i').css('background', "no-repeat 0 0 url('res/line-" + model.get('country') + ".png')");
      this.$('a').prop('title', model.get('holidays'));
    }
  },
  onClick: function(e){
    this.collection.trigger('on-day-click', this.model);
    this.$el.addClass('selected');
  }
});

var DayMap = Backbone.Collection.extend({
  model: DayModel,
  
  update: function(year, list){
    var models = [];
    _.each(list, function(item){
      var model = new DayModel();
      var key = [year, item.month, item.date].join('-');
      model.set({
        year:year, 
        month:item.month + 1, 
        date:item.date, 
        day:item.day, 
        country:item.country,
        adjacent:item.adjacent, 
        key:key, 
        holidays:item.holidays, 
        notes:retrieveNoteList(key)
      });
      models.push(model);
    }, this);
    this.reset(models);
  }
});

var AppView = Backbone.View.extend({
  el: null,
  initialize: function() {
    //order by
    // this.collection.comparator = 'name';
    this.listenTo(this.collection, 'on-day-click', this.onDayClick);
    this.listenTo(this.collection, 'reset', this.addAll);
    // this.collection.fetch({reset:true});
  },
  addOne: function(model) {
    var view = new DayView({model:model, collection:this.collection});
    this.$el.append(view.render(model.get('key') == _currentKey).el);
  },
  addAll: function() {
    this.$el.empty();
    this.collection.each(function(model){
      this.addOne(model);
    }, this);
  },
  setActiveDay: function(date){
    //temporarily fire the first
    for(var i = 0; i < this.collection.length; i++){
      if(date){
        //selected date
        if(this.collection.at(i).get('date') == date){
          this.collection.at(i).trigger('check');
          break;
        }
      }else{
        if(!this.collection.at(i).get('adjacent')){
          //first day of the current month
          this.collection.at(i).trigger('check');
          break;
        }
      }
    }
  },
  onDayClick: function(){
    this.$('li').removeClass('selected');
  }
});

//event: on-day-click
function onDayClick(model){
  _selectedModel = model;
  //show btn-add
  $('#ccnt-btn-add').css('display', 'inline-block');
  buildNoteList(_selectedModel.get('notes'));
}

function onBtnPrevMonthClick(){
  _currentJSMonth--;
  if(_currentJSMonth < 0){
    _currentYear--;
    _currentJSMonth = 11;
  }
  changeMonth(_currentYear, _currentJSMonth);
}

function onBtnNextMonthClick(){
  _currentJSMonth++;
  if(_currentJSMonth >= 12){
    _currentYear++;
    _currentJSMonth = 0;
  }
  changeMonth(_currentYear, _currentJSMonth);
}

function onBtnAddNoteClick(){
  var notes = _.clone(_selectedModel.get('notes'));
  //the next one
  _selectedNoteIndex = notes.length;
  showNote('');
}

function onBtnReturnClick(){
  var width = $('#cc-grid').width();
  $('#cc-grid').animate({left: 0});
  $('#cc-note-body').animate({left: width});
}

function onBtnDeleteClick(){
  deleteNote();
}

function onTextKeyUp(){
  //view: save the note
  saveNote($(this).val());
}

function onBtnHolidayClick(){
  var $parent = $(this).parent();
  var str = $parent.prop('class') || '';
  str = str.split(' ') || [];
  _currentCountry = str[0];
  $('#cc-holidays li').removeClass('selected');
  $parent.addClass('selected');
  getHolidays(_currentYear, _currentJSMonth + 1, _currentCountry, onHolidaysUpdated);
}

function onNoteItemClick(e){
  var $parent = $(this).parent();
  var notes = _.clone(_selectedModel.get('notes'));
  _selectedNoteIndex = $parent.index();
  $('#ccn-list li').removeClass('selected');
  $parent.addClass('selected');
  showNote(notes[_selectedNoteIndex]);
}

function onHolidaysUpdated(response){
  var holidays = buildHolidays(response.holidays || []);
  _app.collection.update(_currentYear, assembleMonth(_currentYear, _currentJSMonth, _currentCountry, holidays));
  _app.setActiveDay(_activeDay);
}

function getHolidays(year, month, country, callback){
  $.ajax({
    url: 'http://us.ibio8.com/labs/jsonp.php',
    dataType: "jsonp",
      data: {
        'ibio-url' : encodeURIComponent('http://holidayapi.com/v1/holidays?country=' + country + '&year=' + year + '&month=' + month)
      },
    success: callback
  });
}

function changeMonth(year, jsMonth, activeDay){
  _currentYear = year;
  _currentJSMonth = jsMonth;
  _activeDay = activeDay;
  getHolidays(_currentYear, _currentJSMonth + 1, _currentCountry, onHolidaysUpdated);
  setTitleMonth(_currentYear, _currentJSMonth + 1);
}

function setTitleMonth(year, month){
  $('#ccp-center strong').text(year);
  $('#ccp-center').css('background', "no-repeat url('res/m" + month + ".png') 196px 8px");
}

function showNote(content){
  var width = $('#cc-grid').width();
  var obj = _selectedModel.attributes;
  if(content){
    $('#ccnbt-btn-delete').css('display', 'inline-block');
  }else{
    $('#ccnbt-btn-delete').css('display', 'none');
  }
  $('#cc-grid').animate({left: -width});
  $('#cc-note-body').animate({left: 0});
  $('#cc-note-body textarea').val(content);
  $('#cc-note-body textarea').focus();
  $('#ccnb-subtitle').text([obj.month, obj.date, obj.year].join('\/'));
}

function saveNote(content){
  var notes = _.clone(_selectedModel.get('notes'));
  //delate
  if(content == ''){
    notes.splice(_selectedNoteIndex, 1);
    _selectedNoteIndex = 0;
    showNote(notes[_selectedNoteIndex]);
  }else{
    notes[_selectedNoteIndex] = content;
  }
  //to notify the specific view
  _selectedModel.set('notes', notes);
  //save to local
  storeNoteList(_selectedModel.get('key'), notes);
  //TODO: it may exert an efficiency problem by invoking it frequently 
  //update the list
  buildNoteList(notes, _selectedNoteIndex);
}

function deleteNote(){
  var notes = _.clone(_selectedModel.get('notes'));
  notes.splice(_selectedNoteIndex, 1);
  _selectedNoteIndex = 0;
  _selectedModel.set('notes', notes);
  storeNoteList(_selectedModel.get('key'), notes);
  buildNoteList(notes, _selectedNoteIndex);
  showNote(notes[_selectedNoteIndex]);
}

function buildNoteList(list, selectedIndex){
  var template =  _.template($('#template-note-item').html());
  $('#ccn-list a').unbind();
  $('#ccn-list').empty();
  _.each(list, function(item){
    $('#ccn-list').append(template({content:item}));
  });
  $('#ccn-list a').click(onNoteItemClick);
  //selected index
  if(selectedIndex >= 0){
    $('#ccn-list li').eq(selectedIndex).addClass('selected');
  }
}

function storeNoteList(key, list){
  var str = JSON.stringify(list);
  localStorage.setItem(key, str);
}

function retrieveNoteList(key){
  var str = localStorage.getItem(key);
  return JSON.parse(str) || [];
}

function buildHolidays(list){
  var o = {}, str = '';
  for(var i = 0; i < list.length; i++){
    str = list[i].date || '';
    str = str.split('-')[2] || 0;
    str = parseInt(str);
    o[str] = list[i].name || '';
  }
  return o;
}

function assembleMonth(year, month, country, holidays){
  var list = [];
  //the first day of the month
  var date = new Date(year, month, 1);
  var prevDay = date.getDay(), currentDay = 0, daysInMonth = new Date(year, month + 1, 0).getDate();
  //prev one week
  if(prevDay == 0){
    prevDay = 7;
  }
  for(var i = prevDay - 1; i >= 0; i--){
    date = new Date(year, month, -1 * i);
    //month starts from 0; date starts from 1, day starts from 0
    list.push({month:date.getMonth(), date:date.getDate(), day:date.getDay(), adjacent:'prev'});
  }
  //current date
  for(var i = 1; i <= daysInMonth; i++){
    date = new Date(year, month, i);
    list.push({month:date.getMonth(), date:date.getDate(), day:date.getDay(), adjacent:null, country:country, holidays:holidays[date.getDate()]});
  }
  //next week
  // 7 * 6 row
  currentDay = daysInMonth + 1;
  while(list.length < 42){
    date = new Date(year, month, currentDay);
    list.push({month:date.getMonth(), date:date.getDate(), day:date.getDay(), adjacent:'next'});
    currentDay++;
  }
  return list;
}

init();
});