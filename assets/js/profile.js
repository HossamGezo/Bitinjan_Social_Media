let userId = window.location.search.slice(window.location.search.indexOf("=") + 1, window.location.search.length);
let userLocalId = JSON.parse(localStorage.username).id;
userId === "undefined" ? userId = userLocalId : userId;

function getUserProfile() {
  axios.get(`${baseUrl}/users/${userId}`)
    .then(response => {
      let data = response.data.data;
      return data;
    }).then(data => {
      document.querySelector(".main-detailes__image-img").src = data.profile_image;
      document.querySelector(".email").innerText = data.email;
      document.querySelector(".userName").innerText = data.username;
      document.querySelector(".name").innerText = data.name;
      document.querySelector(".postsCount").innerHTML = `${data.posts_count} <sub>Posts</sub>`;
      document.querySelector(".commentsCount").innerHTML = `${data.comments_count} <sub>Comments</sub>`;
      document.querySelector(".profile__name").innerHTML = `${data.name} Posts`;
    }).catch(error => {
      console.log(error);
    });
}
getUserProfile();

function getUserPosts() {
  axios.get(`${baseUrl}/users/${userId}/posts`)
    .then(response => {
      let data = response.data.data;
      return data;
    }).then(postsData => {
      let cnt = 1;
      document.querySelector(".profile__posts").innerHTML = "";
      for (let post of postsData) {
        document.querySelector(".profile__posts").innerHTML += `
          <div class="post">
            <div class="post__head" style="display: flex; justify-content: space-between;">
              <div onclick="goProfile(${post.author.id});" class="post__head-right" style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <img src=${post.author.profile_image} alt="USER" class="user__image"/>
                <p class="user__name">${post.author.name}</p>
              </div>
              <!-- // Post Head Right -->
              <div class="post__head-left_${cnt}"></div>
              <!-- // Post Head Left -->
            </div>
            <!-- // Post Head -->
            <div class="post__body" onclick="postDetailes(${post.id})">
              <div class="post__body--img-wrapper">
              <img src="${post.image}" alt="POST IMAGE" class="post__body--img">
            </div>
            <div class="post__body--time">${post.created_at}</div>
            <!-- // Post Body Img Wrapper -->
            <div class="post__body--content">
              <h3 class="post__body--content-head">${post.title === null ? "Post Title" : post.title}</h3>
              <p class="post__body--content-desc">
                ${post.body}
              </p>
            </div>
            <!-- // Post Body Content -->
            </div>
            <!-- // Post Body -->
            <div class="post__comment">
              <i class="fa-regular fa-comment"></i>
              <div class="comment-number">
                (${post.comments_count}) Comments
              </div>
              <span class="tags-container_${cnt}"></span>
            </div>
            <!-- // Post Body Comment -->
          </div>
          <!-- // Post -->
        `;
        // Add Edit Button To User Post
        let userId = JSON.parse(localStorage.username).id;
        if (userId === post.author.id) {
          document.querySelector(`.post__head-left_${cnt}`).innerHTML = `
            <button class="edit register btn" onclick="editBtnClicked('${encodeURIComponent(JSON.stringify(post))}');" style="border-radius: none;">edit</button>
            <button class="delete logout-btn btn" onclick="deleteBtnClicked('${post.id}');" style="border-radius: none;">delete</button>
          `;
        }
        // Add Tags To The Bost
        let tagsContainer = document.querySelector(`.tags-container_${cnt++}`);
        tagsContainer.innerHTML = "";
        for (tag of post.tags) {
          tagsContainer.innerHTML += `
            <button class="btn tag">${tag.name}</button>
          `;
        }
      }
    }).catch(error => {
      console.log(error);
    }) 
}
getUserPosts();