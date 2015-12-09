(function() {
	var assert, expect, ut;

	assert = chai.assert;
	expect = chai.expect;

	ut = window.ut;

	describe('Giraffe', function() {
		describe('Giraffe.addViewToLibrary', function () {
			it('should add a view constructor to the view library', function () {
				var testView = Giraffe.View.extend({text: 'test'});
				Giraffe.addViewToLibrary('test', testView);
				expect(Giraffe.getViewFromLibrary('test')).equals(testView);
			});
			it("should throw an error with a bad name param", function (done) {
				var fakeView = function () {}
				try {
					Giraffe.addViewToLibrary(null, fakeView);
					assert(1 == 2, 'Expected Giraffe.addViewToLibrary to throw an error but it did not');
				} catch (e) {
					expect(e.message).equals('View name to add to library must be a string');
					done();
				}
			});
			it("should throw an error with a bad constructor param", function (done) {
				var badView = {};
				try {
					Giraffe.addViewToLibrary('bad', badView);
					assert(1 == 2, 'Expected Giraffe.addViewToLibrary to throw an error but it did not');
				} catch (e) {
					expect(e.message).equals('View constructor to add to library must be a function');
					done();
				}
			});
		});
		describe("Giraffe.addViewsToLibrary", function () {
			it('should throw an error if the parameter is not an array', function (done) {
				var badViews = [];
				try {
					Giraffe.addViewsToLibrary(badViews);
					assert(1 == 2, 'Expected Giraffe.addViewsToLibrary to throw an error but it did not');
				} catch (e) {
					expect(e.message).equals('Views must be added to view library as an object');
					done();
				}
			});
			it('should add views to the library', function () {
				var testView = Giraffe.View.extend({text: 'hello'})
				var views = {view1: testView, view2: testView, view3: testView};
				Giraffe.addViewsToLibrary(views);
				expect(Giraffe.getViewFromLibrary('view1')).equals(testView);
				expect(Giraffe.getViewFromLibrary('view2')).equals(testView);
				expect(Giraffe.getViewFromLibrary('view3')).equals(testView);
			});
		});
	});

}).call(this);
