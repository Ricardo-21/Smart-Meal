document.addEventListener('DOMContentLoaded', () => {
    console.log('LOADED')
    let form = document.querySelector('form');

    form.addEventListener('submit', analyzeFood);
});

function analyzeFood(e) {
    e.preventDefault();

   console.log(e.target) 
}