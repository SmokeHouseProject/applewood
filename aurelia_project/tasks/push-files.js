import gulp from 'gulp';
import path from 'path';
import minimatch from 'minimatch';
import project from '../aurelia.json';
import del from 'del';

export default function pushFiles(done) {
  if (typeof project.build.pushFiles !== 'object') {
    done();
    return;
  }
  if (typeof project.build.pushFiles.sources !== 'object') {
    done();
    return;
  }
  if (!Array.isArray(project.build.pushFiles.targets)) {
    done();
    return;
  }

  const instructions = getNormalizedInstruction();
  const sources = Object.keys(instructions);
  const targets = project.build.pushFiles.targets;

  clean(targets, sources).then(() => {
    targets.forEach((target) => {
      sendFiles(target, sources, instructions) 
    });
    done();
    return;
  })
}

function clean(targets, sources) {
  let jobs = [];
  targets.forEach((target) => {
    sources.forEach((source) => {
      jobs.push(path.posix.normalize(target + '/' + source));
    });
  });
  return del(jobs)
}

function sendFiles(target, sources, instructions) {
  return gulp.src(sources)
  .pipe(gulp.dest(x => {
    const filePath = prepareFilePath(x.path);
    const key = sources.find(f => minimatch(filePath, f));
    return path.posix.normalize(target + '/' + instructions[key]);
  }));
}

function getNormalizedInstruction() {
  const files = project.build.pushFiles.sources;
  let normalizedInstruction = {};
  for (let key in files) {
    normalizedInstruction[path.posix.normalize(key)] = files[key];
  }
  return normalizedInstruction;
}

function prepareFilePath(filePath) {
  let preparedPath = filePath.replace(process.cwd(), '').substring(1);
  //if we are running on windows we have to fix the path
  if (/^win/.test(process.platform)) {
    preparedPath = preparedPath.replace(/\\/g, '/');
  }
  return preparedPath;
}
