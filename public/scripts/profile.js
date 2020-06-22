
const addElement = function (Id, newId, newElement, Text, newclassName) {
  const Name = document.getElementById(Id)
  const Element = document.createElement(newElement)
  const ElementText = document.createTextNode(Text)
  Element.setAttribute('id', newId)
  Element.className += newclassName
  Element.appendChild(ElementText)
  Name.appendChild(Element)
}

fetch('/login/api/user') // Returns a Promise for the GET request
  .then(function (response) {
  // Check if the request returned a valid code
    if (response.ok) return response.json() // Return the response parse as JSON if code is valid, →
    else { throw new Error('Failed to load user details: response code invalid!') }
  })
  .then(function (data) { // Display the JSON data appropriately
    addElement('Name', 'username', 'H2', data.username, 'details')
    addElement('Email', 'userEmail', 'H2', data.email, 'details')
    addElement('Numbers', 'userNumber', 'H2', data.mobileNumber, 'details')

    fetch('/login/user/api/userHouses') // Returns a Promise for the GET request
      .then(function (response) {
      // Check if the request returned a valid code
        if (response.ok) return response.json() // Return the response parse as JSON if code is valid, →
        else { throw new Error('Failed to load house details: response code invalid!') }
      })
      .then(function (data) { // Display the JSON data appropriately
        var userEmail = document.getElementById('userEmail').textContent
        const userHouses = data.filter(userHouse => userHouse.email === userEmail)
        userHouses.forEach(house => {
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
  })
  .catch(function (e) { // Process error for request
    alert(e) // Displays a browser alert with the error message.
  })
