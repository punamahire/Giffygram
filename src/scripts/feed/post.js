import { getLoggedInUser } from "../data/DataManager.js"

export const Post = (postObject) => {
    let d = new Date(postObject.timestamp)
    //const userInfo = JSON.parse(sessionStorage.getItem("user"))

    return `
      <section class="post">
        <header>
            
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <h3><strong>Author: ${postObject.user.name}</strong> </h3>
        <p class="post__description">${postObject.description}</p>
        <p>Posted by ${postObject.user.name} on ${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()}</p>
          ${(parseInt(getLoggedInUser().id) === parseInt(postObject.userId)) ?
        
          `<div class="edit-delete-btns"> 
            <div class="post__edit"><button class="edit_btn" id="edit__${postObject.id}">Edit</button></div>
            <div class="post__delete"><button class="delete_btn" id="delete__${postObject.id}">Delete</button></div>
          </div>`

        : ""}
      </section>
    `
  }

// const showEditDeleteBtns = (postObject) => {
//   const userData = JSON.parse(sessionStorage.getItem("user"))
//   if (parseInt(userData.id) === parseInt(postObject.userId)) {
//      return true
//   } else {
//     return false
//   }

// }

//${showEditDeleteBtns(postObject) ? 