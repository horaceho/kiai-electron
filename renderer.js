const ping = async () => {
  const response = await window.bridges.ping()
  console.log(response)
}

function handleKeyPress(event) {
  document.getElementById("last-keypress").innerText = event.key
  if (event.key === '?') {
    ping();
  }
  console.log(`keyPress: ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  document.getElementById('theme-source').innerHTML = 'System'
})

document.addEventListener('click', (event) => {
  console.log('handleClick()', event.clientX, event.clientY)
})

//
// Files drag and drop
//
document.addEventListener('drop', async (event) => {
  event.preventDefault();
  event.stopPropagation();
  for (const file of event.dataTransfer.files) {
    const stat = await window.bridges.getFileStat(file.path)
    console.log('drop', file.path, stat.size)
  }
})

document.addEventListener('dragover', (event) => {
  event.preventDefault();
  event.stopPropagation();
})

document.addEventListener('dragenter', (event) => {
  // console.log('File is in the Drop Space');
})

document.addEventListener('dragleave', (event) => {
  // console.log('File has left the Drop Space');
})
