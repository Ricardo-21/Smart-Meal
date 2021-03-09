document.addEventListener("DOMContentLoaded", () => {
    hangleLogin(localStorage.getItem("userUID"));
})

function hangleLogin(id){
    const cont = document.querySelector(".login-co");
    if(id !== "3ZGGnC3WGkRiSjPvLXhLBRadf3m1"){
        cont.innerHTML = `
            <a href="profile.html">Profile</a>
            <a href="#" class="logout">Logout</a>
        `;
        const logoutBtn = document.querySelector(".logout");
        logoutBtn.addEventListener("click", () => {
            logout()
            .then(() => {
                // window.location.reload();
                // document.querySelector('nav').querySelector('a').click()
                window.location.replace('index.html');
            });
        });
    }
}