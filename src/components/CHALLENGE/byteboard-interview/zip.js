const archiver = require('archiver');
const fs = require('fs');

const SUBMISSION_FILE_PATH = `${__dirname}/submission.zip`;
const GLOB_PATTERN = '{,!(dist|node_modules)/**/}*.!(zip)';

try {
  fs.unlinkSync(SUBMISSION_FILE_PATH);
} catch (err) {
  // No-op (submission file didn't already exist).
}
const output = fs.createWriteStream(SUBMISSION_FILE_PATH);
const archive = archiver('zip', {zlib: {level: 9}});

output.on('close', () => {
  console.log(
    '*\n*\n* Added your code to submission.zip! Please go back to your interview in the browser and upload submission.zip to complete your interview.\n*\n*'
  );
});

archive.pipe(output);
archive.glob(GLOB_PATTERN);
archive.finalize();
