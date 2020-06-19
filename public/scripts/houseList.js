
fetch('/login/user/api/houses') // Returns a Promise for the GET request
  .then(function (response) {
    // Check if the request returned a valid code
    if (response.ok) return response.json() // Return the response parse as JSON if code is valid, →
    else { throw new Error('Failed to load house details: response code invalid!') }
  })
  .then(function (data) { // Display the JSON data appropriately
    data.forEach(house => {
      const Name = document.getElementById('Houses')
      const Element = document.createElement('h3')
      const ElementText = document.createTextNode(house.houseName)
      Element.setAttribute('class', 'house')
      Element.className += 'house'
      Element.appendChild(ElementText)
      Name.appendChild(Element)
    })
  })
  .catch(function (e) { // Process error for request
    alert(e) // Displays a browser alert with the error message.
  })
