document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Loading References...");

    // Fetch references.html and inject it into the page
    fetch("references.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("references-container").innerHTML = data;

            // Select collapsibles and remove old event listeners before re-adding
            const collapsibles = document.querySelectorAll(".collapsible");

            collapsibles.forEach((collapsible) => {
                collapsible.removeEventListener("click", toggleCollapsible); // Prevent duplicate listeners
                collapsible.addEventListener("click", toggleCollapsible);
            });

            console.log("✅ References Loaded Successfully.");
        })
        .catch(error => console.error("❌ Error loading references:", error));
});

// Collapsible toggle function
function toggleCollapsible() {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.maxHeight) {
        content.style.maxHeight = null; // Collapse section
    } else {
        content.style.maxHeight = content.scrollHeight + "px"; // Expand section
    }
}
