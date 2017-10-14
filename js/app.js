// global variables
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
  $('#roster-list').append('<h5 class="roster-entry">' + skater.name + '</h5>');
  $('#the-form').trigger('reset');
}

function submitRoster() {
  if(window.localStorage && window.skaters.length > 0 ) {
    window.localStorage.setItem('skaters', JSON.stringify(skaters));
  } else {
    alert("Either your roster is blank or your browser sucks.");
  }
  $('.roster-entry').addClass('confirmed');
}

function clearRoster() {
  skaters=[];
  if(window.localStorage){
    window.localStorage.setItem('skaters', '');
    $('#roster-list').html("");
  }
}

$(document).ready(function(){
  // check if roster has previously been set
  if(window.localStorage) {
    var skatersStored = window.localStorage.getItem('skaters');
    if(skatersStored && skatersStored !== ''){
      skaters = JSON.parse(skatersStored);
      skaters.forEach((item)=>{
        var tmp = "<h5 class='roster-entry confirmed'>" + item["name"] + "</h5>";
        $('#roster-list').append(tmp);
      });
    }
  }
});
