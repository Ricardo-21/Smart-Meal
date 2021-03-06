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
                
                <h3>E-mail:</h3><input type = 'text' placeholder="E-mail" required>
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
                
                <h3>E-mail:</h3><input type = 'text' placeholder="E-mail" required>
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
    if(localStorage.getItem("userUID") === "undefined" || !localStorage.getItem("userUID")){
        const email = e.target[0].value;
        const password = e.target[1].value;

        auth.signInWithEmailAndPassword(email, password)
        .then(cred => {
            console.log(cred);
            localStorage.setItem("userUID", cred.user.uid);
        })
    }
    e.target.reset()
}

function signUp(e) {
    e.preventDefault();
    console.log('Sign Up func');
    console.log(e.target)
    auth.createUserWithEmailAndPassword(e.target[0].value, e.target[1].value)
    .then(cred => {
        console.log(cred);
        localStorage.setItem("userUID",cred.user.UID);
        makeUser(cred.user.uid, cred.user.email);
    })

    e.target.reset()
}

function makeUser(id, email, userName="Genisis"){
    dbRef.ref("users/" + id).set({
        userName,
        email,
        id
    })
}

function logout(e){
    //remove if not a form to log out
    // e.preventDefault();

    auth.signOut().then(() => {
        console.log("user signed out");
        localStorage.removeItem("userUID");
    })

}