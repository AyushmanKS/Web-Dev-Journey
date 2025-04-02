let btn = document.querySelector("button");
console.dir(btn);

// btn.onclick = function () {
//     console.log("Button was clicked");
// }

// btn.onclick = sayHello;
// btn.onmouseenter = function() {
//     console.log("Hovering over button!");
// }

btn.addEventListener('click', sayHello);

function sayHello() {
    alert("Hello !");
}