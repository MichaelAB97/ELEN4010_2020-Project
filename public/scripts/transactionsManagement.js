'use strict'

let transactions

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
        const userHouses = data.filter(userHouse => userHouse.email === userEmail)
        userHouses.forEach(house => {
          const Name = document.getElementById('HouseListMenu')
          const Element = document.createElement('option')
          const ElementText = document.createTextNode(house.houseName)
          Element.setAttribute('class', 'dropdown-item')
          Element.setAttribute('value', house.houseName)
          Element.appendChild(ElementText)
          Name.appendChild(Element)
        })
        fetch('/login/user/api/houseTransactions') // Returns a Promise for the GET request
          .then(function (response) {
            // Check if the request returned a valid code
            if (response.ok) return response.json() // Return the response parse as JSON if code is valid, →
            else { throw new Error('Failed to load Transactions: response code invalid!') }
          })
          .then(function (data) { // Display the JSON data appropriately
            transactions = data
            var house = document.getElementById('HouseListMenu')
            var houseName = house.options[house.selectedIndex].text

            const housesTransactions = transactions.filter(transaction => transaction.houseName === houseName)
            const table = document.getElementById('transactionlist')

            // add table headers
            var row = table.insertRow(-1)
            const tableHeader = function (row, header) {
              var headerCell = document.createElement('TH')
              headerCell.innerHTML = header
              row.appendChild(headerCell)
            }

            tableHeader(row, 'TransId')
            tableHeader(row, 'From')
            tableHeader(row, 'To')
            tableHeader(row, 'Type')
            tableHeader(row, 'Service')
            tableHeader(row, 'Amount')
            tableHeader(row, 'status')
            var reversedhousesTransactions = housesTransactions.reverse()
            reversedhousesTransactions.forEach(transaction => {
              var row = table.insertRow(-1)

              var TransId = row.insertCell(0)
              var From = row.insertCell(1)
              var To = row.insertCell(2)
              var Type = row.insertCell(3)
              var Service = row.insertCell(4)
              var Amount = row.insertCell(5)
              var status = row.insertCell(6)

              TransId.innerHTML = transaction.transId
              From.innerHTML = transaction.authorUsername
              To.innerHTML = transaction.receiptUsername
              Type.innerHTML = transaction.transType
              Service.innerHTML = transaction.transService
              Amount.innerHTML = transaction.amount
              if (transaction.transStatus === 'outstanding') {
                status.innerHTML = transaction.transStatus.fontcolor('red')
              } else if (transaction.transStatus === 'pending') {
                status.innerHTML = transaction.transStatus.fontcolor('orange')
              } else if (transaction.transStatus === 'paid') {
                status.innerHTML = transaction.transStatus.fontcolor('green')
              } else { status.innerHTML = transaction.transStatus }
            })
            var userEmail = document.getElementById('email').textContent
            // people who owe you
            var userTransactions = transactions.filter(transaction => (transaction.authorEmail === userEmail && transaction.transType === 'debit' && transaction.transStatus === 'outstanding'))
            const owed = document.getElementById('owed')
            const totalowed = document.getElementById('owedTotal')
            var totalOwings = 0

            userTransactions.forEach(transaction => {
              const Element = document.createElement('li')
              const infor = transaction.receiptUsername + ' owes you, R' + Math.abs(transaction.amount) + ' from House: ' + transaction.houseName + ' for ' + transaction.transService + ' ( Transaction ID:' + transaction.transId + ').'
              const ElementText = document.createTextNode(infor)
              Element.appendChild(ElementText)
              owed.appendChild(Element)
              totalOwings += Math.abs(transaction.amount)
            })
            var Element = document.createElement('h5')
            var info = 'In total you are owed R' + totalOwings + '.'
            var ElementText = document.createTextNode(info)
            Element.appendChild(ElementText)
            totalowed.appendChild(Element)
            // people you owe id = OwedList
            userTransactions = transactions.filter(transaction => (transaction.receiptEmail === userEmail && transaction.transType === 'debit' && transaction.transStatus === 'outstanding' ))
            const owing = document.getElementById('owing')
            const total = document.getElementById('total')
            const OwedList = document.getElementById('OwedList')
            var totalamount = 0

            userTransactions.forEach(transaction => {
              var Element = document.createElement('li')
              const infor = 'You owe ' + transaction.authorUsername + ', R' + Math.abs(transaction.amount) + ' from House: ' + transaction.houseName + ' for ' + transaction.transService + ' ( Transaction ID:' + transaction.transId + ').'
              var ElementText = document.createTextNode(infor)
              Element.appendChild(ElementText)
              owing.appendChild(Element)
              totalamount += Math.abs(transaction.amount)

              Element = document.createElement('option')
              ElementText = document.createTextNode(transaction.transId)
              Element.setAttribute('class', 'dropdown-item')
              Element.setAttribute('value', transaction.transId)
              Element.appendChild(ElementText)
              OwedList.appendChild(Element)
            })
            Element = document.createElement('h5')
            info = 'In total you owe R' + totalamount + '.'
            ElementText = document.createTextNode(info)
            Element.appendChild(ElementText)
            total.appendChild(Element)
            // payments to approve id = ApproveList
            userTransactions = transactions.filter(transaction => (transaction.authorEmail === userEmail && transaction.transType === 'debit' && transaction.transStatus === 'pending'))
            const pending = document.getElementById('pending')
            const ApproveList = document.getElementById('ApproveList')

            userTransactions.forEach(transaction => {
              var Element = document.createElement('li')
              const infor = transaction.receiptUsername + ' paid you, R' + Math.abs(transaction.amount) + ' from House: ' + transaction.houseName + ' for ' + transaction.transService + ' ( Transaction ID:' + transaction.transId + ').'
              var ElementText = document.createTextNode(infor)
              Element.appendChild(ElementText)
              pending.appendChild(Element)

              Element = document.createElement('option')
              ElementText = document.createTextNode(transaction.transId)
              Element.setAttribute('class', 'dropdown-item')
              Element.setAttribute('value', transaction.transId)
              Element.appendChild(ElementText)
              ApproveList.appendChild(Element)
            })

          })  
      })
      .catch(function (e) { // Process error for request
        alert(e) // Displays a browser alert with the error message.
      })
  })
  .catch(function (e) { // Process error for request
    alert(e) // Displays a browser alert with the error message.
  })
  .catch(function (e) { // Process error for request
    alert(e) // Displays a browser alert with the error message.
  })

