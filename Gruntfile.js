module.exports = function(grunt) {

	var srcNames = ['main', 'menu', 'battle/underattack/bullet',
		'battle/underattack/player', 'battle/underattack/scene', 'gameover'
	];
	var getPath = function(name) {
		return 'js/' + name + '.js';
	}
	var srcFiles = srcNames.map(getPath);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: srcFiles,
				dest: 'dist/<%= pkg.name %>.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat']);

};
