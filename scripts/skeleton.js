function loadSkeleton() {

    firebase.auth().onAuthStateChanged(function (user) {
        //if the pointer to "user" object is not null, then someone is logged in
        if (user) {                   
            // shows navbar only signed in users can see
            $('#navbarPlaceholder').load('nav_after_login.html');
        } 
    });
}
loadSkeleton(); //invoke the function