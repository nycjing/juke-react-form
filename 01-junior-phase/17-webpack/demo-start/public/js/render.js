
  const domNode = document.getElementById('output')

  // like console.log, only it just appends a <p> to the DOM!
  const render = string => domNode.innerHTML += `<p>${string}</p>`
  console.log([1, 2, 3].map(number => number * 2)) // [2, 4, 6]


  // template strings
  // domNode.innerHTML += '<p>' + string + '</p>'

module.exports = render
