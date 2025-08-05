document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript is loaded and working!");

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const closeModal = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const galleryImages = document.querySelectorAll(".gallery-pic");
    const profilePic = document.querySelector(".profile-pic");
    const collapsibles = document.querySelectorAll(".collapsible");

    // Bio overlay elements
    const bioOverlay = document.getElementById("bioOverlay");
    const infoButton = document.getElementById("infoButton");

    let currentIndex = 0;
    let isProfilePic = false;

    if (!modal || !modalImage || !downloadBtn || !closeModal || galleryImages.length === 0) {
        console.error("❌ One or more elements are missing! Check HTML.");
        return;
    }

    console.log(`✅ Found ${galleryImages.length} images in the gallery.`);

    // Check if the user is on mobile (optional safety check)
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Toggle bio overlay when clicking info button (mobile only)
    if (infoButton) {
        infoButton.addEventListener("click", function () {
            if (bioOverlay.style.display === "flex") {
                bioOverlay.style.display = "none";
            } else {
                bioOverlay.style.display = "flex";
            }
        });
    }

    // Close bio overlay when clicking outside of it
    if (bioOverlay) {
        bioOverlay.addEventListener("click", function (event) {
            if (event.target === bioOverlay) {
                bioOverlay.style.display = "none";
            }
        });
    }

    // Generate a custom filename based on image index
    function getCustomFileName(index, isProfile) {
        return isProfile ? "Alfred_Profile.jpg" : `Alfred${index + 1}.jpg`;
    }

    // Open modal and set the clicked image
    function openModal(index, isProfile = false) {
        isProfilePic = isProfile;
        if (!isProfile) {
            currentIndex = index;
            modalImage.src = galleryImages[currentIndex].src;
        } else {
            modalImage.src = profilePic.src;
        }

        modal.style.display = "flex";
        const fileName = getCustomFileName(currentIndex, isProfile);
        downloadBtn.href = modalImage.src;
        downloadBtn.setAttribute("download", fileName);

        prevBtn.style.display = isProfile ? "none" : "block";
        nextBtn.style.display = isProfile ? "none" : "block";
    }

    // Close modal function
    function closeModalFunction() {
        modal.style.display = "none";
    }

    // Show the previous image
    function showPrevImage() {
        if (isProfilePic) return;
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openModal(currentIndex);
    }

    // Show the next image
    function showNextImage() {
        if (isProfilePic) return;
        currentIndex = (currentIndex + 1) % galleryImages.length;
        openModal(currentIndex);
    }

    // Click event listeners for each gallery image
    galleryImages.forEach((image, index) => {
        image.addEventListener("click", function () {
            openModal(index);
        });
    });

    // Click event for the main profile picture
    profilePic.addEventListener("click", function () {
        openModal(0, true);
    });

    // Close modal when clicking close button
    closeModal.addEventListener("click", closeModalFunction);

    // Close modal when clicking outside the image
    modal.addEventListener("click", function (event) {
        if (event.target === modal || event.target.classList.contains("modal-content")) {
            closeModalFunction();
        }
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

    // Expand/Collapse References Section
    collapsibles.forEach((collapsible) => {
        collapsible.addEventListener("click", function () {
            this.classList.toggle("active");
            let content = this.nextElementSibling;
            content.classList.toggle("expanded");
        });
    });

    console.log("✅ Collapsible reference sections initialized.");
});