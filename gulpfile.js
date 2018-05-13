const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const myth = require('gulp-myth');
const sourcemaps = require('gulp-sourcemaps');



//  server
gulp.task('server', function(){
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });
    gulp.watch("build/**/*").on('change', browserSync.reload);
});

/* ------------ Jade compile ------------- */
gulp.task('templates:compile', function() {
    return gulp.src('source/template/index.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});

/* ------------ Styles compile ------------- */

gulp.task('styles:compile', function() {
    return gulp.src('source/css/main.styl')
        .pipe(stylus())
        .on('error', console.log)
        .pipe(myth())
        .pipe(gulp.dest('build/css'));
});


/* ------------ Sprite ------------- */
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('source/images/icons/*.png').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.stylus'
    }));
    spriteData.img.pipe(gulp.dest('build/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});


/* ------------ Delete ------------- */
gulp.task('clean', function del(cb) {
    return rimraf('build', cb);
});


/* ------------ Copy fonts ------------- */
gulp.task('copy:fonts', function () {
    return gulp.src('source/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'));
});

/* ------------ Copy images ------------- */
gulp.task('copy:img', function () {
    return gulp.src('source/images/**/*.*')
        .pipe(gulp.dest('build/images'));
});

/* ------------ Copy ------------- */
gulp.task('copy', gulp.parallel('copy:img','copy:fonts'));

/* ------------ Watchers ------------- */
gulp.task('watch',function(){
    gulp.watch('source/css/**/*.styl',gulp.series('styles:compile'));
    gulp.watch('source/template/**/*.jade',gulp.series('templates:compile'));
    gulp.watch('source/js/**/*.js',gulp.series('compress'));

});

/* ------------- Compress JS ---------*/
gulp.task('compress', function() {
    return gulp.src('source/js/*.js')
        .pipe(sourcemaps.init())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/js'));
});


gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'compress', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
    )
);




