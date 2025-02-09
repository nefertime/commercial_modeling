document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript is loaded and working!");

    const galleryImages = document.querySelectorAll(".gallery-pic");

    if (galleryImages.length === 0) {
        console.error("❌ No images found! Check HTML.");
        return;
    }

    galleryImages.forEach(image => {
        image.addEventListener("click", function () {
            console.log("✅ Clicked image:", this.src);
        });
    });
});
