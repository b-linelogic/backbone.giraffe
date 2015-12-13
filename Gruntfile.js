module.exports = function(grunt){


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: {
			build: {
				src: ["dist/**/*"] /* BE VERY CAREFUL HERE NOT TO CHANGE THIS!!! CLEAN CAN DELETE YOUR SOURCE FILES!!! */
			},
			doc: {
				src: ["dist/docs/**/*"] /* BE VERY CAREFUL HERE NOT TO CHANGE THIS!!! CLEAN CAN DELETE YOUR SOURCE FILES!!! */
			},
			tests:{
				src: ["dist/tests/**/*"] /* BE VERY CAREFUL HERE NOT TO CHANGE THIS!!! CLEAN CAN DELETE YOUR SOURCE FILES!!! */
			}
		},
		uglify: {},
		copy: {},


		jsdoc: {
			dev: {
				src: ['src/*.js'],
				options: {
					destination: 'jsdoc',
					template: "node_modules/ink-docstrap/template",
					configure: "node_modules/ink-docstrap/template/jsdoc.conf.json"
				}
			}
		},

		/*mrdoc: {
			dev: {
				src: 'src',
				target: 'mrdoc',
				options: {
					title: 'Backbone.Giraffe',
					ignore: 'docs,tests,test,template,templates'
					//,
					//template: 'templates/mrdoc.jade'
				}
			}
		},*/

		coffee: {  // we don't do coffee, sorry!  We drink water and do energy shots.
			compile: {
				files: {
					//'src/backbone.giraffe.js': 'src/backbone.giraffe.coffee',
					//'src/backbone.giraffe.contrib.js': 'src/backbone.giraffe.contrib.coffee'
					//'src/tests/utilsTest.js': 'src/tests/utilsTest.coffee',
					//'src/tests/modelTest.js': 'src/tests/modelTest.coffee',
					//'src/tests/routerTest.js': 'src/tests/routerTest.coffee',
					//'src/tests/viewTest.js': 'src/tests/viewTest.coffee',
					//'src/tests/appTest.js': 'src/tests/appTest.coffee',
					//'src/tests/collectionTest.js': 'src/tests/collectionTest.coffee',
					//'src/tests/collectionViewTest.js': 'src/tests/collectionViewTest.coffee',
					//'src/tests/fastCollectionViewTest.js': 'src/tests/fastCollectionViewTest.coffee',
					//'src/tests/configureTest.js': 'src/tests/configureTest.coffee'
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-jsdoc');
	//grunt.loadNpmTasks('grunt-mrdoc');


	grunt.registerTask("minify-only", ['uglify']); // only minifies the .js files.
	grunt.registerTask('clean-only', ['clean:build']); // deletes the /build folder contents.
	grunt.registerTask('cleanbuild', ['clean:build', 'copy:main', 'copy:css', 'copy:js', 'copy:nomin_js', 'uglify']);  // does everything.
	grunt.registerTask('jsdoc', ['jsdoc:dev']);
	grunt.registerTask('mrdoc', ['mrdoc:dev']);
	grunt.registerTask('coffee-compile', ['coffee:compile']);
	//grunt.registerTask('doc', ['clean:doc', 'yuidoc']);

}