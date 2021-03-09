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
    const img = e.target[2].files[0];
    makeRecipe(title, ingr, container, img);
    e.target.reset();
}

async function makeRecipe(title, ingr, dom, img) {
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
    let data = await fetch(`https://api.edamam.com/api/nutrition-details?app_key=${APIKEYS.edamam}&app_id={}`, options)
    let json = await data.json();
    makePost(json, title, dom, false, "", 'a', ingr, img);
  }

function postJson(title, data, ingr){
  ingr.forEach((i, index) =>{
    ingr[index] = {text: i};
  });

  const imgUrl = document.querySelector(".post-image").src || "https://post.healthline.com/wp-content/uploads/2020/09/kidney-beans-732x549-thumbnail.jpg";
  debugger;
  //JSON mock stuff server
  // const options = {
  //     method: "POST",
  //     headers: {
  //         "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //         title: title,
  //         calories: data.calories,
  //         ingredients: ingr,
  //         totalNutrients: data.totalNutrients,
  //         healthLabels: data.healthLabels,
  //         likes: 0
  //     })
  // }

  // fetch('http://localhost:3000/posts',options);

  //Firebase
  const id = localStorage.getItem("userUID");
  const postRef = dbRef.ref("users/" + id + "/posts").push();
  postRef.set({
    time: new Date(), //doesn't get added?
    title: title,
    calories: data.calories,
    ingredients: ingr,
    totalNutrients: data.totalNutrients,
    healthLabels: data.healthLabels,
    id: postRef.path.pieces_.join("/"),
    img: imgUrl,
    likes: 0
  });
}
