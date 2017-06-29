(function () {

  var domNode = document.getElementById('output')

  function render (string) {
    domNode.innerHTML += '<p>' + string + '</p>'
  }

  window.render = render
})()
