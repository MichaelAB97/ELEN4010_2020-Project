
const addElement = function (Id, newId, newElement, Text, newclassName) {
  const Name = document.getElementById(Id)
  const Element = document.createElement(newElement)
  const ElementText = document.createTextNode(Text)
  Element.setAttribute('id', newId)
  Element.className += newclassName
  Element.appendChild(ElementText)
  Name.appendChild(Element)
}
let userHouseData
fetch('/login/api/user') // Returns a Promise for the GET request
  .then(function (response) {
    // Check if the request returned a valid code
    if (response.ok) return response.json() // Return the response parse as JSON if code is valid, →
    else { throw new Error('Failed to load user details: response code invalid!') }
  })
  .then(async function (data) { // Display the JSON data appropriately
    document.getElementById('username').innerHTML = data.username
    document.getElementById('email').innerHTML = data.email
    document.getElementById('mobileNumber').innerHTML = data.mobileNumber

    fetch('/login/user/api/userHouses') // Returns a Promise for the GET request
      .then(function (response) {
        // Check if the request returned a valid code
        if (response.ok) return response.json() // Return the response parse as JSON if code is valid, →
        else { throw new Error('Failed to load house details: response code invalid!') }
      })
      .then(async function (data) { // Display the JSON data appropriately
        var userEmail = document.getElementById('email').textContent
        userHouseData = data
        const userHouses = userHouseData.filter(userHouse => userHouse.email === userEmail)
        userHouses.forEach(house => {
          const Name = document.getElementById('HouseListMenu')
          const Element = document.createElement('option')
          const ElementText = document.createTextNode(house.houseName)
          Element.setAttribute('class', 'dropdown-item')
          Element.setAttribute('value', house.houseName)
          Element.appendChild(ElementText)
          Name.appendChild(Element)
        })
        var house = document.getElementById('HouseListMenu')
        var houseName = house.options[house.selectedIndex].text
        const housesMembers = data.filter(houseMember => houseMember.houseName === houseName)
        housesMembers.forEach(member => {
          var table = document.getElementById('memberlist')
          var row = table.insertRow(0)
          var nameCell = row.insertCell(0)
          var fullNamesCell = row.insertCell(1)
          var emailCell = row.insertCell(2)
          var numberCell = row.insertCell(3)
          nameCell.innerHTML = member.username
          fullNamesCell.innerHTML = member.firstName + ' ' + member.lastName
          emailCell.innerHTML = member.email
          numberCell.innerHTML = member.mobileNumber
        })
        document.getElementById('houseName').value = houseName
        document.getElementById('houseName1').value = houseName
      })
      .catch(function (e) { // Process error for request
        alert(e) // Displays a browser alert with the error message.
      })
  
  })
  .catch(function (e) { // Process error for request
    alert(e) // Displays a browser alert with the error message.
  })

const selectionFn = async function () {
  var house = document.getElementById('HouseListMenu')
  document.getElementById('memberlist').innerHTML = ''
  var houseName = house.options[house.selectedIndex].text
  const housesMembers = userHouseData.filter(houseMember => houseMember.houseName === houseName)
  housesMembers.forEach(member => {
    var table = document.getElementById('memberlist')
    var row = table.insertRow(0)
    var nameCell = row.insertCell(0)
    var firstCell = row.insertCell(1)
    var lastCell = row.insertCell(2)
    var emailCell = row.insertCell(3)
    var numberCell = row.insertCell(4)
    nameCell.innerHTML = member.username
    firstCell.innerHTML = member.firstName
    lastCell.innerHTML = member.lastName
    emailCell.innerHTML = member.email
    numberCell.innerHTML = member.mobileNumer
  })
  document.getElementById('houseName').value = houseName
  document.getElementById('houseName1').value = houseName
}
