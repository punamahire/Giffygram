import { showMyPost } from "./showMyPost.js";

export const showMyList = (myPosts) => {
	let postHTML = "";
		//Loop over the array of posts and for each one, invoke the Post component which returns HTML representation
		for (const postObject of myPosts) {
			//what is a postObject?
			postHTML += showMyPost(postObject)
		}
		return postHTML;
	
}