const clrPicker = document.getElementById('text-colour');
const canvasclr = document.getElementById('canvasColour');
const fontSize=document.getElementById('fontSize');
const canvas = document.getElementById('myCanvas');

const clear = document.getElementById('clearBtn');
const save = document.getElementById('saveBtn');
const retrieve = document.getElementById('retrieveBtn');
let isDrawing = false; 

const ctx=canvas.getContext("2d");

clrPicker.addEventListener('change',(e)=>{
    ctx.strokeStyle = e.target.value;
    ctx.fillStyle =  e.target.value;
})

canvas.addEventListener('mousedown',(e)=>{
    isDrawing = true;
    lastX=e.offsetX;
    lastY=e.offsetY;
})

canvas.addEventListener('mousemove',(e)=>{
    if(isDrawing){
        ctx.beginPath();
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        lastX=e.offsetX;
        lastY=e.offsetY;
    }
})

canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);


canvasclr.addEventListener('change',(e)=>{
    ctx.fillStyle = e.target.value;
    ctx.fillRect(0,0,800,500);
})

fontSize.addEventListener('change',(e)=>{
    ctx.lineWidth = e.target.value;
})

clear.addEventListener('click',()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

save.addEventListener('click',()=>{
    localStorage.setItem('canvasContents',canvas.toDataURL());

    let link = document.createElement('a');

    link.download = 'my-canvas.png';

    link.href = canvas.toDataURL();

    link.click();
})

retrieve.addEventListener('click',()=>{
    let savedCanvas = localStorage.getItem('canvasContents');

    if(savedCanvas){
        let img=new Image();
        img.src = savedCanvas;
        ctx.drawImage(img,0,0)
    }
})