const button = document.getElementById('addButton')

button.addEventListener('click', function () {
  const paragraph = document.createElement('p') // create <p> element
  const text = document.createTextNode('Added a paragraph') // Create text node
  paragraph.appendChild(text)
  document.body.appendChild(paragraph)
}, false)
