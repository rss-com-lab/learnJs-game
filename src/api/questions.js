export function generateQuestionsList(numberOfQuestions, maxNumber, operators) {
  let questionsList = [];

  for (let i = 0; i < numberOfQuestions; i++) {
    let firstNumber, secondNumber, question;

    let operator = operators[Math.floor(Math.random() * operators.length)];

    if (operator === ":") {
      secondNumber = Math.floor(Math.random() * (maxNumber / 2) + 1);
      firstNumber = secondNumber * 2;
    }

    if (operator === "x") {
      firstNumber = Math.floor(Math.random() * maxNumber + 1);
      secondNumber = 2;
    }

    if (operator === "+" || operator === "-") {
      firstNumber = Math.floor(Math.random() * maxNumber);
      secondNumber = Math.floor(Math.random() * maxNumber);
    }

    if (operator === "-" && secondNumber > firstNumber) {
      question = secondNumber + " " + operator + " " + firstNumber;
    } else {
      question = firstNumber + " " + operator + " " + secondNumber;
    }

    questionsList.push(question);
  }

  return questionsList;
}
