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
// Board
//
function draggable(element) {
  var diffX = 0, diffY = 0, lastX = 0, lastY = 0;
  element.onmousedown = dragMouseDown;
  element.onmouseover = (event) => {
    document.body.style.cursor = 'move';
  };
  element.onmouseout = (event) => {
    document.body.style.cursor = 'default';
  };

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup
    lastX = e.clientX;
    lastY = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves
    document.onmousemove = elementDrag;
    console.log('MouseDown', e.clientX, e.clientY)
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position
    diffX = lastX - e.clientX;
    diffY = lastY - e.clientY;
    lastX = e.clientX;
    lastY = e.clientY;
    // set the element's new position
    let margin = 8
    var left = element.offsetLeft - diffX;
    var top = element.offsetTop - diffY;
    if (left < margin) {
      left = margin;
    }
    if (top < margin) {
      top = margin;
    }
    if (left + element.offsetWidth + margin > window.innerWidth) {
      left = window.innerWidth - e.offsetWidth - margin;
    }
    if (top + element.offsetHeight + margin > window.innerHeight) {
      top = window.innerHeight - e.offsetHeight - margin;
    }
    element.style.left = left + "px";
    element.style.top = top + "px";
  }

  function closeDragElement(e) {
    e = e || window.event;
    e.preventDefault();
    document.onmouseup = null;
    document.onmousemove = null;
    console.log('MouseUp', e.clientX, e.clientY)
  }
}

var board = document.getElementById('board');
draggable(board);

var canvas = document.getElementById('canvas');
var context = canvas.getContext("2d");
context.fillStyle = "grey";
context.fillRect(0, 0, canvas.width, canvas.height);

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
