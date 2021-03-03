document.addEventListener('DOMContentLoaded', () => {
    getQuote();
    getLogin();
});
function getQuote() {
    let block = document.querySelector('.zitat1');
    fetch('http://staging.quotable.io/random')
    .then(res => res.json())
    .then(data => {
        block.innerHTML = `
        ${data.content}
        <cite>${data.author}</cite>
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