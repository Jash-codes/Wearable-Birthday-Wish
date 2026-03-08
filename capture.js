function captureScreenshot(){

html2canvas(document.body).then(canvas =>{

let link=document.createElement("a")
link.download="birthday-memory.png"
link.href=canvas.toDataURL()
link.click()

})

}


let mediaRecorder
let chunks=[]

function startRecording(){

let stream=document.querySelector("canvas").captureStream(30)

mediaRecorder=new MediaRecorder(stream)

mediaRecorder.ondataavailable=e=>{
chunks.push(e.data)
}

mediaRecorder.onstop=e=>{

let blob=new Blob(chunks,{type:"video/webm"})
let url=URL.createObjectURL(blob)

let a=document.createElement("a")
a.href=url
a.download="birthday-video.webm"
a.click()

}

mediaRecorder.start()

setTimeout(()=>{

mediaRecorder.stop()

},5000)

}