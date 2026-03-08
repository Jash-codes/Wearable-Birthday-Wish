function generateLink(){

let name=document.getElementById("name").value
let msg=document.getElementById("message").value

let encodedName=encodeURIComponent(name)
let encodedMsg=encodeURIComponent(msg)

let url=window.location.origin + "/wish.html?name=" + encodedName + "&msg=" + encodedMsg

document.getElementById("link").innerHTML=
"<a href='"+url+"' target='_blank'>"+url+"</a>"
}

function getParams(){

const params=new URLSearchParams(window.location.search)

let name=params.get("name")
let msg=params.get("msg")

if(name && msg){

document.getElementById("wish").innerText=
"🎂 Happy Birthday "+name+"! 🎉 "+msg
}

}

window.onload=getParams