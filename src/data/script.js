const fs = require('fs');
const fm = require('front-matter');

fs.readFile('./src/data/questions-choice.md', 'utf8', function(error, data) {
  if (error) throw error;
  const content = fm(data);
  const json = JSON.stringify(content.attributes, 0, 2);
  fs.writeFile(`${__dirname}/questions-hoice.json`, json, 'utf8', error => {
    if (error) throw error;
  });
});
