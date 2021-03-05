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
    console.log(data, data.ingredients)
    if(aoe === 'a')
    {
        ingrs.innerText = `Ingredients: \n${ingr.map(ing => ing.text).join(", ")}`;
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
    data.healthLabels.forEach(label => {
        const healthLabel = document.createElement('div')
        healthLabel.className = "post-label";
        healthLabel.innerText = label;
        labelContainer.append(healthLabel);
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
    postBtn.addEventListener("click", () => {
        postJson(title, data);
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
    console.log(elementId, currentLikes);
    const option = {
        method: "PATCH",
        headers : {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            likes: Number(currentLikes) + 1
        })
    }

    fetch(`http://localhost:3000/posts/${elementId}`, option);
}

function shareRecipe(e) {

}

function commentRecipe(e) {

}