const fs = require('fs');
const fm = require('front-matter');
const fetch = require('node-fetch');

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
