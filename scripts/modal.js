document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ Modal Script Loaded.");

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const closeModal = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const galleryImages = document.querySelectorAll(".gallery-pic");
    const profilePic = document.querySelector(".profile-pic");

    let currentIndex = 0;
    let isProfilePic = false;

    // Generate a custom filename based on image index
    function getCustomFileName(index, isProfile) {
        return isProfile ? "Alfred_Profile.jpg" : `Alfred${index + 1}.jpg`;
    }

    // Open modal and set the clicked image
    function openModal(index, isProfile = false) {
        isProfilePic = isProfile;
        currentIndex = index;
        modalImage.src = isProfile ? profilePic.src : galleryImages[currentIndex].src;
        modal.style.display = "flex";

        const fileName = getCustomFileName(currentIndex, isProfile);
        downloadBtn.href = modalImage.src;
        downloadBtn.setAttribute("download", fileName);

        prevBtn.style.display = isProfile ? "none" : "block";
        nextBtn.style.display = isProfile ? "none" : "block";
    }

    function closeModalFunction() {
        modal.style.display = "none";
    }

    function showPrevImage() {
        if (isProfilePic) return;
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openModal(currentIndex);
    }

    function showNextImage() {
        if (isProfilePic) return;
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openModal(currentIndex);
    }

    // Click event listeners for each gallery image
    galleryImages.forEach((image, index) => {
        image.addEventListener("click", () => openModal(index));
    });

    // Click event for the main profile picture
    profilePic.addEventListener("click", () => openModal(0, true));

    // Close modal when clicking close button
    closeModal.addEventListener("click", closeModalFunction);

    // Close modal when clicking outside the image
    modal.addEventListener("click", (event) => {
        if (event.target === modal) closeModalFunction();
    });

    // Add event listeners for next and previous buttons
    prevBtn.addEventListener("click", showPrevImage);
    nextBtn.addEventListener("click", showNextImage);

    // Add keyboard navigation (left/right arrows)
    document.addEventListener("keydown", function (event) {
        if (modal.style.display === "flex") {
            if (event.key === "ArrowLeft") {
                showPrevImage();
            } else if (event.key === "ArrowRight") {
                showNextImage();
            } else if (event.key === "Escape") {
                closeModalFunction();
            }
        }
    });
});
