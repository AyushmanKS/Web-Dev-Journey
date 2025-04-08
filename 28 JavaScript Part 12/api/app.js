// let jsonRes = '{"fact":"Cats are subject to gum disease and to dental caries. They should have their teeth cleaned by the vet or the cat dentist once a year.","length":133}';

// let valiRes = JSON.parse(jsonRes);

// let student = {
//     name : "Ayushman",
//     marks: '99',
// };

let url = "https://catfact.ninja/fact";
fetch(url)
.then((response)=> {
    console.log(response);

    response.json().then((data)=> {
        console.log(data);
    });
})
.catch((err)=> {
    console.log("Error: ",err);
});