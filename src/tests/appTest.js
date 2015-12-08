(function() {
  var assert, ut;

  assert = chai.assert;

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
    return it('should set _viewLibrary as an empty object on construction', function () {
      var app;
      app = new Giraffe.App();
      assert(app._viewLibrary != null, "Expected App._viewLibrary not to be null, but it was");
      var isPlainObject = !_.isArray(app._viewLibrary) && !_.isFunction(app._viewLibrary) && _.isObject(app._viewLibrary);
      assert(isPlainObject === true, "Expected app._viewLibrary to be a plain object but it was not");
      assert(_.keys(app._viewLibrary).length === 0, "Expected app._viewLibrary to be empty but it was not");
    });
  });

}).call(this);
