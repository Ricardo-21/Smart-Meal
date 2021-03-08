async function makePost(data, title, dom, posted=false, id="", aoe, ingr){
    const postCont = document.createElement("div");
    postCont.className ="post-cont";
    postCont.id = id;
    const post = document.createElement("div");
    post.className = "post";
    const name = document.createElement("h2");
    name.className = "Title";
    name.innerText = title;
    //content
    const infoContainer = document.createElement("div");
    infoContainer.className = "post-content";
    const info = document.createElement("div");
    info.className = "post-info";
    //calories
    const calCont = document.createElement("div");
    calCont.className = "post-calories-cont"
    const calCount = document.createElement("h4");
    calCount.className = "post-calories";
    calCount.innerText = `Calories: ${data.calories}`;
    calCont.append(calCount);

    //Image and nutrition
    const nutritionCont = document.createElement("div");
    nutritionCont.className = "post-nutrition";
    //image
    const imgContainer = document.createElement("div");
    imgContainer.className = "img-container";
    const mealImage = document.createElement("img");
    mealImage.src = "https://post.healthline.com/wp-content/uploads/2020/09/kidney-beans-732x549-thumbnail.jpg";
    mealImage.className = "post-image";
    imgContainer.append(mealImage);

    //nutrients
    const nutrientCont = document.createElement("div");
    nutrientCont.className = "post-nutrients-cont";
    const ingrCont = document.createElement("div");
    ingrCont.className = "post-ingr-cont";
    const ingrs = document.createElement("p");
    ingrs.className = "post-ingrs";
    // console.log(data, data.ingredients)
    if(aoe === 'a')
    {
        ingrs.innerText = `Ingredients: \n${ingr.map(ing => ing).join(", ")}`;
    }
    else {
        ingrs.innerText = `Ingredients: \n${data.ingredients.map(ing => ing.text).join(", ")}`;
    }

    ingrCont.append(ingrs);
    nutrientCont.append(ingrCont);

    const vitimensContainer = document.createElement("div");
    vitimensContainer.className = "post-vitimens-cont";
    const vitimens = document.createElement("p");
    vitimens.className = "post-vitimen";
    //sort by quantity for each nutrient TODO
    let vitimensContent = "Vitamens: \n";
    let allVitamins = Object.keys(data.totalNutrients).sort((a,b) => data.totalNutrients[b].quantity - data.totalNutrients[a].quantity)
    allVitamins.forEach((vit, ind, arr) => {
        if(ind < arr.length - 1) {
            vitimensContent += `${vit}, `;
        } else {
            vitimensContent += `${vit}`;
        };
    });
    vitimens.innerText = vitimensContent;
    vitimensContainer.append(vitimens);
    nutrientCont.append(vitimensContainer);


    nutritionCont.append(imgContainer, nutrientCont);
    info.append(calCont, nutritionCont)
    infoContainer.append(info);

    //Health labels
    const labelContainer = document.createElement("div");
    labelContainer.className = "post-labels";
    // labelContainer.innerHTML = "<h3>Labels:</h3><br>"
    data.healthLabels.forEach((label,ind) => {
        if(ind < 5){
            const healthLabel = document.createElement('div')
            healthLabel.className = "post-label";
            healthLabel.innerText = label;
            labelContainer.append(healthLabel);
        }
    })

    const socialBox = document.createElement("div");
    socialBox.className = "social-box";
    const btnCont = document.createElement("div");
    btnCont.classList.add("post-btn-cont");

    const likes = document.createElement("div");
    likes.className = "like-container";
    const likeBtn = document.createElement("div");
    likeBtn.classList.add("like-btn","social-btn");
    likeBtn.innerText = "❤";
    likes.append(likeBtn);
    if("likes" in data){
        const likeCount = document.createElement("div");
        likeCount.className = "like-count";
        likeCount.innerText = `${data.likes}`;
        likeBtn.append(likeCount);
    }
    likeBtn.addEventListener("click", addLike);
    const share = document.createElement("div");
    share.className = "share-container";
    const shareBtn = document.createElement("div");
    shareBtn.classList.add("share-btn","social-btn");
    shareBtn.innerText = "🧻"
    share.append(shareBtn);
    shareBtn.addEventListener("click", shareRecipe)
    const comments = document.createElement("div");
    comments.className = "comments-container";
    const commentIcon = document.createElement("div");
    commentIcon.classList.add("comments-btn","social-btn");
    commentIcon.addEventListener("click", commentRecipe);
    commentIcon.innerText = "🍔";
    comments.append(commentIcon);
    btnCont.append(likes, share, comments);

    const postBtnCont = document.createElement("div");
    postBtnCont.classList.add("post-container");
    const postBtn = document.createElement("div");
    postBtn.innerText = "+";
    postBtn.addEventListener("click", (e) => {
        if(localStorage.getItem("userUID") && localStorage.getItem("userUID") !== "undefined"){
            postJson(title, data, ingr);
            e.target.parentElement.parentElement.parentElement.parentElement.innerHTML = `<h4>Recipe Posted!</h4>`
        } else {
            alert("Please sign in to post ^_^");
        }
    });
    postBtn.classList.add("post-btn");
    postBtnCont.append(postBtn);
    
    if(posted){
        postBtnCont.style.display = "none"
    }

    socialBox.append(btnCont, postBtnCont);

    post.append(name, infoContainer, labelContainer);
    postCont.append(post, socialBox);
    dom.append(postCont);
}

