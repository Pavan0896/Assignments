const { randomBytes } = require("node:crypto");

// to catch the inputs from the terminal
const args = process.argv.slice(2);
const operation = args[0];
const num = args.slice(1);

// functions of operations to perform
const add = (a, b) => {
  return parseInt(a) + parseInt(b);
};
const sub = (a, b) => {
  return parseInt(a) - parseInt(b);
};
const mult = (a, b) => {
  return parseInt(a) * parseInt(b);
};
const divide = (a, b) => {
  return parseInt(a) / parseInt(b);
};
const sin = (a) => {
  return Math.sin(parseInt(a));
};
const cos = (a) => {
  return Math.cos(parseInt(a));
};
const tan = (a) => {
  return Math.tan(parseInt(a));
};

const random = (length) => {
  // if no length is given
  if (!length) {
    return "Provide length for random number generation.";
  }
  const buf = randomBytes(parseInt(length)); // to generate random data of length received from the input
  let text = `${buf.length} bytes of random data: ${buf.toString("binary")}`;
  return text;
};

const main = () => {
  switch (operation) {
    case "add":
      return console.log(add(num[0], num[1]));

    case "sub":
      return console.log(sub(num[0], num[1]));

    case "mult":
      return console.log(mult(num[0], num[1]));

    case "divide":
      return console.log(divide(num[0], num[1]));

    case "sin":
      return console.log(sin(num[0]));

    case "cos":
      return console.log(cos(num[0]));

    case "tan":
      return console.log(tan(num[0]));

    case "random":
      return console.log(random(num[0]));

    default:
      return console.log("Invalid operation.");
  }
};

main();
