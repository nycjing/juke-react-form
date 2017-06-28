$(document).ready(() => {

  const renderToys = function (toys) {
    const $ul = $('#codys-toys')
    if (Array.isArray(toys)) {
      const listEls = toys.map(toy => `<li>${toy.name}</li>`)
      $ul.append(listEls)
    } else {
      $ul.append(`<li>${toys.name}</li>`)
    }
  }

  const getAllToys = function () {
    console.log('We are getting those toys!!!')
    $.ajax({url: '/api/toys', method: 'GET'})
      .then(renderToys)
      .catch(error => {
        console.error(error)
      })

    console.log('Do we have the toys yet?')

    const $button = $('#add-new-toy-btn')
    $button.click(function () {
      const $input = $('#toy-name')
      const toyName = $input.val()
      $input.val('')

      $.ajax({
        url: '/api/toys',
        method: 'POST',
        data: {toyName}
      })
        .then(renderToys)
        .catch(error => {
          console.error(error)
        })
    })

  }


  getAllToys()

})
