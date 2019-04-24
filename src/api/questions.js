export function generateQuestionsList(
  complexityLevel,
  selectedTheme,
  config,
  numberOfQuestions,
) {
  console.log(selectedTheme);
  let questions = [];
  let questionsList = [];
  let result = {};

  for (let i = 0; i < config.questionType.open.data.length; i++) {
    if (
      complexityLevel / Number(config.questionType.open.data[i].complexity) ===
        1 &&
      selectedTheme === config.questionType.open.data[i].theme
    ) {
      questions.push(config.questionType.open.data[i]);
    }
  }

  console.log(questions);
  for (let i = 1; i <= numberOfQuestions; i++) {
    let randomOpen = Math.floor(Math.random() * questions.length);
    result.questionType = 'open';
    result.correctAnswer = questions[randomOpen].correctAnswer;
    result.responseTime = config.questionType['open'].responseTime;
    result.questionTitle = questions[randomOpen].questionTitle;
    result.question = [];
    result.explanation = questions[randomOpen].explanation;

    for (let j = 0; j < questions[randomOpen].questionDescription.length; j++) {
      result.question.push(questions[randomOpen].questionDescription[j]);
    }
    questionsList.push(result);
    result = {};
  }

  console.log(questionsList);
  return questionsList;
}
