// ELEMENTS
const messageInput = document.getElementById("messageInput");
const fontSelect = document.getElementById("fontSelect");
const textColor = document.getElementById("textColor");
const fontSize = document.getElementById("fontSize");
const applyTextBtn = document.getElementById("applyTextBtn");

const textOverlay = document.getElementById("textOverlay");
const templateItems = document.querySelectorAll(".templateItem");
const templateImage = document.getElementById("templateImage");

const stickers = document.querySelectorAll(".sticker");
const stickersLayer = document.getElementById("stickersLayer");

const saveBtn = document.getElementById("saveBtn");
const shareBtn = document.getElementById("shareBtn");


// APPLY TEXT
applyTextBtn.onclick = () => {

textOverlay.innerText = messageInput.value;

textOverlay.style.fontFamily = fontSelect.value;

textOverlay.style.color = textColor.value;

textOverlay.style.fontSize = fontSize.value + "px";

};


// TEMPLATE SWITCH
templateItems.forEach(template => {

template.onclick = () => {

templateImage.src = template.src;

};

});


// ADD STICKERS
stickers.forEach(sticker => {

sticker.onclick = () => {

const newSticker = document.createElement("div");

newSticker.innerText = sticker.innerText;

newSticker.style.position = "absolute";

newSticker.style.left = "120px";

newSticker.style.top = "120px";

newSticker.style.fontSize = "40px";

newSticker.style.cursor = "grab";

newSticker.classList.add("draggable");

stickersLayer.appendChild(newSticker);

enableDrag(newSticker);

};

});


// ENABLE DRAG
function enableDrag(element){

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

element.addEventListener("mousedown", startDrag);
element.addEventListener("touchstart", startDrag);

function startDrag(e){

isDragging = true;

const rect = element.getBoundingClientRect();

if(e.type === "touchstart"){

offsetX = e.touches[0].clientX - rect.left;
offsetY = e.touches[0].clientY - rect.top;

document.addEventListener("touchmove", drag);
document.addEventListener("touchend", stopDrag);

}else{

offsetX = e.clientX - rect.left;
offsetY = e.clientY - rect.top;

document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

}

}

function drag(e){

if(!isDragging) return;

let x;
let y;

if(e.type === "touchmove"){

x = e.touches[0].clientX - offsetX;
y = e.touches[0].clientY - offsetY;

}else{

x = e.clientX - offsetX;
y = e.clientY - offsetY;

}

element.style.left = x + "px";
element.style.top = y + "px";

}

function stopDrag(){

isDragging = false;

document.removeEventListener("mousemove", drag);
document.removeEventListener("mouseup", stopDrag);

document.removeEventListener("touchmove", drag);
document.removeEventListener("touchend", stopDrag);

}

}


// ENABLE DRAG FOR TEXT
enableDrag(textOverlay);


// SAVE IMAGE
saveBtn.onclick = () => {

html2canvas(document.getElementById("cardCanvas")).then(canvas => {

const link = document.createElement("a");

link.download = "birthday_card.png";

link.href = canvas.toDataURL();

link.click();

});

};


// SHARE LINK
shareBtn.onclick = () => {

let text = messageInput.value;

let encoded = encodeURIComponent(text);

let url = window.location.href + "?wish=" + encoded;

alert("Private Link:\n" + url);

};


// LOAD SHARED TEXT
window.onload = () => {

const params = new URLSearchParams(window.location.search);

const wish = params.get("wish");

if(wish){

textOverlay.innerText = decodeURIComponent(wish);

}

};