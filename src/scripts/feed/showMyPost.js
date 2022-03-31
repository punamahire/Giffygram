export const showMyPost = (myPostObj) => {
    let d = new Date(myPostObj.timestamp)
    const userInfo = JSON.parse(sessionStorage.getItem("user"))
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${myPostObj.title}</h2>
        </header>
        <img class="post__image" src="${myPostObj.imageURL}" />
        <p><strong>Author: ${userInfo.name}</strong> </p>
        <p class="post__description">${myPostObj.description}</p>
        <p>Posted by ${userInfo.name} on ${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()}</p>
        <div class="edit-delete-btns"> 
            <div class="post__edit"><button class="edit_btn" id="edit__${myPostObj.id}">Edit</button></div>
            <div class="post__delete"><button class="delete_btn" id="delete__${myPostObj.id}">Delete</button></div>
          </div>
      </section>
    `
}