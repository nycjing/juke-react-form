(function () {

  var domNode = document.getElementById('output')

  // like console.log, only it just appends a <p> to the DOM!
  function render (string) {
    domNode.innerHTML += '<p>' + string + '</p>'
  }

  window.render = render
})()
