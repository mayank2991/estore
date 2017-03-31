// Gulp.js configuration
var
    // modules
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass');

    // development mode?
    devBuild = (process.env.NODE_ENV !== 'production'), // !== Not in production || === In production

    // folders
    folder = {
        src: 'src/',
        build: 'public/'
    }

    // JavaScript processing
    gulp.task('js', function() {

        var jsbuild = gulp.src(folder.src + 'js/**/*')
            .pipe(concat('app.js'));
            
        if (!devBuild) {
            jsbuild = jsbuild
            .pipe(uglify());
        }

        return jsbuild.pipe(gulp.dest(folder.build + 'js/'));
    });

    // CSS processing
    gulp.task('css', function() {


        return gulp.src(folder.src + 'scss/main.scss')
            .pipe(sass({
                outputStyle: 'nested',
                imagePath: 'images/',
                precision: 3,
                errLogToConsole: true
                }))
            .pipe(gulp.dest(folder.build + 'css/'));

    });

    // watch for changes
    gulp.task('default', function() {

        // javascript changes
        gulp.watch(folder.src + 'js/**/*', ['js']);

        // css changes
        gulp.watch(folder.src + 'scss/**/*', ['css']);

    });

;