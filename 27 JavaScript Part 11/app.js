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

function saveToDb(data, success, failure) {
    let internetSpeed = Math.floor(Math.random() * 10) + 1;
    if(internetSpeed > 4) {
        success();
    }
    else {
        failure();
    }
}

saveToDb("Ayushman",()=>{
    h1.innerText = "Data saved";
    saveToDb("Second success data",()=>{
        h1.innerText = "Second success data";
    },()=>{
        h1.innerText = "Data failed second time";
    });
    },
    ()=>{
        h1.innerText = "Not saved. check your internet speed and try again";
});