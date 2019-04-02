export function generateQuestionsList(
  complexityLevel,
  config,
  numberOfQuestions,
) {
  let questionsList = [];
  //let operators = config.complexity[complexityLevel].operators;
  //let maxNumber = config.complexity[complexityLevel].maxNumber;
  //let firstNumber, secondNumber, operator;

  for (let i = 1; i <= numberOfQuestions; i++) {
    let result = {};
    // let remainder = i % 3;
    if (
      complexityLevel * Number(config.questionType.open.data[i].complexity) ===
      1
    ) {
      //operator = operators[Math.floor(Math.random() * operators.length)];
      let randomOpen = Math.floor(
        Math.random() * config.questionType.open.data.length,
      );
      console.log('here');
      result.questionType = 'open';
      result.correctAnswer =
        config.questionType.open.data[randomOpen].correctAnswer;
      result.responseTime = config.questionType['open'].responseTime;
      result.questionTitle =
        config.questionType.open.data[randomOpen].questionTitle;
      result.question = [];
      //result.question =
      //config.questionType.open.data[randomOpen].questionDescription[0];
      result.explanation =
        config.questionType.open.data[randomOpen].explanation;

      for (
        let j = 0;
        j <
        config.questionType.open.data[randomOpen].questionDescription.length;
        j++
      ) {
        result.question.push(
          config.questionType.open.data[randomOpen].questionDescription[j],
        );
      }

      console.log(result);
      // if (operator === ':') {
      //   secondNumber = Math.floor(Math.random() * (maxNumber / 2) + 1);
      //   firstNumber = secondNumber * 2;
      //   result.correctAnswer = firstNumber / secondNumber;
      // }

      // if (operator === 'x') {
      //   firstNumber = Math.floor(Math.random() * maxNumber + 1);
      //   secondNumber = 2;
      //   result.correctAnswer = firstNumber * secondNumber;
      // }

      // if (operator === '+') {
      //   firstNumber = Math.floor(Math.random() * maxNumber);
      //   secondNumber = Math.floor(Math.random() * maxNumber);
      //   result.correctAnswer = firstNumber + secondNumber;
      // }

      // result.question =
      //   'Cколько будет ' +
      //   firstNumber +
      //   ' ' +
      //   operator +
      //   ' ' +
      //   secondNumber +
      //   '?';

      // if (operator === '-') {
      //   firstNumber = Math.floor(Math.random() * maxNumber);
      //   secondNumber = Math.floor(Math.random() * maxNumber);
      //   if (secondNumber >= firstNumber) {
      //     result.correctAnswer = secondNumber - firstNumber;
      //     result.question =
      //       'Cколько будет ' +
      //       secondNumber +
      //       ' ' +
      //       operator +
      //       ' ' +
      //       firstNumber +
      //       '?';
      //   } else {
      //     result.correctAnswer = firstNumber - secondNumber;
      //     result.question =
      //       'Cколько будет ' +
      //       firstNumber +
      //       ' ' +
      //       operator +
      //       ' ' +
      //       secondNumber +
      //       '?';
      //   }
      //}
      // } else {
      //   let randomSelective = Math.floor(
      //     Math.random() * config.questionType.selective.data.length,
      //   );
      //   let randomDescriptive = Math.floor(
      //     Math.random() * config.questionType.descriptive.data.length,
      //   );
      //   result = {
      //     question: config.questionType.selective.data[randomSelective].question,
      //     answers: config.questionType.selective.data[randomSelective].answers,
      //     correctAnswer:
      //       config.questionType.selective.data[randomSelective].correctAnswer,
      //     questionType: 'selective',
      //     responseTime: config.questionType['selective'].responseTime,
      //   } || {
      //     question:
      //       config.questionType.descriptive.data[randomDescriptive].question,
      //     answers:
      //       config.questionType.descriptive.data[randomDescriptive].answers,
      //     correctAnswer:
      //       config.questionType.descriptive.data[randomDescriptive].correctAnswer,
      //     questionType: 'descriptive',
      //     responseTime: config.questionType['descriptive'].responseTime,
      //   };
      // }
      questionsList.push(result);
    }
  }
  return questionsList;
}
