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
