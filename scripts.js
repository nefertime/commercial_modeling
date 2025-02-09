document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded!"); // Debugging check

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const closeModal = document.querySelector(".close");
    const galleryImages = document.querySelectorAll(".gallery-pic");

    // Check if elements exist
    if (!modal || !modalImage || !downloadBtn || !closeModal || galleryImages.length === 0) {
        console.error("One or more elements not found. Check HTML structure!");
        return;
    }

    // Open modal when an image is clicked
    galleryImages.forEach(image => {
        image.addEventListener("click", function () {
            console.log("Image clicked:", this.src);
            modal.style.display = "flex";
            modalImage.src = this.src;
            downloadBtn.href = this.src;
            downloadBtn.setAttribute("download", this.src.split('/').pop()); // Set filename
        });
    });

    // Close modal when clicking close button
    closeModal.addEventListener("click", function () {
        console.log("Close button clicked.");
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            console.log("Modal background clicked.");
            modal.style.display = "none";
        }
    });
});
