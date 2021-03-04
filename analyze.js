document.addEventListener('DOMContentLoaded', () => {
    console.log('LOADED')

    let form = document.querySelector('form');
    let recipeContainer = document.querySelector(".recipe");
    form.addEventListener('submit', (e) => {
        analyzeFood(e, recipeContainer)
    });


});

function analyzeFood(e, container) {
    e.preventDefault();
    console.log(e.target);
    const title = e.target[0].value;
    const ingr = e.target[1].value.split('\n');
    // const img = e.target[2];
    // debugger;
    makeRecipe(title, ingr, container);
    e.target.reset();
}

async function makeRecipe(title, ingr, dom) {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        title: title, 
        ingr: ingr
      }),
      headers: {
        'Content-Type' : 'application/json'
      }
    }

    let data = await fetch(`https://api.edamam.com/api/nutrition-details?app_key=${APIKEYS.edamam}&app_id=d44f3481`, options)
    let json = await data.json();
    
    makePost(json, title, dom);
  }

async function makePost(data, title, dom){
    const postCont = document.createElement("div");
    postCont.className ="post-cont";
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
    ingrs.innerText = `Ingredients: \n${data.ingredients.map(ing => ing.text).join(", ")}`;
    ingrCont.append(ingrs);
    nutrientCont.append(ingrCont);

    const vitimensContainer = document.createElement("div");
    vitimensContainer.className = "post-vitimens-cont";
    const vitimens = document.createElement("p");
    vitimens.className = "post-vitimen";
    //sort by quantity for each nutrient TODO
    let vitimensContent = "Vitimens: \n";
    Object.keys(data.totalNutrients).forEach((vit, ind, arr) => {
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
    postBtn.classList.add("post-btn");
    postBtnCont.append(postBtn);

    socialBox.append(btnCont, postBtnCont);

    post.append(name, infoContainer, labelContainer);
    postCont.append(post, socialBox);
    dom.append(postCont);
}

function addLike(e) {

}

function shareRecipe(e) {

}

function commentRecipe(e) {

}