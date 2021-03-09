document.addEventListener('DOMContentLoaded', () => {
    getQuote();

    window.addEventListener('scroll', () => {
        let currentY = window.pageYOffset;
        
        if(currentY >= 420){
            document.getElementById('about').style.opacity = 1;
        }

        if(currentY >= 1050){
            document.getElementById('quote-div').style.opacity = 1;
        }
    })

});
function getQuote() {
    let block = document.querySelector('.zitat1');
    fetch('https://api.adviceslip.com/advice')
    .then(res => res.json())
    .then(data => {
        block.innerHTML = `
        ${data.slip.advice}
        <cite>Anonymous</cite>
        `
    });
}

function getLogin(){
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(data =>{
        data.forEach(user => {
            if(user.isLoggedIn){
                console.log(user);
            }
        })
    })
}