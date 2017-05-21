import { Random } from 'meteor/random';

Router.configure({
  layoutTemplate: 'layout',
  loadingTempalte: 'loading'
})

Router.route('/', function () {
  this.render('list_group', {});
});

Router.route('/whiteboard/:id', function () {
  Session.set('sessionId', this.params.id);  //przekazanie parametru id 
  this.render('Whiteboard', {});
});

Router.route('/whiteboard/', function () {
  const sessionId = Random.id();
  Whiteboards.insert({_id: sessionId});
  this.redirect('/whiteboard/', sessionId);
});