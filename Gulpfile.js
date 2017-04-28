//�������
var gulp = require('gulp');

var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var connect = require('gulp-connect');
var minify_css = require('gulp-minify-css');

//��������
//���� JS�﷨��ʽ�Ƿ���ȷ
gulp.task('hint', function () {
    return gulp.src('jiumen/jiumen/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
//ѹ��js
gulp.task('js', function () {
    return gulp.src('jiumen/jiumen/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('application'));
});
//�ϲ�JS
gulp.task('concatjs', function () {
    return gulp.src(['jiumen/jiumen/js/top.js', 'jiumen/jiumen/js/left-bar.js'])
   .pipe(concat('main.js'))
   .pipe(gulp.dest('jiumen/jiumen/js'))
})
//ѹ��CSS
gulp.task('css1', function () {
    return gulp.src('jiumen/jiumen/css/*.css')
    .pipe(minify_css())
    .pipe(gulp.dest('jiumen/jiumen/css'));
});

gulp.task('css2', function () {
    return gulp.src(['dist/css/e.css', 'dist/css/f.css']) //·��
    .pipe(concat('EF.css')) //�ϲ���ɵ�CSS
    .pipe(gulp.dest('application')) //���·��
    .pipe(minify_css()) //cssѹ��
    .pipe(rename({ suffix: '.min' }))//��min������
    .pipe(gulp.dest('application'));
});
//����js,css�仯
gulp.task('watch', function () {
    gulp.watch('jiumen/jiumen/js/*.js', ['script']);
    gulp.watch('jiumen/jiumen/css/*.css', ['css1']);
});

gulp.task('clean', function () {
    return gulp.src('application', { read: false })
    .pipe(clean());
});
//Ĭ������
gulp.task('default', ['clean'], function () {
    gulp.run('hint', 'script', 'css1', 'css2', 'watch');
});
//�������ط���
gulp.task('webserver', function () {
    connect.server({
        livereload: true,
        port: 8080
    });
});
gulp.task('default', ['webserver']);