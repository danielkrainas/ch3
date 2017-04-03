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
            client: {
                files: ['src/*.js', 'src/**/*.js', 'src/**/*.tag', 'assets/**', 'styles/*.styl'],
                tasks: ['build'],
                options: {
                    livereload: 5729,
                    livereloadOnError: false
                }
            }
        },

        copy: {
            dist: {
                files: [
                    //{ expand: true, cwd: 'assets', src: ['**'], dest: '.dist/'  },
                    { expand: true, cwd: 'node_modules/bootstrap/dist', src: ['css/*.min.css', 'fonts/**'], dest: 'app/vendor/bootstrap' }
                ]
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

    grunt.registerTask('styles', ['stylus'])

    grunt.registerTask('build', ['copy:dist', 'styles', 'rollup'])
    grunt.registerTask('test', ['karma:unit'])
}
