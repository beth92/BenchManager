window.skaters = [];
N = 0;

function Skater(name, jammer, blocker, size, agility, experience) {
  this.name = name;
  this.jammer = jammer;
  this.blocker = blocker;
  this.size = size;
  this.agility = agility;
  this.experience = experience;
  this.jams = 0;
  this.sits = 0;

}

function JSONfromURL(s) {
  s = s.split(RegExp('[=&]'));
  var json = {};
  for(var i = 0; i < s.length; i+= 2){
    json[s[i]] = s[i+1];
  }
  return json;
}

function getPlayRatio(skater){
  return skater.jams / skater.sits;
}

var addSkater = function(){
  form = JSONfromURL($('#the-form').serialize());
  console.log("form is " + JSON.stringify(form));
  var name = form.name;
  var jammer = form.jammer ? true : false;
  var blocker = form.blocker ? true : false;
  var size = form.size ? true : false;
  var agility = form.agility ? true : false;
  var experience = form.experience ? true : false;
  var skater = new Skater(name, jammer, blocker, size, agility, experience);
  console.log(JSON.stringify(skater));
  skaters.push(skater);
  $('#roster-list').append('<h3>' + skater.name + '</h3>');
  $('#the-form').trigger('reset');
}

$(document).ready(function(){
});
