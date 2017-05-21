import { Random } from 'meteor/random';

Router.configure({
  layoutTemplate: 'layout',
  notFoundTemplate: 'notFound',
  loadingTempalte: 'loading'
})

Router.route('/', function () {
  this.render('list_group', {});
});
Router.route('/whiteboard', function () {
  this.render('Whiteboard', {});
});