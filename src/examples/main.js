requirejs.config({
	paths: {
		"text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
	}
});

define(['text!template1.htm'], function(templates_1){

	var $template_container = $(templates_1);
	Giraffe.cacheTemplates( $template_container.find("template") );

	var ThisApp = new Giraffe.App({
		templateStrategy: "cache",
		template: "home",

		routes: {
			'': 'route:home',
			'/': 'route:home',
			'about': 'route:about',
			'contact': 'route:contact'
		},
		appEvents: {

		},

		afterRender:function(){
			console.log("App is rendered");
		}
	});




	ThisApp.attachTo("#GIRAFFE_APP");
});

