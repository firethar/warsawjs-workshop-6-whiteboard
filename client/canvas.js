import { Random } from 'meteor/random';
import Objects from '../lib/objects';

Template.canvas.onRendered( function() {
  const canvas = new fabric.Canvas('whiteboard', {
    selection: false,
    renderOnAddOrRemove: true
  });
  //przekazywanie eventu canvasowego
  canvas.on('object:added', function(event) {
    var object = event.target;
    if (object._id) {
      return
    }
    var doc = object.toObject();
    doc._id = Random.id();
    doc.sessionId = Session.get('sessionId');
    Objects.insert(doc);

  });
  canvas.on('object:modified', function(event) {
    //console.log("event.target LOG", event.target);
    var modified = event.target;
    var doc = modified.toObject();  
    //console.log("doc LOG", doc);
   Objects.update(modified._id, {$set: doc});

  });

  canvas.isDrawingMode = Session.get('drawingMode');
  
  Tracker.autorun(function() {
    canvas.isDrawingMode = Session.get('drawingMode');
    canvas.freeDrawingBrush.width = parseInt(Session.get('brushSize'));
    canvas.freeDrawingBrush.color = Session.get('brushColor') ? Session.get('brushColor') : '#000000'; 
  });
  Session.set('brushSize', 10); //setting default value


  Objects.find({sessionId: Session.get('sessionId')}).observeChanges({   //przeszukanie bazy danych i poprzez przekazanie sessionId ofiltrowanie tylko danych z danej sesji
    added: function(id, object) {
      fabric.util.enlivenObjects([object], function ([object]){
        object._id = id;
        canvas.add(object);
      });
    },
    changed: function(id, changed) {
      console.log('id:', id);
      var object = canvas.getObjectById(id);
      console.log('changed:', changed);
      object.set(changed);
      canvas.renderAll();
    },
    removed: function() {
      canvas.clear();
    }
  })
});

fabric.Canvas.prototype.getObjectById = function (id) {
  return this.getObjects().find(function(object) {
    return object._id == id;
  });
};