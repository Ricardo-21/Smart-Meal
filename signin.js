document.addEventListener('DOMContentLoaded', ()=> {

    let form = document.getElementById('signin-form');
    eventListener(form, signin);

});

function switchForm (e){
    const container = document.querySelector('#signin')
    console.log(e)
    if(e === 'signUp'){
        container.innerHTML = `
        
        <div id = "title">
            <h1>Sign Up</h1>
        </div>
        <div id = 'form'>
            <form id = 'signUp-form'>
                
                <h3>Username:</h3><input type = 'text' placeholder="username" required>
                <h3>Password:</h3><input type = 'text' placeholder="password" required>
                <button>Sign Up</button>
            </form>
        </div>
        <div>
            <span style = 'cursor: pointer' onclick = "switchForm('login')">Login</span>
        </div>

        `

        let form = document.getElementById('signUp-form');
        eventListener(form, signUp);
    }

    else {
        container.innerHTML = `
        
        <div id = "title">
            <h1>Log in</h1>
        </div>
        <div id = 'form'>
            <form id = 'signin-form'>
                
                <h3>Username:</h3><input type = 'text' placeholder="username" required>
                <h3>Password:</h3><input type = 'text' placeholder="password" required>
                <button>Login</button>
            </form>
        </div>
        <div>
            <span style = 'cursor: pointer' onclick = "switchForm('signUp')">Sign Up</span>
        </div>
        
        `

        let form = document.getElementById('signin-form');
        eventListener(form, signin);
    }
}

function eventListener (form, f) {
    console.log(form);
    form.addEventListener('submit', f);
}

function signin(e) {
    e.preventDefault();
    console.log('Sign in func');

    e.target.reset()
}

function signUp(e) {
    e.preventDefault();
    console.log('Sign Up func');

    e.target.reset()
}