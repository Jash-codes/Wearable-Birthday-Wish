const messageInput = document.getElementById("messageInput")

const fontSelect = document.getElementById("fontSelect")

const textColor = document.getElementById("textColor")

const fontSize = document.getElementById("fontSize")

const applyTextBtn = document.getElementById("applyTextBtn")

const textOverlay = document.getElementById("textOverlay")

const templateItems = document.querySelectorAll(".templateItem")

const templateImage = document.getElementById("templateImage")

const stickers = document.querySelectorAll(".sticker")

const stickersLayer = document.getElementById("stickersLayer")

const saveBtn = document.getElementById("saveBtn")

const shareBtn = document.getElementById("shareBtn")

const recordBtn = document.getElementById("recordBtn")



applyTextBtn.onclick = () =>
{
textOverlay.innerText = messageInput.value

textOverlay.style.fontFamily = fontSelect.value

textOverlay.style.color = textColor.value

textOverlay.style.fontSize = fontSize.value + "px"
}



templateItems.forEach(template =>
{
template.onclick = () =>
{
templateImage.src = template.src
}
})



stickers.forEach(sticker =>
{

sticker.onclick = () =>
{

const newSticker = document.createElement("div")

newSticker.innerText = sticker.innerText

newSticker.style.position = "absolute"

newSticker.style.left = Math.random()*300 + "px"

newSticker.style.top = Math.random()*300 + "px"

newSticker.style.fontSize = "40px"

newSticker.style.cursor = "move"

stickersLayer.appendChild(newSticker)

dragElement(newSticker)

}

})



function dragElement(elmnt)
{

let pos1=0,pos2=0,pos3=0,pos4=0

elmnt.onmousedown = dragMouseDown

function dragMouseDown(e)
{

e = e || window.event

e.preventDefault()

pos3 = e.clientX

pos4 = e.clientY

document.onmouseup = closeDrag

document.onmousemove = elementDrag

}

function elementDrag(e)
{

e = e || window.event

e.preventDefault()

pos1 = pos3 - e.clientX

pos2 = pos4 - e.clientY

pos3 = e.clientX

pos4 = e.clientY

elmnt.style.top = (elmnt.offsetTop - pos2) + "px"

elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"

}

function closeDrag()
{
document.onmouseup = null
document.onmousemove = null
}

}



dragElement(textOverlay)



saveBtn.onclick = () =>
{

html2canvas(document.getElementById("cardCanvas")).then(canvas =>
{

let link = document.createElement("a")

link.download = "birthday_wish.png"

link.href = canvas.toDataURL()

link.click()

})

}



shareBtn.onclick = () =>
{

let text = messageInput.value

let encoded = encodeURIComponent(text)

let url = window.location.href + "?wish=" + encoded

alert("Private Link:\n" + url)

}



window.onload = () =>
{

const params = new URLSearchParams(window.location.search)

const wish = params.get("wish")

if(wish)
{
textOverlay.innerText = decodeURIComponent(wish)
}

}



recordBtn.onclick = () =>
{

alert("Video recording feature can capture animation in wearable devices.")

}