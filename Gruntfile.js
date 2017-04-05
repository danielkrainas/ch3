module.exports = function(grunt) {
    var babel = require('rollup-plugin-babel')
    var nodeResolve = require('rollup-plugin-node-resolve')
    var commonjs = require('rollup-plugin-commonjs')
    var riot = require('rollup-plugin-riot')
    var uglify = require('rollup-plugin-uglify')
    var ruReplace = require('rollup-plugin-replace')
    var alias = require('rollup-plugin-alias')

    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            app: {
                files: ['src/app/**/*.js', 'src/app/**/*.tag'],
                tasks: ['rollup'],
                options: {
                    livereload: false,
                }
            },

            styles: {
                files: ['src/styles/*.styl'],
                tasks: ['styles'],
                options: {
                    livereload: false,
                }
            }
        },

        copy: {
            dist: {
                files: [
                    { expand: true, cwd: 'src/styles/fonts/', src: ['**'], dest: 'app/css/fonts' },
                    { expand: true, cwd: 'node_modules/bootstrap/dist', src: ['css/*.min.css', 'fonts/**'], dest: 'app/vendor/bootstrap' }
                ]
            }
        },

        googlefonts: {
            fetch: {
                options: {
                    fontPath: 'src/styles/fonts',
                    cssFile: 'src/styles/fonts.styl',
                    httpPath: 'fonts/',
                    fonts: [{
                        family: 'Press Start 2P',
                        styles: [400]
                    }]
                }
            }
        },

        rollup: {
            options: {
                entry: './src/app/index.js',

                plugins: [
                    riot(),

                    /*alias({
                        config: __dirname + '/config/' + process.env.BUILD_ENV
                    }),*/

                    nodeResolve({
                        main: true,
                        jsnext: true,
                        browser: false
                    }),

                    ruReplace({
                        'process.env.NODE_ENV': JSON.stringify(process.env.BUILD_ENV),
                    }),

                    commonjs(),

                    babel({
                        exclude: 'node_modules/**'
                    })

                    /*uglify({
                        wrap: true
                    })*/
                ]
            },

            files: {
                src: 'src/app/index.js',
                dest: 'app/js/app.js'
            }
        },

        /*karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },*/

        webfont: {
            consoles: {
                src: 'src/svg/consoles/*.svg',
                dest: 'src/styles/fonts/consoles',
                options: {
                    htmlDemo: false,
                    templateOptions: {
                        baseClass: 'ci-icon',
                        classPrefix: 'ci-'
                    },
                    fontFamilyName: 'Game Consoles',
                    stylesheet: 'styl',
                    relativeFontPath: 'fonts/consoles'
                }
            }
        },

        stylus: {
            styles: {
                options: {
                    relativeDest: '../../app/css'
                },

                files: [{ 
                    expand: true,
                    src: ['src/styles/style.styl'],
                    ext: '.css' 
                }]
            }
        }
    })

    //grunt.loadNpmTasks('grunt-karma')
    grunt.loadNpmTasks('grunt-rollup')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-copy')
    grunt.loadNpmTasks('grunt-contrib-stylus')
    grunt.loadNpmTasks('grunt-google-fonts')
    grunt.loadNpmTasks('grunt-webfont')

    grunt.registerTask('styles', ['stylus'])

    grunt.registerTask('update-assets', ['googlefonts:fetch', 'webfont:consoles'])
    grunt.registerTask('build', ['copy:dist', 'styles', 'rollup'])
    grunt.registerTask('test', ['karma:unit'])
}
