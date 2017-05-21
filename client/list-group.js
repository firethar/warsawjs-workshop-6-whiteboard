Template.list_group.helpers({
  whiteboards : function() {
    return Whiteboards.find().fetch();
  }
});