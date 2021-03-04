document.addEventListener('DOMContentLoaded', () => {
    let recipeContainer = document.querySelector(".recipe");

    fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(data => {
        data.forEach(dish => makePost(dish, dish.title, recipeContainer, true));
    })
})
