import { getUsers, getPosts, usePostCollection, getLoggedInUser, setLoggedInUser, createPost, deletePost, getSinglePost, updatePost, logoutUser, loginUser, registerUser } from "./data/DataManager.js"
import { LoginForm } from "./auth/LoginForm.js"
import { RegisterForm } from "./auth/RegisterForm.js"
import { PostList } from "./feed/PostList.js"
import { PostEntry } from "./feed/PostEntry.js"
import { PostEdit } from "./feed/postEdit.js"
import { NavBar } from "./nav/NavBar.js"
import { Footer } from "./nav/Footer.js"

const applicationElement = document.querySelector(".giffygram");

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logout"){
		console.log("You clicked on logout")
    logoutUser();
    console.log(getLoggedInUser());
    sessionStorage.clear();
    checkForUser();
	}
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "login__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='name']").value,
      email: document.querySelector("input[name='email']").value
    }
    loginUser(userObject)
    .then(dbUserObj => {
      if(dbUserObj){
        sessionStorage.setItem("user", JSON.stringify(dbUserObj));
        startGiffyGram();
      }else {
        //got a false value - no user
        const entryElement = document.querySelector(".entryForm");
        entryElement.innerHTML = `<p class="center">That user does not exist. Please try again or register for your free account.</p> ${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
      }
    })
  }
})

applicationElement.addEventListener("click", event => {
  event.preventDefault();
  if (event.target.id === "register__submit") {
    //collect all the details into an object
    const userObject = {
      name: document.querySelector("input[name='registerName']").value,
      email: document.querySelector("input[name='registerEmail']").value
    }
    registerUser(userObject)
    .then(dbUserObj => {
      sessionStorage.setItem("user", JSON.stringify(dbUserObj));
      startGiffyGram();
    })
  }
})

applicationElement.addEventListener("change", event => {
    if (event.target.id === "yearSelection") {
      const yearAsNumber = parseInt(event.target.value)
      console.log(`User wants to see posts since ${yearAsNumber}`)
      //invoke a filter function passing the year as an argument
      showFilteredPosts(yearAsNumber);
    }
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "directMessageIcon"){
		alert("You clicked on pen to edit")
	}
})

applicationElement.addEventListener("click", event => {
	if (event.target.id === "logo-icon"){
		alert("Do you want to go to home page?")
	}
})

applicationElement.addEventListener("click", event => {
    if (event.target.id === "newPost__cancel") {
        //clear the input fields
        document.querySelector("input[name='postTitle']").value = ""
        document.querySelector("input[name='postURL']").value = ""
        document.querySelector("textarea[name='postDescription']").value = ""
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id === "newPost__submit") {
    //collect the input values into an object to post to the DB
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      //we have not created a user yet - for now, we will hard code `1`.
      //we can add the current time as well
      const postObject = {
          title: title,
          imageURL: url,
          description: description,
          userId: getLoggedInUser().id,
          timestamp: Date.now()
      }
  
    // be sure to import from the DataManager
        createPost(postObject)
        .then(showPostList())
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();

    if (event.target.id.startsWith("delete")) {
        const postId = parseInt(event.target.id.split("__")[1])
        deletePost(postId)
        .then(response => {
            showPostList()
        })
    }
})

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("edit")) {
      const postId = event.target.id.split("__")[1];
      getSinglePost(postId)
        .then(response => {
          showEdit(response);
        })
    }
  })

applicationElement.addEventListener("click", event => {
    event.preventDefault();
    if (event.target.id.startsWith("updatePost")) {
      const postId = event.target.id.split("__")[1];
      //collect all the details into an object
      const title = document.querySelector("input[name='postTitle']").value
      const url = document.querySelector("input[name='postURL']").value
      const description = document.querySelector("textarea[name='postDescription']").value
      const timestamp = document.querySelector("input[name='postTime']").value
      
      const postObject = {
        title: title,
        imageURL: url,
        description: description,
        userId: getLoggedInUser().id,
        timestamp: parseInt(timestamp),
        id: parseInt(postId)
      }
      
      updatePost(postObject)
        .then(response => {
            // show updated list of posts
            showPostList(); 
            // replace the edit form with new post entry form
            showPostEntry()
        })
    }
  })

const showEdit = (postObj) => {
const entryElement = document.querySelector(".entryForm");
entryElement.innerHTML = PostEdit(postObj);
}

const showPostEntry = () => { 
    //Get a reference to the location on the DOM where the nav will display
    const entryElement = document.querySelector(".entryForm");
    entryElement.innerHTML = PostEntry();
}

const showFilteredPosts = (year) => {
    //get a copy of the post collection
    const epoch = Date.parse(`01/01/${year}`);
    //filter the data
    const filteredData = usePostCollection().filter(singlePost => {
      if (singlePost.timestamp >= epoch) {
        return singlePost
      }
    })
    const postElement = document.querySelector(".postList");
    postElement.innerHTML = PostList(filteredData);

    const numOfPosts = filteredData.length
    let postCountEl = document.querySelector("#postCount");
    postCountEl.innerHTML = `${numOfPosts} posts found`
}

const showFooterContent = () => {
    const entryElement = document.querySelector(".footer__item");
    entryElement.innerHTML = Footer();
}

const showPostList = () => {
	//Get a reference to the location on the DOM where the list will display
	const postElement = document.querySelector(".postList");
	getPosts().then((allPosts) => {
		postElement.innerHTML = PostList(allPosts);
	})
}

const showNavBar = () => {
    //Get a reference to the location on the DOM where the nav will display
    const navElement = document.querySelector("nav");
	navElement.innerHTML = NavBar();
}

const startGiffyGram = () => {
    const postElement = document.querySelector(".postList");
	postElement.innerHTML = "Hello Cohort 55"
    showNavBar();
    showFooterContent();
    showPostEntry();
    showPostList();
}

const checkForUser = () => {
  if (sessionStorage.getItem("user")){
    setLoggedInUser(JSON.parse(sessionStorage.getItem("user")));
    startGiffyGram();
  }else {
    //show login/register
    showLoginRegister();
  }
}

const showLoginRegister = () => {
  showNavBar();
  const entryElement = document.querySelector(".entryForm");
  //template strings can be used here too
  entryElement.innerHTML = `${LoginForm()} <hr/> <hr/> ${RegisterForm()}`;
  //make sure the post list is cleared out too
  const postElement = document.querySelector(".postList");
  postElement.innerHTML = "";
}

// Are you defining the function here or invoking it?
checkForUser();







