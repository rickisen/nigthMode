module.exports = function (grunt) {
  // Loads all required grunt tasks
  require('load-grunt-tasks')(grunt);
  // Displays execution time of each task
  require('time-grunt')(grunt);
  // Register all tasks
  // grunt.loadTasks('tasks');

  // Initialise configuration
  grunt.initConfig({
    /**
     * Application directories.
     */
    dir: {
      build: 'build',
      src: 'src'
    },
    /**
     * Clean build folder.
     */
    clean: ['<%= dir.build %>/'],
    /**
     * Write ES6 today, compile it to ES5.
     */
    browserify: {
      dist: {
        options: {
          transform: [['babelify', { presets: ['es2015'] }]],
          browserifyOptions: { debug: true },
          exclude: ''
        },
        files: {
          '<%= dir.build %>/nightmode.js': ['<%= dir.src %>/**/*.js']
        }
      }
    },
    /**
     * Validates ES6 files via ESLint.
     */
    eslint: {
      options: {
        format: require('eslint-tap'),
        configFile: '.eslintrc'
      },
      target: '<%= dir.src %>/**/*.js'
    },
    /**
     * Run predefined tasks whenever watched file patterns are added, changed or deleted.
     */
    watch: {
      scripts: {
        files: ['<%= dir.src %>/**/*.js'],
        tasks: ['browserify', 'eslint']
      },
    },
    /**
     * Displays notification whether build was a success or error.
     */
    notify: {
      build: {
        options: {
          title: 'Build complete!',
          message: 'Setup was created successfully.'
        }
      }
    }
  });
  
  grunt.registerTask('js', [ 'browserify', 'eslint' ]);
  grunt.registerTask('build', [ 'clean', 'js', 'notify:build' ]);
};

