export const Post = (postObject) => {
    let d = new Date(postObject.timestamp)
    return `
      <section class="post">
        <header>
            <h2 class="post__title">${postObject.title}</h2>
        </header>
        <img class="post__image" src="${postObject.imageURL}" />
        <p class="post__description">${postObject.description}</p>
        <p>Posted by user-${postObject.userId} on ${d.getDate()}/${(d.getMonth()+1)}/${d.getFullYear()}</p>
        <div class="edit-delete-btns">
          <div class="post__edit"><button class="edit_btn" id="edit__${postObject.id}">Edit</button></div>
          <div class="post__delete"><button class="delete_btn" id="delete__${postObject.id}">Delete</button></div>
        </div>
      </section>
    `
  }