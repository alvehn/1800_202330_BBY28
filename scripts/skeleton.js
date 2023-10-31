//default navbar
function loadSkeleton(){
    //console.log($('#navbarPlaceholder').load(''));
}
//loadSkeleton();  //invoke the function

//login stuff
function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {                   //if the pointer to "user" object is not null, then someone is logged in
            // User is signed in.
            // Do something for the user here.
            console.log($('#navbarPlaceholder').load('./index.html'));
            console.log("successful login");
        } else {
            // No user is signed in.
            console.log($('#navbarPlaceholder').load('./login.html'));
        }
    });
}
//loadSkeleton(); //invoke the function