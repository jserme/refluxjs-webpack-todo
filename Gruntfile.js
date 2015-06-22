module.exports = function(grunt) {
  var options = {
    port: 8080
  };

  grunt.initConfig({
    options: options,
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          port: options.port,
          base: '.'
        }
      }
    },
    watch: {
        files: ['js/**'],
        tasks: ['exec:webpack']
    },
    exec: {
      webpack: {
        cmd: './node_modules/.bin/webpack --progress --colors'
      }
    }
  });

  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['exec', 'connect', 'watch']);
};
