//source: https://www.youtube.com/watch?v=ifi6dXOl3g4
//it takes whatever was inputted into the search box, then gets
//every title and sees if what was inputted in the search box appears anywhere 
//in any of the titles. 

const eventSearch = document.getElementById("searchField");

eventSearch.addEventListener("keyup", e => {
    //gets value of search bar and puts it to lowercase
    let currentValue = e.target.value.toLowerCase();
    //gets all the card titles
    let titles = document.querySelectorAll(".card-title");
    titles.forEach(title => {
        if (title.textContent.toLowerCase().includes(currentValue)) {
            //accesses the variable that determines whether a card is visible or not
            title.parentNode.parentNode.style.display = "block";
        } else {
            title.parentNode.parentNode.style.display = "none";
        }
    })
})