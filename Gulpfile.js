//引入组件
var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var minify_css = require('gulp-minify-css');

//创建任务
//检验 JS语法格式是否正确
gulp.task('hint', function () {
    return gulp.src('jiumen/jiumen/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
//压缩js
gulp.task('js', function () {
    return gulp.src('jiumen/jiumen/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('application'));
});
//合并JS
gulp.task('concatjs', function () {
    return gulp.src(['jiumen/jiumen/js/top.js', 'jiumen/jiumen/js/left-bar.js'])
   .pipe(concat('main.js'))
   .pipe(gulp.dest('jiumen/jiumen/js'))
})
//压缩CSS
gulp.task('css1', function () {
    return gulp.src('jiumen/jiumen/css/*.css')
    .pipe(minify_css())
    .pipe(gulp.dest('jiumen/jiumen/css'));
});

gulp.task('css2', function () {
    return gulp.src(['dist/css/e.css', 'dist/css/f.css']) //路径
    .pipe(concat('EF.css')) //合并完成的CSS
    .pipe(gulp.dest('application')) //输出路径
    .pipe(minify_css()) //css压缩
    .pipe(rename({ suffix: '.min' }))//加min重命名
    .pipe(gulp.dest('application'));
});
//监听js,css变化
gulp.task('watch', function () {
    gulp.watch('jiumen/jiumen/js/*.js', ['script']);
    gulp.watch('jiumen/jiumen/css/*.css', ['css1']);
});

gulp.task('clean', function () {
    return gulp.src('application', { read: false })
    .pipe(clean());
});
//默认任务
gulp.task('default', ['clean'], function () {
    gulp.run('hint', 'script', 'css1', 'css2', 'watch');
});
//启动本地服务
gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 8080
    });
});
gulp.task('default', ['webserver']);