async function greet() {
    return "hello!";
}

greet() 
.then((result)=>{
    console.log("promsie was resolved");
    console.log("result was",result);
})
.catch((err)=>{
    console.log("promsie was rejected: ",err);
});