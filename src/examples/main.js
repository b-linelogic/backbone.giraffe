requirejs.config({
	paths: {
		"text": "https://cdnjs.cloudflare.com/ajax/libs/require-text/2.0.12/text"
	}
});

define(['text!template1.htm'], function(templates_1){

	var ThisApp = new Giraffe.App({
		templateStrategy: "cache",
		templateName: "home"

	});


	ThisApp.attachTo("#GIRAFFE_APP");
});

