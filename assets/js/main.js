// ! ----------------------------------------------- Project Variables

let posts = document.querySelector(".posts");
let login = document.querySelector(".login");
let register = document.querySelector(".register");
let overlay = document.querySelector(".overlay");
let sideMessage = document.querySelector(".side-message");
let loginWrapper = document.querySelector(".login__wrapper");
let CreatePostWrapper = document.querySelector(".create-post__wrapper");
let logout = document.querySelector(".logout");
let header = document.querySelector(".header");
let overlayWrapper = document.querySelector(".overlayWrapper");
let image;
let email;
let userName;
let name;
let postsCount;
let commentsCount;
// Pagination
let currentPage = 1;
let lastPage;
const baseUrl = "https://tarmeezacademy.com/api/v1";

// ! ----------------------------------------------- Tag Collections

// Create (HTML Tags Collection) 
let create = `
  <div class="create-post">
    <div class="create-post__head">
      <img src="" alt="USER" id="greate-image" class="user__image"/>
      <input class="create-new__post" type="text" placeholder="What Do You Think ?" readonly"/>
    </div>
    <!-- // Create Post Head -->
    <div class="create-post__images">
      <div class="img-wrapper">
        <img src="assets/images/video.jpg" alt="PHOTO"/>
        <p>Live Video</p>
      </div>
      <div class="img-wrapper">
        <img src="assets/images/photo.jpg" alt="PHOTO"/>
        <p>Photo / Vedio</p>
      </div>
      <div class="img-wrapper">
        <img src="assets/images/emotion.jpg" alt="PHOTO"/>
        <p>Emotion</p>
      </div>
    </div>
    <!-- // Border Images -->
  </div>
`;

// Create A New Post (HTML Tags Collection) 
let createNewPost = `
  <div class="overlay">
    <div class="login-overlay overlay__body">
      <div class="login-overlay__head head">
        <p>Create A New Post</p>
        <i class="closex fa-solid fa-xmark"></i>
      </div>
      <!-- Login Overlay Head -->
      <div class="login-overlay__body center">
        <div class="name">
          <label for="name">Title</label>
          <input type="text" id="name" placeholder="Enter Your Post Title"/>
        </div>
        <!-- // Title -->
        <div class="username">
          <label for="username">Enter Your Post Content</label>
          <textarea style="padding: 10px;" id="username" placeholder="Write Your Post Here" rows=7></textarea>
        </div>
        <!-- // Post Description -->
        <div class="password">
          <label for="password">Upload Your Image</label>
          <input type="file" id="password"/>
        </div>
        <!-- // Password -->
      </div>
      <!-- // Login Overlay Body -->
      <div class="login-overlay__footer footer">
        <button class="close btn">Close</button>
        <button class="login btn" onclick="createNewPostClicked()">Create Post</button>
      </div>
      <!-- // Login Overlay Footer -->
    </div>
    <!-- // Login Overlay -->
  </div>
`;

// Before Login Tags Collection
let beforeLogin = `
  <div class="before-login">
    <button class="login btn">login</button>
    <button class="register btn">Register</button>
  </div>
`;

// After Login Tags Collection
let afterLogin = `
  <div class="after-login">
    <div class="user">
      <img src="${image}" alt="USER" class="user__image"/>
      <p class="user__name"></p>
    </div>
    <!-- // User -->
    <button class="btn logout-btn logout">Log Out</button>
  </div>
`;

// Login Overlay (HTML Tags Collection) 
let loginOverlay = `
  <div class="overlay">
    <div class="login-overlay overlay__body">
      <div class="login-overlay__head head">
        <p>Login</p>
        <i class="closex fa-solid fa-xmark"></i>
      </div>
      <!-- Login Overlay Head -->
      <div class="login-overlay__body center">
        <div class="username">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Enter Your Username" value="elkisy"/>
        </div>
        <!-- // Username -->
        <div class="password">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter Your Password" value="123456"/>
        </div>
        <!-- // Password -->
      </div>
      <!-- // Login Overlay Body -->
      <div class="login-overlay__footer footer">
        <button class="close btn">Close</button>
        <button class="login btn" onclick="loginBtnClicked()">Login</button>
      </div>
      <!-- // Login Overlay Footer -->
    </div>
    <!-- // Login Overlay -->
  </div>
`;

