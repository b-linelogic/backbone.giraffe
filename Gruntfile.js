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

		coffee: {
			compile: {
				files: {
					'src/backbone.giraffe.js': 'src/backbone.giraffe.coffee',
					'src/backbone.giraffe.contrib.js': 'src/backbone.giraffe.contrib.coffee'
				}
			}
		}
	});


	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-coffee');


	grunt.registerTask("minify-only", ['uglify']); // only minifies the .js files.
	grunt.registerTask('clean-only', ['clean:build']); // deletes the /build folder contents.
	grunt.registerTask('cleanbuild', ['clean:build', 'copy:main', 'copy:css', 'copy:js', 'copy:nomin_js', 'uglify']);  // does everything.

	grunt.registerTask('coffee-compile', ['coffee:compile']);
	//grunt.registerTask('doc', ['clean:doc', 'yuidoc']);

}