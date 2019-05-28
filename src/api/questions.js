const ANSWERS_NUM = 4;
const RESPONSE_TIME = 300000;
const types = ['open', 'close', 'closeMultiple'];

export function generateQuestionsList(
  complexityLevel,
  selectedTheme,
  config,
  numberOfQuestions,
) {
  let questions = [];
  let questionsList = [];
  let result = {};

  if (typeof selectedTheme === 'string') {
    for (let i = 0; i < types.length; i++) {
      if (config.questionType.hasOwnProperty([types[i]])) {
        for (let j = 0; j < config.questionType[types[i]].data.length; j++) {
          if (
            complexityLevel /
              Number(config.questionType[types[i]].data[j].complexity) ===
              1 &&
            selectedTheme === config.questionType[types[i]].data[j].theme
          ) {
            questions.push(config.questionType[types[i]].data[j]);
          }
        }
      }
    }
  } else {
    for (let i = 0; i < types.length; i++) {
      if (config.questionType.hasOwnProperty([types[i]])) {
        for (let j = 0; j < config.questionType[types[i]].data.length; j++) {
          if (
            complexityLevel /
              Number(config.questionType[types[i]].data[j].complexity) ===
            1
          ) {
            questions.push(config.questionType[types[i]].data[j]);
          }
        }
      }
    }
  }

  console.log(questions);
  for (let i = 1; i <= numberOfQuestions; i++) {
    let random = Math.floor(Math.random() * questions.length);

    if (!questions[random].hasOwnProperty('answers')) {
      result.questionType = 'open';
      result.question = [];
      result.correctAnswer = questions[random].correctAnswer;
      result.responseTime =
        config.questionType['open'].responseTime || RESPONSE_TIME;
      result.questionTitle = questions[random].questionTitle;
      result.explanation = questions[random].explanation;

      for (let j = 0; j < questions[random].questionDescription.length; j++) {
        result.question.push(questions[random].questionDescription[j]);
      }
    } else {
      result.question = [];
      result.answers = [];
      result.questionTitle = questions[random].questionTitle;
      result.correctAnswer = [];
      if (questions[random].correctAnswer instanceof Array) {
        console.log(questions[random], 'multiplte');
        result.questionType = 'closeMultiple';
        for (let j = 0; j <= questions[random].correctAnswer.length; j++) {
          result.correctAnswer.push(questions[random].correctAnswer[j]);
          result.responseTime =
            config.questionType['closeMultiple'].responseTime || RESPONSE_TIME;
        }
      } else {
        result.questionType = 'close';
        result.correctAnswer = questions[random].correctAnswer;
        result.responseTime =
          config.questionType['close'].responseTime || RESPONSE_TIME;
      }

      for (let j = 0; j < questions[random].questionDescription.length; j++) {
        result.question.push(questions[random].questionDescription[j]);
      }

      for (let j = 0; j < ANSWERS_NUM; j++) {
        result.answers.push(questions[random].answers[j]);
      }
    }

    questionsList.push(result);
    result = {};
  }
  console.log(questionsList);
  return questionsList;
}
