// global variables
window.skaters = [];
window.glines=[];
window.oldLine={};
window.currentLine={};
N = 0;
numLines = 1;
jam = 1;
lineOut = 1;

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
  return skater.jams / jam;
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
  var info = "";
  info += (skater.size) ? " S" : "";
  info += (skater.agility) ? " A" : "";
  info += (skater.experience) ? " E" : "";
  $('#roster-list').append('<h5 class="roster-entry">' + skater.name + info + '</h5>');
  $('#the-form').trigger('reset');

  addSkaterToLineSelection(skater);
};

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
    document.location.reload();
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
  gameInit();
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
      // alert('found skaters');
      skaters = JSON.parse(skatersStored);
      skaters.forEach((item)=>{
        var info = "";
        info += (item.size) ? " S" : "";
        info += (item.agility) ? " A" : "";
        info += (item.experience) ? " E" : "";

        var tmp = "<h5 class='roster-entry confirmed'>" + item["name"] + info + "</h5>";
        $('#roster-list').append(tmp);
        addSkaterToLineSelection(item);
      });
    }
    // check if lines are set
    var linesStored = window.localStorage.getItem('lines');
    if(linesStored && linesStored !== ''){
      linesStored = JSON.parse(linesStored);
      console.log(linesStored);
      // alert('found lines');
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

function gameInit(){

  var lines = window.localStorage.getItem('lines');
  if(!lines){
    alert('couldn\'t find any lines');
    $('.container').show();
    $('.gameview').hide();
  }
  lines = JSON.parse(lines);
  glines=lines;
  nextLine(glines[0]);
  currentLine = glines[0];
  // setup complete, now just listen for newJam

}

function nextLine(line){
  // set next line html to next line
  $('#next-b1').text("B1: " + line["b1"]);
  $('#next-b2').text("B2: " + line["b2"]);
  $('#next-b3').text("B3: " + line["b3"]);
  $('#next-p').text("P: " + line["p"]);
  $('#next-j').text("J: " + line["j"]);

}

function prevLine(line){
  // set prev line html
  // line arg must be JSON object
  $('#prev-b1').text("B1: " + line["b1"]);
  $('#prev-b2').text("B2: " + line["b2"]);
  $('#prev-b3').text("B3: " + line["b3"]);
  $('#prev-p').text("P: " + line["p"]);
  $('#prev-j').text("J: " + line["j"]);
}

function newJam(){
  jam++;
  $('#jam-count').text("J"+jam);

  lineOut = (lineOut+1) > numLines ? 1 : (lineOut + 1);
  console.log("Sending out line " + lineOut);
  prevLine(currentLine);
  oldLine = currentLine;
  currentLine = getNextLine();
  nextLine(currentLine);
  updateSkaterStats();
}

function getNextLine(){
  // list of skaters currently out, with penalty
  var penalties = [];
  return glines[lineOut - 1];
}

function updateSkaterStats(){

  var stats = "<ul>";
  skaters.forEach((skater)=>{
    // check old line and update the skaters who are on the track
    if(Object.values(oldLine).indexOf(skater.name) >= 0){
      skater.jams++;
    }
    stats += "<li>" + skater.name + ": " + skater.jams + " jams " + skater.sits + " sits " + (100.0*skater.jams/(jam-1)) + "&percnt;</li>"
  });
  $('#skater-stats').html(stats + "</ul>");
}
