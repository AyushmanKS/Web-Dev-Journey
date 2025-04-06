let h1 = document.querySelector("h1");

// function setColor(color, delay) {
//     setTimeout(()=>{
//         h1.style.color = color;
//     }, delay);
// }

// setColor("red",1000);
// setColor("yellow",2000);
// setColor("purple",3000);

function setColor(color, delay, nextColorChange) {
    setTimeout(()=>{
        h1.style.color = color;
        if(nextColorChange) nextColorChange();
    }, delay);
}

setColor("red",1000, ()=> {
    setColor("blue",1000, ()=>{
        setColor("purple",1000, ()=>{
            setColor("yellow",1000);   
        });
    });
});