export const INPUT_AND_OUTPUT = {
  INPUT_PROMPT: `const user = prompt('Please enter your username', 'user');`,
  OUTPUT_LOG: `console.log("This is a regular log message.");`,
  OUTPUT_WARN: `console.warn("This is a warning.");`,
  OUTPUT_ERROR: `console.error("This is an error message.");`,
  OUTPUT_PROMPT_CONFIRM_ALERT: `// Displaying an alert
alert("Welcome to our website!");

// Requesting user input
const userName = prompt("Please enter your name:");
if (userName) {
  alert("Hello, Welcome to SnippetLabs!");
}

// Confirming an action
const isConfirmed = confirm("Do you wish to continue?");
console.log("User confirmed:", isConfirmed);`,
};
