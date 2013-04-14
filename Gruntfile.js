module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'lib/**/*.js',
        'test/**/*.js',
        'Gruntfile.js'
      ],
      options: { jshintrc: '.jshintrc' }
    },
    simplemocha: {
      all: {
        options: {
          globals: [],
          timeout: 5000,
          ui: 'tdd',
          ignoreLeaks: false,
          reporter: 'list'
        },
        src: [
          'test/**/*_test.js'
        ]
      }
    },
    watch: {
      all: {
        files: '<%= jshint.all %>',
        tasks: ['ci']
      }
    },
    link: {
      dir : '.'
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-link');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['simplemocha']);
  grunt.registerTask('ci', ['link', 'lint', 'test']);
  grunt.registerTask('default', ['ci', 'watch']);
};
