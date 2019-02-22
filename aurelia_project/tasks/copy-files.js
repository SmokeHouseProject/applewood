import gulp from 'gulp';
import path from 'path';
import changedInPlace from 'gulp-changed-in-place';
import project from '../aurelia.json';
import merge2 from 'merge2';

export default function copyFiles(done) {
  if (typeof project.build.copyFiles !== 'object') {
    done();
    return;
  }

  const instructions = getNormalizedInstructions();
  const files = Object.keys(instructions);

  return merge2(files.map(file => {
    let targets = instructions[file];
    if (!Array.isArray(targets)) { targets = [targets]}

    let pipeline = gulp.src(file)
      .pipe(changedInPlace({ firstPass: true }))
    targets.forEach(target => {
      pipeline = pipeline.pipe(gulp.dest(target));
    })

    return pipeline;
  }))
}

function getNormalizedInstructions() {
  const files = project.build.copyFiles;
  let normalizedInstructions = {};

  for (let key in files) {
    normalizedInstructions[path.posix.normalize(key)] = files[key];
  }

  return normalizedInstructions;
}
