export function generateQuestionsList(complexityLevel, config) {
  let questionsList = [];
  let operators = config.complexity[complexityLevel].operators;
  let maxNumber = config.complexity[complexityLevel].maxNumber;
  let numberOfQuestions = config.numberOfQuestions;
  let firstNumber, secondNumber, operator;

  for (let i = 1; i <= numberOfQuestions; i++) {
    let result = {};
    let remainder = i % 3;

    if (remainder !== 0) {
      operator = operators[Math.floor(Math.random() * operators.length)];
      result.asnwers = 0;
      result.questionType = 'open';
      result.responseTime = config.questionType['open'].responseTime;

      if (operator === ':') {
        secondNumber = Math.floor(Math.random() * (maxNumber / 2) + 1);
        firstNumber = secondNumber * 2;
        result.correctAnswer = firstNumber / secondNumber;
      }

      if (operator === 'x') {
        firstNumber = Math.floor(Math.random() * maxNumber + 1);
        secondNumber = 2;
        result.correctAnswer = firstNumber * secondNumber;
      }

      if (operator === '+') {
        firstNumber = Math.floor(Math.random() * maxNumber);
        secondNumber = Math.floor(Math.random() * maxNumber);
        result.correctAnswer = firstNumber + secondNumber;
      }

      result.question =
        'Cколько будет ' +
        firstNumber +
        ' ' +
        operator +
        ' ' +
        secondNumber +
        '?';

      if (operator === '-') {
        firstNumber = Math.floor(Math.random() * maxNumber);
        secondNumber = Math.floor(Math.random() * maxNumber);
        if (secondNumber >= firstNumber) {
          result.correctAnswer = secondNumber - firstNumber;
          result.question =
            'Cколько будет ' +
            secondNumber +
            ' ' +
            operator +
            ' ' +
            firstNumber +
            '?';
        } else {
          result.correctAnswer = firstNumber - secondNumber;
          result.question =
            'Cколько будет ' +
            firstNumber +
            ' ' +
            operator +
            ' ' +
            secondNumber +
            '?';
        }
      }
    } else {
      let randomSelective = Math.floor(
        Math.random() * config.questionType.selective.data.length,
      );
      let randomDescriptive = Math.floor(
        Math.random() * config.questionType.descriptive.data.length,
      );
      result = {
        question: config.questionType.selective.data[randomSelective].question,
        answers: config.questionType.selective.data[randomSelective].answers,
        correctAnswer:
          config.questionType.selective.data[randomSelective].correctAnswer,
        questionType: 'selective',
        responseTime: config.questionType['selective'].responseTime,
      } || {
        question:
          config.questionType.descriptive.data[randomDescriptive].question,
        answers:
          config.questionType.descriptive.data[randomDescriptive].answers,
        correctAnswer:
          config.questionType.descriptive.data[randomDescriptive].correctAnswer,
        questionType: 'descriptive',
        responseTime: config.questionType['descriptive'].responseTime,
      };
    }
    questionsList.push(result);
  }
  return questionsList;
}
