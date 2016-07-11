module.exports = function (grunt) {

  grunt.initConfig({
    connect : {
      server : {
        options : {
          port     : 9000,
          base     : 'public/'
        }
      }
    }, 
    watch : {
      project : {
        files   : ['public/**/*.js', 'public/**/*.html', 'public/**/*.json','public/**/*.css', 'public/**/*.scss'],
        options : {
          livereload : true
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //only listen
  grunt.registerTask('default', [
    'connect', 'watch'
  ]);



};
