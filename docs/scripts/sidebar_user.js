//start value for the content on load
var previousContent;
previousContent = 'account-overview-content';



document.querySelectorAll(".content-link").forEach(function (link) {
    link.addEventListener("click", function (event) {
        event.preventDefault();
       
        // Remove highlighted link
        document.querySelectorAll(".settings-menu li").forEach(function (li) {
            console.log("looping");
            li.classList.remove("border-bubble-gum-300");
            li.classList.add("border-transparent");
        });

       // Add highlight class to the clicked list item
        this.closest("li").classList.remove("border-transparent");
        this.closest("li").classList.add("border-bubble-gum-300");

        //updating content based on clicked list item
        var content = this.getAttribute("data-content");
        var href = this.getAttribute("href");
        
        updateProfileHeading(content);
        loadContent(href);
    });
});


function updateProfileHeading(text) {
    // Update the text inside the <h2> dynamically
    document.querySelector(".profile-heading").innerText = text;
}

function loadContent(content) {
    // Extract content ID from href
    var contentId = content.substring(1); // Remove the '#' from the href
    console.log(contentId);

    // Hide the previous content and show the new content
    document.getElementById(contentId).classList.remove('hidden');
    if (previousContent) {
        document.getElementById(previousContent).classList.add('hidden');
    }

    // Update the previousContent variable
    previousContent = contentId;
}

const closeFilterButton = document.getElementById('closeFilter');
const filterElement = document.getElementById('sidebar');
const openFilter = document.getElementById('openSidebar');

openFilter.addEventListener('click', () => {
    // filterElement.classList.remove('hidden', 'w-72');
    filterElement.classList.toggle('hidden');
    // filterElement.style.transform = 'translateX(0%)'; 
});
closeFilterButton.addEventListener('click', () => {
    // filterElement.style.transform = 'translateX(-100%)'; // Shift to the left to hide 80% of the width
    filterElement.classList.add('hidden');
});