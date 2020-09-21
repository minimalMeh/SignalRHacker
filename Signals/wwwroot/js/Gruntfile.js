module.exports = function(grunt) {
    grunt.initConfig({
        concat: {
            options: {
              separator: ';',
            },
            dist: {
              src: ['libs/SignalRServiceLib/js/HubService.js', 'libs/SignalRServiceLib/js/ChatService.js', 'libs/SignalRServiceLib/js/UserService.js'],
              dest: 'libs/signalRservicies.js',
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('build', [
        'concat'
    ]);
}