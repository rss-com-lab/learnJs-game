const RESPONSE_TIME = 300000;
//const types = ['open', 'close', 'closeMultiple'];
const types = {open: 'open', close: 'close', closeMultiple: 'closeMultiple'};

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
    for (let key in types) {
      if (config.questionType.hasOwnProperty([types[key]])) {
        for (let j = 0; j < config.questionType[types[key]].data.length; j++) {
          if (
            complexityLevel /
              Number(config.questionType[types[key]].data[j].complexity) ===
              1 &&
            selectedTheme === config.questionType[types[key]].data[j].theme
          ) {
            questions.push(config.questionType[types[key]].data[j]);
          }
        }
      }
    }
  } else {
    for (let key in types) {
      if (config.questionType.hasOwnProperty([types[key]])) {
        for (let j = 0; j < config.questionType[types[key]].data.length; j++) {
          if (
            complexityLevel /
              Number(config.questionType[types[key]].data[j].complexity) ===
            1
          ) {
            questions.push(config.questionType[types[key]].data[j]);
          }
        }
      }
    }
  }

  console.log(questions);
  for (let i = 1; i <= numberOfQuestions; i++) {
    let random = Math.floor(Math.random() * questions.length);

    if (!questions[random].hasOwnProperty('answers')) {
      result.questionType = types.open;
      result.question = [];
      result.correctAnswer = questions[random].correctAnswer;
      result.responseTime =
        config.questionType[types.open].responseTime || RESPONSE_TIME;
      result.questionTitle = questions[random].questionTitle;
      result.explanation = questions[random].explanation;

      for (let j = 0; j < questions[random].questionDescription.length; j++) {
        result.question.push(questions[random].questionDescription[j]);
      }
    } else {
      result.question = [];
      result.answers = [];
      result.correctAnswer = [];
      result.questionTitle = questions[random].questionTitle;
      if (
        questions[random].correctAnswer instanceof Array &&
        questions[random].correctAnswer.length > 1
      ) {
        result.questionType = types.closeMultiple;
        for (let j = 0; j < questions[random].correctAnswer.length; j++) {
          result.correctAnswer.push(questions[random].correctAnswer[j]);
          result.responseTime =
            config.questionType[types.closeMultiple].responseTime ||
            RESPONSE_TIME;
        }
      } else {
        result.questionType = types.close;
        result.correctAnswer = questions[random].correctAnswer;
        result.responseTime =
          config.questionType[types.close].responseTime || RESPONSE_TIME;
      }

      for (let j = 0; j < questions[random].questionDescription.length; j++) {
        result.question.push(questions[random].questionDescription[j]);
      }

      for (let j = 0; j < questions[random].answers.length; j++) {
        result.answers.push(questions[random].answers[j]);
      }
    }

    questionsList.push(result);
    result = {};
  }
  console.log(questionsList);
  return questionsList;
}
