const ffmpeg = require('fluent-ffmpeg');

module.exports = (input, output) =>
  new Promise((resolve, reject) => {
    ffmpeg(input)
      .save(output)
      .on('error', error => reject(error))
      .on('end', () => resolve());
  });
