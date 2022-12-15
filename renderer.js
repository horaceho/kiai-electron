const help = async () => {
    const response = await window.bridges.help()
    console.log(response)
}

function handleKeyPress(event) {
    document.getElementById("last-keypress").innerText = event.key
    if (event.key === '?') {
        help();
    }
    console.log(`keyPress: ${event.key}`)
}

window.addEventListener('keyup', handleKeyPress, true)
