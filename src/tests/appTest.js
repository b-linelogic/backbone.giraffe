(function() {
  var assert, expect, ut;

  assert = chai.assert;
  expect = chai.expect;

  ut = window.ut;

  describe('Giraffe.App', function() {
    it('should be OK', function() {
      return assert.ok(new Giraffe.App);
    });
    it('should add an initializer and call it on `start`', function(done) {
      var a;
      a = new Giraffe.App;
      a.addInitializer(function() {
        return done();
      });
      return a.start();
    });
    it('should accept appEvents on extended class', function(done) {
      var MyApp, app;
      MyApp = Giraffe.App.extend({
        appEvents: {
          'app:initialized': function() {
            return done();
          }
        }
      });
      app = new MyApp;
      return app.start();
    });
    it('should accept appEvents as an option', function(done) {
      var app;
      app = new Giraffe.App({
        appEvents: {
          'app:initialized': function() {
            return done();
          }
        }
      });
      return app.start();
    });
    it('should throw an error when asked to navigate to a non existent view', function (done) {
      var app = new Giraffe.App();
      try {
        app.navigateToView('na');
        assert(1 === 0, "App.navigateToView should have thrown an error and it did not");
      } catch (e) {
        expect(e.message).equals('View, na, does not exist');
        done();
      }
    });
    return it('should navigate to an added view', function () {
      var testView = Giraffe.View.extend({
        text: 'TestView'
      });
      var app = new Giraffe.App();
      Giraffe.addViewToLibrary('test2', testView);
      app.navigateToView('test2');
      assert(app.children.length === 1, "Expected app to have 1 child but it had " + app.children.length);
    });
  });

}).call(this);
