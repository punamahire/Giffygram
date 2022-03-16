import { getUsers, getPosts } from "./data/DataManager.js"

getUsers()
.then(data => {
    console.log("User Data", data)
})

getPosts()
.then(data => {
    console.log("Post Data", data)
})


const startGiffyGram = () => {
    const postElement = document.querySelector(".postList");
	postElement.innerHTML = "Hello Cohort 55"
}
// Are you defining the function here or invoking it?
startGiffyGram();



