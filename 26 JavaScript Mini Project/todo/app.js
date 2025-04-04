let btn = document.querySelector("button");
let ul = document.querySelector("ul");
let inp = document.querySelector("input");

btn.addEventListener("click", function() {
    let item = document.createElement("li");
    let delBtn = document.createElement("button");
    delBtn.innerText = "delete";

    if(inp.value.trim() === "") {
        alert("nempty task not be added in list!");
    }
    else {
        item.innerText = inp.value;
        delBtn.classList.add("delete"); // adding delBtn to 'delete' class
        item.appendChild(delBtn);


        ul.appendChild(item);
        inp.value = "";
    }
});

ul.addEventListener("click", function(event) {
    if(event.target.nodeName == 'BUTTON') {
        let listItem = event.target.parentElement;
        listItem.remove();
    }
});

// let delBtns = document.querySelectorAll(".delete");
// for(delBtn of delBtns) {
//     delBtn.addEventListener("click", function() {
//         let par = this.parentElement;
//         par.remove();
//     });
// }