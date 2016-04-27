module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['js/main.js', 'js/gameover.js', 'js/phase.js', 'js/battle/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat']);

};
