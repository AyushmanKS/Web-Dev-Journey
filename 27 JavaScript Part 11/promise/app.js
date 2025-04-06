let h1 = document.querySelector("h1");

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

function saveToDb(data) {
    return new Promise((resolve, reject)=>{
        let internetSpeed = Math.floor(Math.random() * 10) + 1;
        if(internetSpeed > 4) {
            resolve("success: data was saved");
        }
        else {
            reject("failed: weak connection");
        }
    });
}