document.addEventListener('DOMContentLoaded', () => {
    getQuote();
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