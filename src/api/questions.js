export function generateQuestionsList(numberOfQuestions, maxNumber) {
  let questionsList = []; 
  
  for (let i = 0; i < numberOfQuestions; i++) {
    let firstNumber, secondNumber, question ,multiplicator;
    let operators = ['+', '-', '*', '/'];
    let operator = operators[Math.floor(Math.random() * operators.length)];
    secondNumber = Math.floor(Math.random() * maxNumber);
    if (secondNumber > 0) {
      multiplicator = Math.floor(Math.random() * (maxNumber / secondNumber) - 1) + 1;
    } else {
      multiplicator = 1;
    }
    
    if (operator === '/') {
      firstNumber = Math.floor(secondNumber * multiplicator);
    } else {
      firstNumber = Math.floor(Math.random() * maxNumber);
    }

    if (operator === '-' && secondNumber > firstNumber) {
      question = secondNumber + ' ' + operator + ' ' + firstNumber;
    } else {
      question = firstNumber + ' ' + operator + ' ' + secondNumber;
    }
    
    questionsList.push(question);
  }

  return questionsList;
}

