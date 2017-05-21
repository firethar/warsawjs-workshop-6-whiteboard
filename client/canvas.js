Template.canvas.onRendered( function() {
  console.log("test Log");
  const canvas = new fabric.Canvas('whiteboard', {
    selection: false,
    renderOnAddOrRemove: true
  });
});