export function calculate(example) {
  if (!example) return;

  let arr = example.split(' ');
  let a = parseInt(arr[0], 10);
  let b = parseInt(arr[2], 10);

  switch (arr[1]) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case ':':
      return a / b;
    case 'x':
      return a * b;
    default:
      return a + b;
  }
}