// Register Overlay (HTML Tags Collection) 
let registerOverlay = `
  <div class="overlay">
    <div class="login-overlay overlay__body">
      <div class="login-overlay__head head">
        <p>Register A New User</p>
        <i class="closex fa-solid fa-xmark"></i>
      </div>
      <!-- Login Overlay Head -->
      <div class="login-overlay__body center">
        <div class="name">
          <label for="username">Username</label>
          <input type="text" id="name" placeholder="Enter Your Username" value="elkisy"/>
        </div>
        <!-- // Name -->
        <div class="username">
          <label for="username">Username</label>
          <input type="text" id="username" placeholder="Enter Your Username" value="elkisy"/>
        </div>
        <!-- // Username -->
        <div class="password">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter Your Password" value="123456"/>
        </div>
        <!-- // Password -->
        <div class="image password" style="margin-top: 20px;">
          <label for="password">Upload Your Image</label>
          <input type="file" id="image"/>
        </div>
        <!-- // image -->
      </div>
      <!-- // Login Overlay Body -->
      <div class="login-overlay__footer footer">
        <button class="close btn">Close</button>
        <button class="register btn" onclick="registerBtnClicked()">Register</button>
      </div>
      <!-- // Login Overlay Footer -->
    </div>
    <!-- // Login Overlay -->
  </div>
`;

// ! ----------------------------------------------- Setup LocalStorage

// Setup Website By LocalStorage
if (localStorage.token) {
  successLogin(JSON.parse(localStorage.username));
} else {
  successLogout();
}

// *** main --> ----------------------------------------------- Main Project Functions 

