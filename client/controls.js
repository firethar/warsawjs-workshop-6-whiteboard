Template.controls.events({
  'change #drawingMode' : function(event) {
    Session.set('drawingMode', event.target.checked);
  },
  'change #brushSize' : function(event) {
    Session.set('brushSize', event.target.value);
  },
  'change #brushColor' : function(event) {
    Session.set('brushColor', event.target.value);
  },
  'click #clearCanvas' : function(event) {
    //console.log("clear");
    Meteor.call('clearCanvas');
  }
});

Template.controls.helpers({
  drawingMode : function() {
    return Session.get('drawingMode'); 
  },
  brushSize : function() {
    return Session.get('brushSize'); //wyswietla wartosc w html
  }
});