const selectionFn = async function () {
  var house = document.getElementById('HouseListMenu')
  var houseName = house.options[house.selectedIndex].text

  const housesTransactions = transactions.filter(transaction => transaction.houseName === houseName)
  const table = document.getElementById('transactionlist')
  document.getElementById('transactionlist').innerHTML = ''

  // add table headers
  var row = table.insertRow(-1)
  const tableHeader = function (row, header) {
    var headerCell = document.createElement('TH')
    headerCell.innerHTML = header
    row.appendChild(headerCell)
  }

  tableHeader(row, 'TransId')
  tableHeader(row, 'From')
  tableHeader(row, 'To')
  tableHeader(row, 'Type')
  tableHeader(row, 'Service')
  tableHeader(row, 'Amount')
  tableHeader(row, 'status')

  var reversedhousesTransactions = housesTransactions.reverse()
  reversedhousesTransactions.forEach(transaction => {
    var row = table.insertRow(-1)

    var TransId = row.insertCell(0)
    var From = row.insertCell(1)
    var To = row.insertCell(2)
    var Type = row.insertCell(3)
    var Service = row.insertCell(4)
    var Amount = row.insertCell(5)
    var status = row.insertCell(6)

    TransId.innerHTML = transaction.transId
    From.innerHTML = transaction.authorUsername
    To.innerHTML = transaction.receiptUsername
    Type.innerHTML = transaction.transType
    Service.innerHTML = transaction.transService
    Amount.innerHTML = transaction.amount
    if (transaction.transStatus === 'outstanding') {
      status.innerHTML = transaction.transStatus.fontcolor('red')
    } else if (transaction.transStatus === 'pending') {
      status.innerHTML = transaction.transStatus.fontcolor('orange')
    } else if (transaction.transStatus === 'paid') {
      status.innerHTML = transaction.transStatus.fontcolor('green')
    } else { status.innerHTML = transaction.transStatus }
  })
}
