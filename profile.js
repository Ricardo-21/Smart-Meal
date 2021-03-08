document.addEventListener("DOMContentLoaded", () => {
    let userName = document.querySelector("#username");
    let bio = document.querySelector("h4");
    let posts = document.querySelector("#post-cont");
    console.log("dom");
    addInfo(userName, bio, posts);
});

function addInfo(userName, bio, posts){
    dbRef.ref("users/" + localStorage.getItem("userUID")).on("value", snap => {
        posts.innerHTML = "";
        let data = snap.val();
        userName.innerHTML = `
            <h3>${data.userName}</h3>
        `;
        bio.innerHTML = `
            ${data.bio || "A new user"}
        `;
        if(data.posts) {
            Object.keys(data.posts).forEach(post => {
                dbRef.ref(`users/${localStorage.getItem("userUID")}/posts/${post}`).on("value", snap => {
                    const data = snap.val();
                    console.log(data);
                    makePost(data, data.title, posts, true, data.id, "e", "", data.img);
                });
            })
        }
    })
}