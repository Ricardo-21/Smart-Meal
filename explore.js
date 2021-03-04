document.addEventListener('DOMContentLoaded', () => {
    let recipeContainer = document.querySelector(".recipe");

    fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(data => {
        data.forEach(dish => makePost(dish, dish.title, recipeContainer));
    })
})


function makePost(data, title, dom){
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
    calCount.innerText = `Calories: ${data.Calories}`;
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
    })
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

    post.append(name, infoContainer, labelContainer);
    postCont.append(post);
    dom.append(postCont);
}