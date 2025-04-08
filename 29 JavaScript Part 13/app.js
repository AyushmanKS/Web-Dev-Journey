let btn = document.querySelector("#cat");
let dogBtn = document.querySelector("#dog");

btn.addEventListener("click",async ()=>{
    let fact = await getFacts();
    let p = document.querySelector("#result");
    p.innerHTML = fact;
});

dogBtn.addEventListener("click",async ()=>{
    let link = await getImage();
    let image = document.querySelector("#output");
    image.setAttribute("src", link);
});

let url = "https://catfact.ninja/fact";
let url2 = "https://dog.ceo/api/breeds/image/random";

async function getFacts() {
    try {
        let res = await axios.get(url);
        return res.data.fact;
    }
    catch(e) {
        console.log("Error: ",e);
        return "No fact found!";
    }
}

async function getImage() {
    try {
        let res = await axios.get(url2);
        return res.data.message;
    }
    catch(err) {
        console.log("Error: ",err);
        return "No image found!";
    }
}

