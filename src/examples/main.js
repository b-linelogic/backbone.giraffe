'use strict';

requirejs.config({
	paths: {
		"text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
	}
});

define(['text!template1.htm'], function(templates_1){

	var $template_container = $(templates_1);
	Giraffe.cacheTemplates( $template_container.find("template") );

	var Views = {
		home: Giraffe.View.extend({
			templateStrategy: "cache",
			template: "home",
			afterRender: function () {
				console.log();
			}
		}),
		myNamedView: Giraffe.View.extend({
			//templateStrategy: "cache",
			template: "MyNamedView"
		})
	};

	Giraffe.addNamedViews(Views);

	var ThisApp = new Giraffe.App({
		templateStrategy: "cache",
		template: "app",

		routes: {
			'': 'route:home',
			'/': 'route:home',
			'about': 'route:about',
			'contact': 'route:contact',
			'myNamedView': 'route:myNamedView'
		},
		appEvents: {
			/**
			 * Handler for the home route
			 * @param opts {Object} TODO: Verify this param. Look in backbone
			 * @param route {String} The url
			 * @method route:home
			 */
			'route:home': function (opts, route) {
				this.navigateToView('home');
			},
			/**
			 * Handler for a generic route event. The route param is used to
			 * @param opts {Object} TODO: Verify this param. Look in backbone
			 * @param route {String} The url
			 * @method route:home
			 * @param opts
			 * @param route
			 */
			'route:myNamedView': function (opts, route) {
				this.navigateToView('myNamedView');
			}
		},
		/**
		 * Handler for any data-gf-click="back" attribute in the html
		 * @method back
		 */
		back: function () {
			Backbone.history.history.back();
		},

		afterRender:function(){
			console.log("App is rendered");
		}
	});
	ThisApp.attachTo("#GIRAFFE_APP");
	Backbone.history.start(); // IMPORTANT. Required for route events to trigger. See http://backbonejs.org/#History-start
});

