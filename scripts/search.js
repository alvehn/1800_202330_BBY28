const eventSearch = document.getElementById("searchField");

eventSearch.addEventListener("keyup", e => {
    let currentValue = e.target.value.toLowerCase();
    let titles = document.querySelectorAll(".card-title");
    console.log(currentValue);
    console.log(titles);
    titles.forEach(title => {
        if (title.textContent.toLowerCase().includes(currentValue)) {
            title.parentNode.parentNode.style.display = "block";
        } else {
            title.parentNode.parentNode.style.display = "none";
        }
    })
})