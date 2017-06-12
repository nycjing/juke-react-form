/*
 * Greetings, wanderer!
 * This is a solution for node-shell that I did over the weekend!
 * It's a bit different in several ways from the official solution,
 * and also takes advantage of some more advanced language features!
 * This means it will be a bit more challenging to follow intitially.
 * I'll do my best to help! But don't be concerned if the coding style used here
 * doesn't make as much sense as the official solution yet.
*/

const fs = require('fs');

// 'lib' contains all of our commands (cat, curl, etc...)
const lib = require('./lib');

/*
 * This solution uses arrow functions by default.
 * If you have a one-line arrow function, you can omit using curly braces.
 * You can also put the body of the function down a line, the same way you can
 * put the body of a 'for' loop down a line when it's only one line
 *
 * ex.
 *
 *  instead of:
 *
 *    for (let i = 0; i < 5; i++) {
 *      console.log(i);
 *    }
 *
 *  you can just say:
 *
 *    for (let i = 0; i < 5; i++)
 *      console.log(i);
 *
 *
 * This rule applies not only to 'for' loops, but also 'if-else' statements and '=>' functions
*/
const prompt = () =>
  process.stdout.write('\nprompt $ ');

const done = output => {
  console.log(output);
  prompt();
};

const parse = data => {
  // Splits each piped command into a queue
  // Ex. if we enter 'cat foo.md | grep hello':
  //     queue = ['cat foo.md', 'grep hello']
  const queue = data.toString().trim().split('|').map(cmd => cmd.trim());

  /*
   * This is a recursive IIFE!
   * First, we shift the first command off of our queue and execute it, passing in a callback
   * that will take the stdout from running that command, and then check if we have any commands
   * left in the queue - if we do, then shift the next command and invoke it with the stdout - otherwise,
   * we pass the stdout to the 'done' function we defined above.
   *
  */
  (function next (data, stdin) {
    const entry = data.split(' ');
    const cmd = entry[0];
    const args = entry.slice(1).length ? entry.slice(1).concat(stdin) : [''].concat(stdin);

    lib[cmd] ?
      lib[cmd](stdout => {
        queue.length ?
          next(queue.shift(), stdout) :
          done(stdout);
      }, ...args) :
      done(`Didn't quite get that...`);
  })(queue.shift(), []); // kicks things off with the first item in the queue, with stdin initialized to an empty array

};

const main = () => {
  console.log('Welcome, human...');
  prompt();
  process.stdin.on('data', parse);
};

// Kick things off with a function called 'main'.
// The expression `if require.main === module` checks to see if the `bash.js` file
// is being executed directly (i.e. that we are actually saying `node bash.js`), vs.
// being required by another file (i.e. another file causes bash.js to execute by saying `require('./bash.js')`)
// This is a classic pattern that you'll find in several programming languages.
if (require.main === module) {
  main();
}
