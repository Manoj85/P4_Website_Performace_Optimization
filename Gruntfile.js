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
                    'dist/views/pizza.html': 'views/pizza.html'
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
                    dest: 'dist/views/css/',
                    ext: '.min.css'
                }]
            }
        },
        uglify: {
            options: {
                mangle: false,
                compress: {
                    drop_console: false,
                    dead_code: true,
                    unused: true
                }
            },

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
                    dest: 'dist/views/js/',
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
                    dest: 'dist/views/images/'
                }]
            }
        },

        /* Clear out the images directory if it exists */
        clean: {
            all: {
                src: ['dist','views/dist'],
            },
            dist: {
                src: ['views/dist'],
            },
        },


        /* Generate the images directory if it is missing */
        mkdir: {
            dev: {
                options: {
                    create: ['dist/img','dist/css','views/dist/css','dist/js','views/dist/js']
                }
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
                        src: ['index.html', 'js/analytics.min.js'],
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
            }
        },

        cache_control: {
            my_target: {
                source: "dist/index.html",
                options: {
                    version: "1.0",
                    links: true,
                    scripts: true,
                    images: true,
                    replace: true,
                    ignoreCDN: true,
                    dojoCacheBust: true
                }
            }
        },

        replace: {
            my_target: {
                src: ['dist/index.html', 'dist/views/pizza.html'],
                overwrite: true, 
                replacements: [{
                    from: '.js', 
                    to: '.min.js'
                },
                {
                    from: '.css',
                    to: '.min.css'
                }]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-responsive-images');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-cache-control');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-mkdir');
    grunt.registerTask('default', ['clean:all', 'mkdir', 'htmlmin',  'cssmin', 'uglify', 'copy', 'compress', 'cache_control', 'replace']);
};
