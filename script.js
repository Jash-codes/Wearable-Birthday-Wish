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

const canvas = document.getElementById("cardCanvas");


/* APPLY TEXT */
applyTextBtn.onclick = () => {

textOverlay.innerText = messageInput.value;

textOverlay.style.fontFamily = fontSelect.value;

textOverlay.style.color = textColor.value;

textOverlay.style.fontSize = fontSize.value + "px";

};


/* TEMPLATE SWITCH */
templateItems.forEach(template => {

template.onclick = () => {

templateImage.src = template.src;

};

});


/* ADD STICKERS */
stickers.forEach(sticker => {

sticker.onclick = () => {

const newSticker = document.createElement("div");

newSticker.innerText = sticker.innerText;

newSticker.style.position = "absolute";

newSticker.style.left = "150px";

newSticker.style.top = "150px";

newSticker.style.fontSize = "40px";

newSticker.style.cursor = "grab";

newSticker.classList.add("draggable");

stickersLayer.appendChild(newSticker);

makeDraggable(newSticker);

};

});


/* DRAG FUNCTION */
function makeDraggable(element) {

let offsetX = 0;
let offsetY = 0;
let isDragging = false;

element.addEventListener("mousedown", startDrag);
element.addEventListener("touchstart", startDrag);


function startDrag(e) {

e.preventDefault();

isDragging = true;

const rect = element.getBoundingClientRect();
const canvasRect = canvas.getBoundingClientRect();

if (e.type === "touchstart") {

offsetX = e.touches[0].clientX - rect.left;
offsetY = e.touches[0].clientY - rect.top;

document.addEventListener("touchmove", drag);
document.addEventListener("touchend", stopDrag);

} else {

offsetX = e.clientX - rect.left;
offsetY = e.clientY - rect.top;

document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", stopDrag);

}

function drag(e) {

if (!isDragging) return;

let clientX;
let clientY;

if (e.type === "touchmove") {

clientX = e.touches[0].clientX;
clientY = e.touches[0].clientY;

} else {

clientX = e.clientX;
clientY = e.clientY;

}

let x = clientX - canvasRect.left - offsetX;
let y = clientY - canvasRect.top - offsetY;


/* LIMIT INSIDE CARD */
const maxX = canvas.clientWidth - element.offsetWidth;
const maxY = canvas.clientHeight - element.offsetHeight;

x = Math.max(0, Math.min(x, maxX));
y = Math.max(0, Math.min(y, maxY));

element.style.left = x + "px";
element.style.top = y + "px";

}

function stopDrag() {

isDragging = false;

document.removeEventListener("mousemove", drag);
document.removeEventListener("mouseup", stopDrag);

document.removeEventListener("touchmove", drag);
document.removeEventListener("touchend", stopDrag);

}

}

}


/* ENABLE DRAG FOR TEXT */
makeDraggable(textOverlay);


/* SAVE IMAGE */
saveBtn.onclick = () => {

html2canvas(canvas).then(canvasImage => {

const link = document.createElement("a");

link.download = "birthday_card.png";

link.href = canvasImage.toDataURL();

link.click();

});

};


/* SHARE LINK */
shareBtn.onclick = () => {

let text = messageInput.value;

let encoded = encodeURIComponent(text);

let url = window.location.href + "?wish=" + encoded;

alert("Private Link:\n" + url);

};


/* LOAD SHARED MESSAGE */
window.onload = () => {

const params = new URLSearchParams(window.location.search);

const wish = params.get("wish");

if (wish) {

textOverlay.innerText = decodeURIComponent(wish);

}

};

const photoSize = document.getElementById("photoSize");

photoSize.oninput = () => {

uploadedPhoto.style.width = photoSize.value + "px";
uploadedPhoto.style.height = photoSize.value + "px";

};