// const fs = require('fs');
// const fm = require('front-matter');
// const fetch = require('node-fetch');

// const url =
//   'https://raw.githubusercontent.com/AntiHero/Questions/master/questions.md';

// fetch(url)
//   .then(data => data.text())
//   .then(data => {
//     const content = fm(data);
//     return content;
//   })
//   .then(content => {
//     fs.writeFile(
//       'open_questions.json',
//       JSON.stringify(content.attributes),
//       function(err) {
//         if (err) {
//           console.log(err);
//         }
//       },
//     );
//   });

const fs = require('fs');
const fm = require('front-matter');
const fetch = require('node-fetch');

const urlQuestionsOpen =
  'https://raw.githubusercontent.com/rss-com-lab/learnJs-game-data/master/questions-open.md';
const urlQuestionsChoice =
  'https://raw.githubusercontent.com/rss-com-lab/learnJs-game-data/master/questions-choice.md';
const fileNameOpen = 'open';
const fileNameChoice = 'choice';
const responseTime = 300000;

const errorFirstCb = error => {
  if (error) {
    console.log('ERROR: ', error);
  }
};

const getQuestions = async (url, fileName) => {
  return fetch(url)
    .then(data => data.text())
    .then(data => {
      const content = fm(data);
      return content;
    })
    .then(content => {
      const json = JSON.stringify(content.attributes, 0, 2);
      fs.writeFileSync(
        `${__dirname}/questions-${fileName}.json`,
        json,
        errorFirstCb,
      );
      return content.attributes;
    });
};

const makeQuestionsFile = async () => {
  const open = await getQuestions(urlQuestionsOpen, fileNameOpen);
  const close = await getQuestions(urlQuestionsChoice, fileNameChoice);
  const main = `{  
    "numberOfLevels":2,
    "numberOfStages":2,
    "numberOfQuestions":5,
    "complexity":{  
       "1":{  
          "operators":[  
             "+",
             "-"
          ],
          "maxNumber":9
       },
       "2":{  
          "operators":[  
             "+",
             "-"
          ],
          "maxNumber":20
       },
       "3":{  
          "operators":[  
             "+",
             "-",
             "x"
          ],
          "maxNumber":30
       }
    },
    "questionType":{  
      "open":{  
        "data":${JSON.stringify(open.typeAnswer.data, 0, 10)},
        "responseTime":${responseTime}
      },
      "close":{  
        "data":${JSON.stringify(close.chooseOptions.data, 0, 10)},
        "responseTime":${responseTime}
      }
    }
}`;
  fs.writeFile(`${__dirname}/questions-all.json`, main, errorFirstCb);
};

makeQuestionsFile();
