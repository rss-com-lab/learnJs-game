const questions = [
  {id: 1, task: "2 + 2"},
  {id: 2, task: "3 + 3"},
  {id: 3, task: "4 + 4"},
  {id: 4, task: "5 / 5"},
  {id: 5, task: "1 * 3"},
  {id: 6, task: "6 + 0"},
  {id: 7, task: "9 - 3"},
  {id: 8, task: "5 * 2"},
  {id: 9, task: "0 + 1"}
];


export function numberOfQuestions() {
	return questions.length;
}


export function askQuestion() {
	return questions[Math.floor(Math.random() * questions.length)]['task'];
}

