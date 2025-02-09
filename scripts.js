document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript is loaded and working!");

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const closeModal = document.querySelector(".close");
    const galleryImages = document.querySelectorAll(".gallery-pic");

    if (!modal || !modalImage || !downloadBtn || !closeModal || galleryImages.length === 0) {
        console.error("❌ One or more elements are missing! Check HTML.");
        return;
    }

    console.log(`✅ Found ${galleryImages.length} images in the gallery.`);

    // Open modal when an image is clicked
    galleryImages.forEach(image => {
        image.addEventListener("click", function () {
            console.log("✅ Clicked image:", this.src);
            modal.style.display = "flex"; // Show modal
            modalImage.src = this.src; // Set image in modal
            downloadBtn.href = this.src; // Set download link
            downloadBtn.setAttribute("download", this.src.split('/').pop()); // Set filename
        });
    });

    // Close modal when clicking close button
    closeModal.addEventListener("click", function () {
        console.log("✅ Close button clicked.");
        modal.style.display = "none";
    });

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            console.log("✅ Clicked outside modal, closing.");
            modal.style.display = "none";
        }
    });
});