// ----------- Get Data Function Contain Get Posts Function
if (window.location.pathname !== "/post-detailes.html" && window.location.pathname !== "/profile.html") {
  function getData(page = 1) {
    async function getPosts() {
      let data = (await axios.get(`${baseUrl}/posts?limit=5&page=${page}`)).data;
      lastPage = data.meta.last_page;
      return data.data;
    }
    getPosts().then(postsData => {
      let cnt = 1;
      page === 1 ? posts.innerHTML = "" : "";
      for (let post of postsData) {
        posts.innerHTML += `
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
    });
  }
  getData();
}

// ----------- Get userPost Function
if (window.location.pathname === "/post-detailes.html") {
  function userPost() {
    let postId = window.location.search.slice(window.location.search.indexOf("=") + 1, window.location.search.length);
    axios.get(`${baseUrl}/posts/${postId}`)
      .then(post => {
        let myPost = post.data.data;
        let comments = post.data.data.comments;
        document.querySelector(".post-detailes").innerHTML = "";
        document.querySelector(".post-detailes").innerHTML += `
          <h1 class="user__post" style="text-transform: capitalize; margin-block: 40px;">${myPost.author.name} Post</h1>
          <div class="post">
          <div class="post__head">
          <img src=${myPost.author.profile_image} alt="USER" class="user__image"/>
          <p class="user__name">${myPost.author.name}</p>
          </div>
          <!-- // Post Head -->
          <div class="post__body">
          <div class="post__body--img-wrapper">
          <img src="${myPost.image}" alt="POST IMAGE" class="post__body--img">
          </div>
          <div class="post__body--time">${myPost.created_at}</div>
          <!-- // Post Body Img Wrapper -->
          <div class="post__body--content">
          <h3 class="post__body--content-head">${myPost.title === null ? "Post Title" : myPost.title}</h3>
          <p class="post__body--content-desc">
          ${myPost.body}
          </p>
          </div>
          <!-- // Post Body Content -->
          </div>
          <!-- // Post Body -->
          <div class="post__comment">
          <i class="fa-regular fa-comment"></i>
          <div class="comment-number">
          (${myPost.comments_count}) Comments
          </div>
          <span class="tags-container_1"></span>
          </div>
          <!-- // Post Body Comment -->
          <div class="post-comment__wrapper"></div>
          <!-- // Post Comment Wrapper -->
          <div class="send-comment" style="display: flex; align-items: center; gap: 10px;"></div>
          <!-- // Send Comment-->
          </div>
          <!-- // Post -->
        `;
        if (localStorage.token) {
          document.querySelector(".send-comment").innerHTML = `
            <input class="comment-input" style="padding: 20px; width: 100%; outline: none; border: none;" type="text" placeholder="Add Your Comment ... " />
            <button class="btn register" style="padding: 20px;" onclick="sendMessage(${myPost.id})">send</button> 
          `;
        }
        let tagsContainer = document.querySelector(`.tags-container_1`);
        for (tag of myPost.tags) {
          tagsContainer.innerHTML += `
            <button class="btn tag">${tag.name}</button>
          `;
        }
        let postComments = document.querySelector(".post-comment__wrapper");
        postComments.innerHTML = "";
          for (let comment of comments) {
            postComments.innerHTML += `
            <div class="user-comment" style="background-color: #E7ECF6; padding: 20px 30px; border-bottom: 2px solid red;">
              <div class="user-comment__desc" style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                <img style="width: 30px; border-radius: 50%;" src=${comment.author.profile_image} alt="USER" class="user__image"/>
                <span>${comment.author.username}</span>
              </div>
              <div class="user-comment__body">
                ${comment.body}
              </div>
            </div>
          `;
        }
    });
  }
  userPost();
}

// ----------- LoginBtnClicked Function
function loginBtnClicked() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector('#password').value;
  axios.post(`${baseUrl}/login`, {
    "username" : username,
    "password": password,
  }).then(response => {
    // Store User Data And Token Code In LocalStorage
    addToLocalStorage(JSON.stringify(response.data.user), response.data.token);
    // Close Overlay
    close();
    // Appearing Success Side Message 
    sideMessageAnimate("Logged In Successfully", "green");
    // Clear LoginWrapper Inner Code
    loginWrapper.innerHTML = "";
    // Disappearing Login & Register Buttons Then Appearing LogOut Btn And User Details
    successLogin(response.data.user);
  }).catch(error => {
    sideMessageAnimate(error.response.data.message, "red");
  });
}

// ----------- RegisterBtnClicked Function
function registerBtnClicked() {
  let username = document.querySelector("#username").value;
  let password = document.querySelector('#password').value;
  let mainName = document.querySelector("#name").value;
  let image = document.querySelector("#image").files[0];
  let formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  formData.append("name", mainName);
  formData.append("image", image);
  axios.post(`${baseUrl}/register`, formData).then((response) => {
    // Store User Data And Token Code In LocalStorage
    addToLocalStorage(JSON.stringify(response.data.user), response.data.token);
    // Close Overlay
    close();
    // Appearing Success Side Message 
    sideMessageAnimate("New User Registered Successfully", "green");
    // Clear LoginWrapper Inner Code
    loginWrapper.innerHTML = "";
    // Disappearing Login & Register Buttons Then Appearing LogOut Btn And User Details
    successLogin(response.data.user);
  }).catch(error => {
    sideMessageAnimate(error.response.data.message, "red");
  })
}

// ----------- CreateNewPostClicked Function
function createNewPostClicked() {
  let mainName = document.querySelector("#name").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector('#password').files[0];
  let formData = new FormData();
  formData.append("body", username);
  formData.append("title", mainName);
  formData.append("image", password);
  axios.post(`${baseUrl}/posts`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "authorization": `Bearer ${localStorage.token}`,
    }
  }).then(_ => {
    // Get My Data
    getData();
    // Close Overlay
    close();
    // Appearing Success Side Message
    sideMessageAnimate("Your Post had been Published", "green");
  }).catch(error => {
    sideMessageAnimate(error.response.data.message, "red");
  })
}

// ----------- sendComment Function
function sendMessage(userId) {
  if (localStorage.token) {
    let commentInput = document.querySelector(".comment-input").value;
    let token = localStorage.token;
    let url = `${baseUrl}/posts/${userId}/comments`;
    let params = {
      "body": commentInput,
    }
    // Add New Comment To Specific Post
    axios.post(url, params, {
      headers: {
        "authorization": `Bearer ${token}`,
      }
    }).then(_ => {
      sideMessageAnimate("The Comment Has Been Created Successfully", "green");
      userPost();
    }).catch(result => {
      sideMessageAnimate(result.response.data.message, "red");
    });
    // CallBack User Post 
    document.querySelector(".comment-input").value = "";
  }
}

// ! ----------------------------------------------- Events

// ^^Target (Login, Register, Logout) From Login Wrapper 
loginWrapper.addEventListener("click", (ele) => {
  if (ele.target.classList.contains("login")) {
    overlayWrapper.innerHTML += loginOverlay;
    setTimeout(() => {
      document.querySelector(".overlay__body").style.cssText = "transform: translateY(0);";
    }, 100);
  } else if (ele.target.classList.contains("register")) {
    overlayWrapper.innerHTML += registerOverlay;
    setTimeout(() => {
      document.querySelector(".overlay__body").style.cssText = "transform: translateY(0);";
    }, 100);
    userPost();
  } else if (ele.target.classList.contains("logout")) {
    localStorage.clear();
    // Clear LoginWrapper Inner Code
    loginWrapper.innerHTML = "";
    successLogout();
    sideMessageAnimate("Logged Out Successfully", "green");
    userPost();
  }
});

// ------------------ ^^Target Closes Button
overlayWrapper.addEventListener("click", (ele) => {
  if (ele.target.classList.contains("close") || ele.target.classList.contains("closex")) {
    close();
  }
});

// ------------------ ^^Target Input (Create Post)
if (window.location.pathname !== "/post-detailes.html") {
  CreatePostWrapper.addEventListener("click", (ele) => {
    if (ele.target.classList.contains("create-new__post")) {
      overlayWrapper.innerHTML += createNewPost;
      setTimeout(() => {
        document.querySelector(".overlay__body").style.cssText = "transform: translateY(0);";
      }, 100);
    }
  });
}

// ------------------ Pagination (InFinite Scrolling)
window.addEventListener("scroll", () => {
  const endPage = window.scrollY + window.innerHeight >= document.body.scrollHeight;
  if (endPage && currentPage <= lastPage) {
    getData(++currentPage);
  }
});

// ! ----------------------------------------------- Helpful Functions

// ------------------ Add To Local Storage Function
function addToLocalStorage(user, token) {
  localStorage.setItem("username", user);
  localStorage.setItem("token", token);
}

// ------------------ Side Message Animate Function
function sideMessageAnimate(message, color) {
  document.querySelector(".message").innerText = message;
  if (color === "red") {
    document.querySelector(".side-message").style.cssText = `background-color: red`;
    document.querySelector(".side-message i").className = "fa-solid fa-circle-xmark";
    document.querySelector(".side-message i").style.cssText = `color: darkred`;
  } else {
    document.querySelector(".side-message").style.cssText = `background-color: green`;
    document.querySelector(".side-message i").className = "fa-solid fa-circle-check";
    document.querySelector(".side-message i").style.cssText = `color: darkseagreen`;
  }
  setTimeout(() => {
    document.querySelector(".side-message").style.cssText += "transform: translateX(0);";
  }, 300);
  setTimeout(() => {
    document.querySelector(".side-message").style.cssText += "transform: translateX(200%);";
  }, 2000);
}

// ------------------ Close Function 
function close() {
  document.querySelector(".overlay__body").style.cssText = "transform: translateY(-500%);";
  overlayWrapper.innerHTML = "";
}

// ------------------ Success Login
function successLogin(user) {
  postsCount = user.posts_count;
  commentsCount = user.comments_count;
  userName = user.username;
  email = user.email;
  name = user.name;
  image = user.profile_image;
  loginWrapper.innerHTML += afterLogin;
  if (window.location.pathname !== "/post-detailes.html" && window.location.pathname !== "/profile.html") {
    document.querySelector(".create-post__wrapper").innerHTML = create;
  }
  document.querySelector(".user__name").innerText = userName;
  document.querySelector(".user__image").src = image;
  if (window.location.pathname !== "/post-detailes.html")
  if (window.location.pathname !== "/profile.html")
    document.getElementById("greate-image").src = image;
}

// ------------------ Success Logout
function successLogout() {
  loginWrapper.innerHTML += beforeLogin;
  if (window.location.pathname !== "/post-detailes.html") {
    document.querySelector(".create-post__wrapper").innerHTML = "";
  }
}

// ------------------- Go To Post Detailes
function postDetailes(postId) {
  window.location = `post-detailes.html?postId=${postId}`;
}

// ------------------- Edit Btn Clicked 
function editBtnClicked(post) {
  let userPost = JSON.parse(decodeURIComponent(post));
  overlayWrapper.innerHTML = `
    <div class="overlay">
      <div class="login-overlay overlay__body">
        <div class="login-overlay__head head">
          <p>Edit Post</p>
          <i class="closex fa-solid fa-xmark"></i>
        </div>
        <!-- Login Overlay Head -->
        <div class="login-overlay__body center">
          <div class="name">
            <label for="name">Title</label>
            <input type="text" id="name" placeholder="Enter Your Post Title" value="${userPost.title}"/>
          </div>
          <!-- // Title -->
          <div class="username">
            <label for="username">Enter Your Post Content</label>
            <textarea style="padding: 10px;" id="username" placeholder="Write Your Post Here" rows=7>${userPost.body}</textarea>
          </div>
          <!-- // Post Description -->
          <div class="password">
            <label for="password">Upload Your Image</label>
            <input type="file" id="password" value="${userPost.image}"/>
          </div>
          <!-- // Password -->
        </div>
        <!-- // Login Overlay Body -->
        <div class="login-overlay__footer footer">
          <button class="close btn">Close</button>
          <button class="login btn" onclick="editPostClicked(${userPost.id})">Update</button>
        </div>
        <!-- // Login Overlay Footer -->
      </div>
      <!-- // Login Overlay -->
    </div>
  `;
  setTimeout(() => {
    document.querySelector(".overlay__body").style.cssText = "transform: translateY(0);";
  }, 100);
}

// ------------------- Edit Post When Clicked
function editPostClicked(postId) {
  let mainName = document.querySelector("#name").value;
  let username = document.querySelector("#username").value;
  let password = document.querySelector('#password').files[0]; 
  let formData = new FormData();
  formData.append("body", mainName);
  formData.append("title", username);
  formData.append("image", password);
  formData.append("_method", "put");
  let url = `${baseUrl}/posts/${postId}`
  axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      "authorization": `Bearer ${localStorage.token}`,
    }
  }).then(_ => {
    if (window.location.pathname !== "/profile.html") {
      // Get My Data
      getData();
    } else {
      getUserPosts();
    }
    // Close Overlay
    close();
    // Appearing Success Side Message
    sideMessageAnimate("Your Post Has Been Edited", "green");
  }).catch(error => {
    sideMessageAnimate(error.response.data.message, "red");
  })
}

// ------------------- Delete Btn When Clicked
function deleteBtnClicked(postId) {
  overlayWrapper.innerHTML += `
    <div class="overlay">
      <div class="login-overlay overlay__body" id="#ok">
        <div class="login-overlay__head head">
          <p>Are You Sure You Want To Delete The Post</p>
          <i class="closex fa-solid fa-xmark"></i>
        </div>
        <!-- Login Overlay Head -->
        <div class="login-overlay__footer footer">
          <button class="close btn">Close</button>
          <button class="logout-btn btn" onclick="sureDeletePost(${postId})">Delete Post</button>
        </div>
        <!-- // Login Overlay Footer -->
      </div>
      <!-- // Overlay Body --> 
    </div>
    <!-- // Overlay -->
  `;
  setTimeout(() => {
    document.querySelector(".overlay__body").style.cssText = "transform: translateY(0);";
  }, 100);
}

// ------------------- Sure Delete Post
function sureDeletePost(postId) {
  // Axios Delete API
  axios.delete(`${baseUrl}/posts/${postId}`, {
    headers: {
      "authorization": `Bearer ${localStorage.token}`
    }
  }).then( _ => {
    if (window.location.pathname !== "/profile.html") {
      // Get My Data
      getData();
    } else {
      getUserPosts();
    }
    // Close Overlay
    close();
    // Appearing Success Side Message
    sideMessageAnimate("Your Post had been Published", "green");
  }).catch(error => {
    sideMessageAnimate(error.response.data.message, "red");
  })
}

// ------------------- Go Profile Function
function goProfile(userId) {
  window.location = `profile.html?userId=${userId}`;
}