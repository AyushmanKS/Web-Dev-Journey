let h1 = document.querySelector("h1");

function setColor(color, delay) {
    return new Promise((resolve, reject)=>{
        setTimeout(()=>{
            h1.style.color = color;
            resolve("color changed");
        }, delay);
    });
}

setColor("red",1000)
.then(()=>{
    return setColor("yellow",1000);
})
.then(()=>{
    return setColor("purple",1000);
})
.then(()=>{
    return setColor("blue",1000);
})
.catch(()=>{
    console.log("color change rejecetd");
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

saveToDb("Ayushman")
.then((result)=>{
    console.log("Data 1 saved");
    console.log("result of promise: ",result);
    return saveToDb("Ayushman");
})
.then((result)=>{
    console.log("Data 2 saved");
    console.log("result of promise: ",result);
})
.catch((result)=>{
    console.log("promise was rejected");
    console.log("result of promise: ",result);
});