module.exports = (done, pattern, stdin) => {
  const exp = new RegExp(pattern, 'g');
  const lines = stdin.split('\n').filter(line => line.match(exp))
  done(lines.join('\n'));
};
