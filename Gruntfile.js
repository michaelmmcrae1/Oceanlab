// Gruntfile.js

// our wrapper function (required by grunt and its plugins)
// all configuration goes inside this function
module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  // ===========================================================================
  // CONFIGURE GRUNT ===========================================================
  // ===========================================================================
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),
    
    concurrent: {
  dev: {
    tasks: ['nodemon', 'node-inspector', 'watch'],
    options: {
      logConcurrentOutput: true
    }
  }
},
nodemon: {
  dev: {
    script: 'index.js',
    options: {
      nodeArgs: ['--debug'],
      env: {
        PORT: '5455'
      },
      // omit this property if you aren't serving HTML files and 
      // don't want to open a browser tab on start
      callback: function (nodemon) {
        nodemon.on('log', function (event) {
          console.log(event.colour);
        });

        // opens browser on initial server start
        nodemon.on('config:update', function () {
          // Delay before server listens on port
          setTimeout(function() {
            require('open')('http://localhost:5455');
          }, 1000);
        });

        // refreshes browser when server reboots
        nodemon.on('restart', function () {
          // Delay before server listens on port
          setTimeout(function() {
            require('fs').writeFileSync('.rebooted', 'rebooted');
          }, 1000);
        });
      }
    }
  }
},
watch: {
  server: {
    files: ['.rebooted'],
    options: {
      livereload: true
    }
  } 
},

    // all of our configuration will go here
    // configure jshint to validate js files -----------------------------------
    jshint: {
      options: {
        reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
      },

      // when this task is run, lint the Gruntfile and all js files in src
      build: ['Gruntfile.js', 'src/**/*.js']
    },
    
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/js/getSubs2srs.js',
        dest: 'dist/js/getSubs2srs.min.js'
      }
    },
    
    cssmin: {
      options: {
        banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
      },
      build: {
        files: {
          'dist/css/index.min.css': 'src/css/index.css',
          'dist/css/navbar-static-top.min.css': 'src/css/navbar-static-top.css'
        }
      }
    },
   
  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================
  // we can only load these if they are in our package.json
  // make sure you have run npm install so our app can find these


  // Default task(s).
  grunt.registerTask('default', ['uglify', 'jshint', 'cssmin', 'concurrent', 'nodemon', 'watch']);
};
