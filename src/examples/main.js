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
				console.log("Rendered home view");
			}
		}),
		myNamedView: Giraffe.View.extend({
			templateStrategy: "cache",
			template: "MyNamedView",
			afterRender: function(){
				console.log("Rendered MyNamedView");
			}
		}),
		aboutView: Giraffe.View.extend({
			templateStrategy: "cache",
			template: "about",
			serialize:function(){
				var params = {};
				if(this.routeInfo === 'A') params.message = 'Using option A <a class="btn btn-warning" href="#about">Up one level</a>'
				else if(this.routeInfo === 'B') params.message = 'Using option B <a class="btn btn-warning" href="#about">Up one level</a>';
				else {
					params.message = 'No extra options received from route. <br/>';
					params.message += '<a class="btn btn-primary" href="#about/a">Path A</a>&nbsp;';
					params.message += '<a class="btn btn-info" href="#about/b">Path B</a>';
				}
				return params;
			},
			afterRender: function(){
				console.log("Rendered AboutView");
			}
		})
	};

	Giraffe.addNamedViews(Views);

	var ThisApp = new Giraffe.App({
		templateStrategy: "cache",
		template: "app",

		routes: {
			'': 'route:home',
			'/': 'route:home',
			'about': 'route:aboutView',
			'about/a': 'route:aboutView_a',
			'about/b': 'route:aboutView_b',
			'contact': 'route:contact',
			'myNamedView': 'route:myNamedView',
			'other': 'route:myNamedView'
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
				this.setMainNav('');
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
				this.setMainNav('other');
			},

			'route:aboutView': function(opts,route){
				this.navigateToView('aboutView');
				this.setMainNav('about');
			},
			'route:aboutView_a': function(opts, route){
				this.navigateToView('aboutView', {routeInfo:'A'});
				this.setMainNav('about');
			},
			'route:aboutView_b': function(opts, route){
				this.navigateToView('aboutView', {routeInfo: 'B'});
				this.setMainNav('about');
			}
		},
		/**
		 * Handler for any data-gf-click="back" attribute in the html
		 * @method back
		 */
		back: function () {
			Backbone.history.history.back();
		},

		/**
		 * @override Backbone.Giraffe.View.afterRender
		 */
		afterRender:function(){
			console.log("App is rendered");
		},

		setMainNav:function(id){
			$("#navbar li").removeClass('active');
			$("#navbar li > a[href='#"+id+"']").closest('li').addClass('active');
		},
	});
	ThisApp.attachTo("#GIRAFFE_APP");
	Backbone.history.start(); // IMPORTANT. Required for route events to trigger. See http://backbonejs.org/#History-start
});

