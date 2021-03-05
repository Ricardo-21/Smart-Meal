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
    
    makePost(json, title, dom, false, "", 'a', ingr);
  }

function postJson(title, data, ingr){
  ingr.forEach((i, index) =>{
    ingr[index] = {text: i};
  });
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: title,
            calories: data.calories,
            ingredients: ingr,
            totalNutrients: data.totalNutrients,
            healthLabels: data.healthLabels,
            likes: 0
        })
    }

    fetch('http://localhost:3000/posts',options)
}
