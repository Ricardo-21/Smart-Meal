document.addEventListener('DOMContentLoaded', () => {
    let recipeContainer = document.querySelector(".recipe");
    //Firebase
    dbRef.ref("users/").on("child_added", snap => {
        let user = snap.val();
        if(user.posts){
            let posts = Object.keys(user.posts).map(key => user.posts[key]);
            posts.forEach((dish, index) => {
                if(index === 0){
                    makePost(dish, dish.title, recipeContainer, true, dish.id, 'e', '',dish.img)    
                }
                else{
                    makePost(dish, dish.title, recipeContainer, true, dish.id, 'e','', dish.img)
                }
            });
        }

        window.addEventListener('scroll', () => {
            let currentY = window.pageYOffset;

            let posts = document.querySelectorAll('.post-cont');

            posts.forEach((post, index) => {
                var element = post;
                var position = element.getBoundingClientRect();
            
                // checking whether fully visible
                if(position.top >= 0 && position.bottom <= window.innerHeight) {
                    // console.log('Element is fully visible in screen', post);
                    element.firstChild.style.opacity = 1;
                }

            })
            

        })
    });

    //JSON server
    // fetch('http://localhost:3000/posts')
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    //     data.forEach((dish, index) => {
            
    //         if(index === 0){
    //             makePost(dish, dish.title, recipeContainer, true, dish.id, 'e')    
    //         }
    //         else{
    //             makePost(dish, dish.title, recipeContainer, true, dish.id,'e')
    //         }
    //     });
        
    //     window.addEventListener('scroll', () => {
    //         let currentY = window.pageYOffset;

    //         let posts = document.querySelectorAll('.post-cont');

    //         posts.forEach((post, index) => {
    //             var element = post;
    //             var position = element.getBoundingClientRect();
            
    //             // checking whether fully visible
    //             if(position.top >= 0 && position.bottom <= window.innerHeight) {
    //                 // console.log('Element is fully visible in screen', post);
    //                 element.firstChild.style.opacity = 1;
    //             }

    //         })
            

    //     })
    // })

})
