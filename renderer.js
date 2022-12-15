function handleKeyPress(event) {
    document.getElementById("last-keypress").innerText = event.key
    console.log(`keyPress: ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)
