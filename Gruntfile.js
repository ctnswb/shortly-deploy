module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';'
      },
      dist: {
        // the files to concatenate
        src: [
          'app/**/*.js',
          'lib/**/*.js',
          'public/**/*.js',
          'views/**/*.js',
          'server-config.js',
          'server.js'
        ],
        // the location of the resulting JS file
        dest: 'dist/<%= pkg.name %>.js'
      }

    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    eslint: {
      target: [
        'app/**/*.js',
        'lib/**/*.js',
        'public/**/*.js',
        'views/**/*.js',
        'server-config.js',
        'server.js'
      ]
    },

    cssmin: {

    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      pushToRemote: {
        command: 'git push live master'
      },
      prodServer: {
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');


  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  grunt.registerTask('push', ['shell:pushToRemote']);

  grunt.registerTask('test', [
    'mochaTest'
  ]);

  grunt.registerTask('build', [
  ]);

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      // add your production server task here
    } else {
      grunt.task.run([ 'server-dev' ]);
    }
  });

  grunt.registerTask('deploy', [
    // add your deploy tasks here

    // Start your server locally using nodemon
    //grunt.task.run([ 'server-dev' ])

    // Use the live remote to push your local code up to your deployed droplet. Assuming you've already started your deployed code with nodemon you should be able to git push live master and watch your deployed code base update to the world


    // Concatenate files before deployment (grunt-contrib-concat)

    // Uglify your code before deployment. Don't forget to update your views to point to the minified versions of your css and js asset files in the public/dist folder. The folder public/dist is already .gitignored for you, but make sure that you aren't committing your compiled scripts and/or css to your Github repo  (grunt-contrib-uglify)

    // Run eslint before deployment. If eslint fails, the build process should exit

    // Run your Mocha tests before deployment. If any tests fail, the build process should exit

    //Watch your source code for changes in order to rerun any of the Grunt tasks you created as is appropriate


  ]);


};