function addLike(e) {
    // console.log(e);
    let elementId;
    let currentLikes;
    if(e.target.className === "like-count") {
        elementId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        currentLikes = e.target.innerText;
        e.target.innerText = Number(currentLikes) + 1;
    } else {
        elementId = e.target.parentElement.parentElement.parentElement.parentElement.id;
        currentLikes = e.target.querySelector(".like-count").innerText;
        e.target.querySelector(".like-count").innerText = Number(currentLikes) + 1;
    }
    // console.log(elementId, currentLikes);
    
    //Firebase
    let likes;
    dbRef.ref(elementId + "/likes").on("value", snap => {
        likes = snap.val();
    });
    
    dbRef.ref(elementId + "/likes").set(likes + 1);
    
    //JSON server
    // const option = {
    //     method: "PATCH",
    //     headers : {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         likes: Number(currentLikes) + 1
    //     })
    // }

    // fetch(`http://localhost:3000/posts/${elementId}`, option);
}

function shareRecipe(e) {

}

async function commentRecipe(e) {
    const post = e.target.parentElement.parentElement.parentElement.parentElement.querySelector(".post");
    const id = e.target.parentElement.parentElement.parentElement.parentElement.id;
    // console.log(id);
    //getting comments 
    
    //Firebase
    const postRef = dbRef.ref(id)
    let json;
    postRef.on("value",snap=> json = snap.val());
    let comments = json.comments || [];
    if(comments){
        comments = Object.keys(comments).map(key => comments[key]);
    }
    
    if(post.querySelector("#post-comments-title")){
        // console.log("toggle");
        const title = json.title;
        const calories = json.calories;
        const ingr = json.ingredients || ingr;
        const totalNutrients = json.totalNutrients;
        const labels = json.healthLabels;
        post.innerHTML = `
            <h4 class="Title">${title}</h4>
            <div class="post-content">
                <div class="post-info">
                    <div class="post-calories-cont">
                        <h4 class="post-calories">Calories: ${calories}</h4>
                    </div>
                    <div class="post-nutrition">
                        <div class="img-container">
                            <img class="post-image" src="https://post.healthline.com/wp-content/uploads/2020/09/kidney-beans-732x549-thumbnail.jpg">
                        </div>
                        <div class="post-nutrients-cont">
                            <div class="post-ingr-cont">
                                <p class="post-ingrs">
                                    Ingredients: 
                                    <br>
                                    ${ingr.map(food => food.text).join(", ")}
                                </p>
                            </div>
                            <div class="post-vitimens-cont">
                                <p class="post-vitimen">
                                    Vitamens:
                                    <br>
                                    ${Object.keys(totalNutrients).sort((a,b)=> totalNutrients[b].quantity - totalNutrients[a].quantity).join(", ")}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="post-labels">
                ${labels.map((l, ind) => {
                    if(ind < 5){
                        return `
                            <div class="post-label">
                            ${l}
                            </div>
                        `
                    }
                }).join("\n")}
            </div>
        `
    } else {
        function getUserName(comment){
            let result;
            dbRef.ref("users/" + comment.user).on("value",snap => result = snap.val().userName);
            return result;
        }

        post.innerHTML = `
            <h2 class="Title" id="post-comments-title">
                Comments
            </h2>
            <div class="post-info">
                <div class="comments">
                    ${comments.map(com => `
                        <div class="comment">
                            <h4 class="userName">
                                ${getUserName(com)}
                            </h4>
                            <p class="comment-content">${com.text}</p>
                        </div>
                    `).join("\n")}
                </div>
                <form id="add-comment">
                    <input class="user-comment" type="text" required></input>
                    <input class="submit-comment"type="submit" value="send"></input>
                </form>
            </div>
        `;
        post.querySelector("#add-comment").addEventListener("submit", addComment);
    }
}

async function addComment(e){
    e.preventDefault();
    const id = e.target.parentElement.parentElement.parentElement.id;
    //Firebase
    const postRef = dbRef.ref(id + "/comments").push();
    postRef.set({
        user: localStorage.getItem("userUID"),
        text: e.target[0].value,
        time: new Date()
    });

    function getUserName(id){
        let result;
        dbRef.ref("users/" + id).on("value",snap => result = snap.val().userName);
        return result;
    }

    //JSON Server
    // let post = await fetch(`http://localhost:3000/posts/${id}`);
    // let json = await post.json();
    // let comments = json.comments;
    const newComment = e.target[0].value;
    // comments.push(newComment);

    const commentSection = e.target.parentElement.querySelector(".comments");
    const commentDom = document.createElement("div");
    commentDom.classList.add("comment");
    commentDom.innerHTML = `
        <h4 class="userName">${getUserName(localStorage.getItem("userUID"))}</h4>
        <p class="comment-content">${newComment}</p>
    `
    commentSection.append(commentDom);
    commentSection.scrollTop = commentSection.scrollHeight
    
    // const option = {
    //     method: "PATCH",
    //     headers : {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         comments: comments
    //     })
    // };

    // fetch(`http://localhost:3000/posts/${id}`, option)
    // .then(res => res.json())
    // .then(data => console.log(data));

    e.target.reset();
}