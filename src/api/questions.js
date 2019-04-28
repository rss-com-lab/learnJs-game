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
    for (let i = 0; i < config.questionType.open.data.length; i++) {
      if (
        complexityLevel /
          Number(config.questionType.open.data[i].complexity) ===
          1 &&
        selectedTheme === config.questionType.open.data[i].theme
      ) {
        questions.push(config.questionType.open.data[i]);
      }
    }
    for (let i = 0; i < config.questionType.close.data.length; i++) {
      if (
        complexityLevel /
          Number(config.questionType.close.data[i].complexity) ===
          1 &&
        selectedTheme === config.questionType.close.data[i].theme
      ) {
        questions.push(config.questionType.close.data[i]);
      }
    }
  } else {
    for (let i = 0; i < config.questionType.open.data.length; i++) {
      if (
        complexityLevel /
          Number(config.questionType.open.data[i].complexity) ===
        1
      ) {
        questions.push(config.questionType.open.data[i]);
      }
    }
    for (let i = 0; i < config.questionType.close.data.length; i++) {
      if (
        complexityLevel /
          Number(config.questionType.close.data[i].complexity) ===
        1
      ) {
        questions.push(config.questionType.close.data[i]);
      }
    }
  }

  console.log(questions);
  for (let i = 1; i <= numberOfQuestions; i++) {
    let randomOpen = Math.floor(Math.random() * questions.length);

    if (!questions[randomOpen].hasOwnProperty('answers')) {
      result.questionType = 'open';
      result.correctAnswer = questions[randomOpen].correctAnswer;
      result.responseTime = config.questionType['open'].responseTime;
      result.questionTitle = questions[randomOpen].questionTitle;
      result.question = [];
      result.explanation = questions[randomOpen].explanation;

      for (
        let j = 0;
        j < questions[randomOpen].questionDescription.length;
        j++
      ) {
        result.question.push(questions[randomOpen].questionDescription[j]);
      }
    } else {
      // result.questionType = 'close';
      // result.correctAnswer = questions[randomOpen].correctAnswer;
      // result.responseTime = config.questionType['open'].responseTime;
      // result.questionTitle = questions[randomOpen].questionTitle;
      // result.question = [];
      // result.explanation = questions[randomOpen].explanation;
      // for (
      //   let j = 0;
      //   j < questions[randomOpen].questionDescription.length;
      //   j++
      // ) {
      //   result.question.push(questions[randomOpen].questionDescription[j]);
      // }
    }

    questionsList.push(result);
    result = {};
  }
  return questionsList;
}
