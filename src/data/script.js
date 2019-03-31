const fs = require('fs');
const fm = require('front-matter');
const fetch = require('node-fetch');

fs.readFile('./src/data/questions-choice.md', 'utf8', function(error, data) {
  if (error) throw error;
  const content = fm(data);
  const json = JSON.stringify(content.attributes, 0, 2);
  fs.writeFile(`${__dirname}/questions-hoice.json`, json, 'utf8', error => {
    if (error) throw error;
  });
});

const url =
  'https://raw.githubusercontent.com/AntiHero/Questions/master/questions.md';

fetch(url)
  .then(data => data.text())
  .then(data => {
    const content = fm(data);
    return content;
  })
  .then(content => {
    fs.writeFile(
      'open_questions.json',
      JSON.stringify(content.attributes),
      function(err) {
        if (err) {
          console.log(err);
        }
      },
    );
  });
