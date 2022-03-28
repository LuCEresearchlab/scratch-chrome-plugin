const fs = require('fs').promises;
const path = require('path');

const del = require('del');
const mapStream = require('map-stream');
const { exec } = require('child_process');

const gulp = require('gulp');
const git = require('gulp-git');
const header = require('gulp-header');

const { series, task } = gulp;

const scratchWWWGithubRepository = 'https://github.com/LLK/scratch-www';

const temporaryGitDirectory = path.join(__dirname, '.tempScratchWWW');
const temporaryProjectDirectory = path.join(temporaryGitDirectory, 'scratch-www');

const temporaryConfigFile = path.join(temporaryProjectDirectory, 'webpack.config.js');
const configSrcUpdate = 'process.env.NODE_ENV = "production";';

const temporaryRenderFile = path.join(temporaryProjectDirectory, 'src', 'lib', 'render.jsx');
const targetRenderFile = path.join(temporaryProjectDirectory, 'src', 'lib');
const storeDefinitionRegExp = /const(\s)+store(\s)+=[^\n\r]+;/g;
const renderSrcUpdate = 'window._ScratchStore = store;';

const srcProjectBundle = path.join(temporaryProjectDirectory, 'build', 'js', 'common.bundle.js');
const targetProjectBundle = path.join(__dirname, 'bundle', 'modified.common.bundle.js');

task('clean:before', () => del([
  targetProjectBundle,
]));

task('clean:after', () => del([
  temporaryGitDirectory,
]));

task('create:temp', () => fs.mkdir(temporaryGitDirectory));

task('clone', () => git.clone(
  scratchWWWGithubRepository,
  {
    cwd: temporaryGitDirectory,
  },
  (err) => {
    if (err) throw err;
  },
));

task('updateConfig', () => gulp.src(temporaryConfigFile)
  .pipe(header(configSrcUpdate))
  .pipe(gulp.dest(temporaryProjectDirectory)));

task('updateRender', () => gulp.src(temporaryRenderFile)
  .pipe(mapStream((file, cb) => {
    const fileContents = file.contents.toString();
    const match = storeDefinitionRegExp.exec(fileContents);
    const matchPosition = match.index;
    const matchLength = match[0].length;
    const filePosition = matchPosition + matchLength;
    const newFileContents = [
      fileContents.slice(0, filePosition),
      renderSrcUpdate,
      fileContents.slice(filePosition),
    ].join('');
    // eslint-disable-next-line no-param-reassign
    file.contents = Buffer.from(newFileContents);
    cb(null, file);
  }))
  .pipe(gulp.dest(targetRenderFile)));

task('execNpmAndBuild', (cb) => {
  exec(`cd ${temporaryProjectDirectory} && npm install && npm run build`, (err) => {
    if (err) {
      console.log(err);
    }
    cb();
  });
});

task('copyBundle', () => gulp.src(srcProjectBundle)
  .pipe(gulp.dest(targetProjectBundle)));

task('setup', series(
  'clean:before',
  'create:temp',
));

task('build', series(
  'updateConfig',
  'updateRender',
  'execNpmAndBuild',
  'copyBundle',
));

task('default', series(
  'setup',
  'clone',
  'build',
  'clean:after',
));
