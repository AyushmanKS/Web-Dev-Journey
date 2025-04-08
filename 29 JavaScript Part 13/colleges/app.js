let btn = document.querySelector("button");

btn.addEventListener("click", async () => {
    let country = document.querySelector("input").value.trim();
    if (country === "") return;

    let colleges = await getColleges(country);
    show(colleges);
});

function show(collegeArray) {
    let list = document.querySelector("#list");
    list.innerText = "";

    for (let college of collegeArray) {
        let li = document.createElement("li");
        li.innerText = college.name;
        list.appendChild(li);
    }
}

async function getColleges(country) {
    try {
        let url = `http://universities.hipolabs.com/search?country=${country}`;
        let res = await axios.get(url);
        return res.data;
    } catch (err) {
        console.log("Error:", err);
        return [];
    }
}
