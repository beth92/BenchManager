// global variables
window.skaters = [];
N = 0;
numLines = 1;

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

  addSkaterToLineSelection(skater);
}

function submitRoster() {
  if(window.localStorage && window.skaters.length > 0 ) {
    window.localStorage.setItem('skaters', JSON.stringify(skaters));
  } else {
    alert("Either your roster is blank or your browser sucks.");
  }
  $('.roster-entry').addClass('confirmed');
  // if(skaters.length >= 7 && $('line-btn').
}

function clearRoster() {
  skaters=[];
  if(window.localStorage){
    window.localStorage.clear();
    $('#roster-list').html("");
  }
}

function addSkaterToLineSelection(skater) {
  if(skater.name && skater.name !== ''){
    $('.select-player').append('<option>' + skater.name + '</option>');
  }
}

function addLine(){
  numLines++;
  var line1 = document.getElementById('line-1');
  newLine = line1.cloneNode(true);
  newLine.id="line-" + numLines;
  $('#lines-container').append(newLine);
  return;

}

function startGame(){
  // register lines in localStorage before moving to new page
  if(submitLines()){
    $('.container').hide();
    $('.gameview').show();
  }
}

function submitLines() {
  if(window.localStorage){
    var lines = [];
    var lineDivs = document.getElementsByClassName('line');
    if(numLines !== lineDivs.length){
      alert("you have a problem");
      return false;
    }
    for(var i = 1; i <= numLines; i++){
      var line={};
      $('#line-1 select.b1')
      var selector = "#line-" + i + " select."
      line['b1'] = $(selector + "b1").val();
      line['b2'] = $(selector + "b2").val();
      line['b3'] = $(selector + "b3").val();
      line['p'] = $(selector + "pivot").val();
      line['j'] = $(selector + "jammer").val();
      lines.push(line);
    }
  } else {
    alert("This app will not work in your browser.")
    return;
  }
  console.log("Lines are as follows: \n" + JSON.stringify(lines));
  window.localStorage.setItem('lines', JSON.stringify(lines));
  return true;

}

$(document).ready(function(){
  // check if roster has previously been set
  if(window.localStorage) {
    var skatersStored = window.localStorage.getItem('skaters');
    if(skatersStored && skatersStored !== ''){
      alert('found skaters');
      skaters = JSON.parse(skatersStored);
      skaters.forEach((item)=>{
        var tmp = "<h5 class='roster-entry confirmed'>" + item["name"] + "</h5>";
        $('#roster-list').append(tmp);
        addSkaterToLineSelection(item);
      });
    }
    // check if lines are set
    var linesStored = window.localStorage.getItem('lines');
    if(linesStored && linesStored !== ''){
      linesStored = JSON.parse(linesStored);
      console.log(linesStored);
      alert('found lines');
      //numLines = linesStored.length;
      linesStored.forEach((item, index)=>{
        if(index !== 0 ) {
          addLine();
        }
      });
      // TODO: set lines to what they were before
    }
  }


});
