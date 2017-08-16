/**
 * Created by Ikenna Okonkwo on 2015-12-06.
 */

// grab our gulp packages
var gulp        = require('gulp'),
//    gutil       = require('gulp-util'),
//    sass        = require('gulp-sass'),
    Del         = require('del'),
    Rename      = require('gulp-rename'),
    RunSequence = require('run-sequence'),
    Useref      = require('gulp-useref'),
    path          = require('path'),
    spawn       = require('child_process').spawn;
    
/**
 * Build Settings
 */
var settings = {
  /*
   * Where is our code?
   */
  srcFolder    : './angular/src',
  
  /*
   * Where are we building to?
   */
  buildFolder  : './angular/build',

  /*
   * Where should the final file be?
   */
  destFolder   : './static/angular',

  /*
   * Other project's code
   */
  reactFolder  : './react',

  /*
   * Other project's code
   */
  reactDest  : './static/react'
  
};

/*
 * Clean Task
 *
 * Clears the build folder from our
 * previous builds files.
 */
gulp.task('clean', function() {
  return Del([
    settings.buildFolder + '/**/*',
    settings.destFolder + '/**/*'
  ]);
});

/**
 * Replace Task
 *
 * Get the index.html file, apply some gulp-useref 
 * transformations and send it to the .
 */
gulp.task('replace', function() {
  return gulp.src(settings.destFolder + '/index.html')
             .pipe(Useref())
             .pipe(gulp.dest(settings.destFolder));
});

/**
 * Src Task
 *
 * Grabs all the files from the src folder and
 * places them in our build folder.
 */
gulp.task('src', ['clean'], function() {
    var required_files = [
        settings.srcFolder+'/*.*',
        settings.srcFolder+'/bower_components/**/*',
        settings.srcFolder+'/img/*.*',
        settings.srcFolder+'/css/*.*',
        settings.srcFolder+'/js/app/**/*'
    ];
    return gulp.src(required_files, {base: settings.srcFolder})
             .pipe(gulp.dest(settings.buildFolder));
});

/**
 * Dest Task
 *
 * Grabs all the files from the build folder and
 * places them in our dest folder.
 */
gulp.task('dest', ['src'], function() {
//    const normalizedPath = path.normalize(__dirname + settings.destFolder);
    return gulp.src([settings.buildFolder + '/**/*', settings.srcFolder + '/css/*.*'])
             .pipe(gulp.dest(settings.destFolder));
});

gulp.task('build-react', function(){
    const normalizedPath = path.normalize(__dirname + '/' + settings.reactFolder);
    console.log(`normalizedPath: ${normalizedPath}`);
    const cmd = spawn('npm', ['run', 'build'], {stdio: 'inherit', cwd: normalizedPath});
    cmd.on('close', function(code){
        console.log(`react build task exited with code: ${code}.\ncopying to ${settings.reactDest}...`);
        return gulp.src(settings.reactFolder+'/build/**/*')
                .pipe(gulp.dest(settings.reactDest));
    });
});

/**
 * bower_js Task
 *
 * Grabs all the files from the {buildFolder}/bower_components folder and
 * places them in our {destFolder}/js/lib folder.
 */
gulp.task('bower_js', ['src'], function(){
   var bower_src = [
        settings.buildFolder +'/bower_components/angular/angular.min.js',
        settings.buildFolder +'/bower_components/angular-resource/angular-reource.min.js',
        settings.buildFolder +'/bower_components/bootstrap/dist/js/bootstrap.min.js',
        settings.buildFolder +'/bower_components/jquery/dist/jquery.min.js'
    ];
    return gulp.src(bower_src, {base: settings.buildFolder + '/bower_components/'})
            .pipe(Rename({dirname: ''}))
            .pipe(gulp.dest(settings.destFolder+'/js/lib'));
});

/**
 * Process-sass Task
 *
 * Build our transpiled/compiled and config
 * files in to one awesome file.
 */
//gulp.task('process-sass', ['src'], function() {
//  return gulp.src(settings.srcFolder + '/sass/main.scss')
//             .pipe(sass({
//                sourceComments: true,
//                outputStyle: 'expanded',
//                errLogToConsole: true
//             }).on('error', sass.logError))
//             .pipe(settings.srcFolder+'/css');
//});

/**
 * Build Task
 *
 * Build our transpiled/compiled and config
 * files in to one awesome file.
 */
gulp.task('build', function() {
  return gulp.src(settings.buildFolder + '/app.js')
             .pipe(settings.destFolder);
});

/**
 * Default Task
 *
 * Run the tasks in the correct order
 */
gulp.task('default', ['dest','build-react'], function() {
     
//  return RunSequence([
//    'clean',
//    'process-sass',
//    'dest'
//  ]);
});

/**
 * Prod Task
 *
 * combine and minify css
 */
gulp.task('prod', ['default'], function() {
  return RunSequence([
    'default',
    'replace'
  ]);
});

//watch the scss folder and compile any time the files change
gulp.task('watch', function() {
    gulp.watch(settings.srcFolder+'/**/*', ['default']);
    return console.log('Gulp watch is running!');
});