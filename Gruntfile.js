/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
 "grunt" alone creates a new, completed images directory
 "grunt clean" removes the images directory
 "grunt responsive_images" re-processes images without removing the old ones
 */

module.exports = function(grunt) {

    grunt.initConfig({

        htmlmin: {
            target: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'index.html',
                    'views/dist/pizza.html': 'views/pizza.html'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'dist/css/',
                    ext: '.min.css'
                },{
                    expand: true,
                    cwd: 'views/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'views/dist/css/',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'js/',
                    src: '*.js',
                    dest: 'dist/js/',
                    ext: '.min.js'
                },{
                    expand: true,
                    cwd: 'views/js/',
                    src: '*.js',
                    dest: 'views/dist/js/',
                    ext: '.min.js'
                }]
            }

        },
        responsive_images: {
            dev: {
                options: {
                    engine: 'im',
                    sizes: [{
                        width: 800 ,
                        suffix: 'large',
                        quality: 50

                    },
                        {
                            width: 600 ,
                            suffix: 'medium',
                            quality: 50
                        },
                        {
                            width: 400 ,
                            suffix: 'small',
                            quality: 50

                        }]
                },

                /*
                 You don't need to change this part if you don't change
                 the directory structure.
                 */
                files: [{
                    expand: true,
                    src: ['*.{gif,jpg,png,jpeg}'],
                    cwd: 'img/',
                    dest: 'dist/img/'
                }, {
                    expand: true,
                    src: ['*.{gif,jpg,png,jpeg}'],
                    cwd: 'views/images',
                    dest: 'views/dist/images/'
                }]
            }
        },

        /* Clear out the images directory if it exists */
        clean: {
            dev: {
                src: ['dist','views/dist'],
            },
        },


        /* Generate the images directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['dist/img','dist/css','views/dist/css','dist/js','views/dist/js']
                },
            }
        },

        compress: {
            main: {
                options: {
                    mode: 'gzip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'dist/',
                        src: ['index.html'],
                        dest: '/'
                    }
                ]
            }
        },

        /* Copy the "fixed" images that don't go through processing into the images/directory */
        copy: {
            dev: {
                files: [{
                    cwd: 'img/',
                    src: '*.{gif,jpg,png}',
                    dest: 'dist/img/',
                    expand: true
                },{
                    cwd: 'views/images/',
                    src: '*.{gif,jpg,png}',
                    dest: 'dist/views/images/',
                    expand: true
                },{
                    cwd: 'views/dist/',
                    src: ['js/*.*', 'css/*.*', '*.html'],
                    dest: 'dist/views/',
                    expand: true
                }]
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.registerTask('default', ['clean', 'mkdir', 'htmlmin', 'compress', 'cssmin', 'uglify', 'copy']);

};
