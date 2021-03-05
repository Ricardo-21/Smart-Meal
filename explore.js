document.addEventListener('DOMContentLoaded', () => {
    let recipeContainer = document.querySelector(".recipe");

    fetch('http://localhost:3000/posts')
    .then(res => res.json())
    .then(data => {
        data.forEach((dish, index) => {
            if(index === 0){
                makePost(dish, dish.title, recipeContainer, true, 'firstPost','e')    
            }
            else{
                makePost(dish, dish.title, recipeContainer, true, dish.id,'e')
            }
        });
        
        window.addEventListener('scroll', () => {
            let currentY = window.pageYOffset;

            let posts = document.querySelectorAll('.post-cont');

            posts.forEach((post, index) => {
                var element = post;
                var position = element.getBoundingClientRect();
            
                // checking whether fully visible
                if(position.top >= 0 && position.bottom <= window.innerHeight) {
                    console.log('Element is fully visible in screen', post);
                    element.firstChild.style.opacity = 1;
                }

            })
            

        })
    })

})
