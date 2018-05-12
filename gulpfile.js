const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const jade = require('gulp-jade');
const stylus = require('gulp-stylus');
const spritesmith = require('gulp.spritesmith');
const rimraf = require('rimraf');
const myth = require('gulp-myth');


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
    return gulp.src('source/styles/main.styl')
        .pipe(stylus())
        .on('error', console.log)
        .pipe(gulp.dest('build/css'));
});

// gulp.task('styles:compile', function() {
//     return gulp.src('source/styles/main.styl')
//         .pipe(stylus({
//             use: ['nib']
//         })) // собираем stylus
//         .on('error', console.log) // Если есть ошибки, выводим и продолжаем
//         .pipe(myth()) // добавляем префиксы - http://www.myth.io/
//         .pipe(gulp.dest('build/css')); // записываем css
//         //.pipe(livereload(server)); // даем команду на перезагрузку css
// });

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
    gulp.watch('source/styles/**/*.styl',gulp.series('styles:compile'));
    gulp.watch('source/template/**/*.jade',gulp.series('templates:compile'));
});


gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
    )
);




