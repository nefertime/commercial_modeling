document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ JavaScript is loaded and working!");

    const modal = document.getElementById("imageModal");
    const modalImage = document.getElementById("modalImage");
    const downloadBtn = document.getElementById("downloadBtn");
    const closeModal = document.querySelector(".close");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const galleryImages = document.querySelectorAll(".gallery-pic");
    const profilePic = document.querySelector(".profile-pic"); // Get the main profile picture

    let currentIndex = 0; // Tracks the current image index
    let isProfilePic = false; // Tracks if the main profile pic is opened

    if (!modal || !modalImage || !downloadBtn || !closeModal || galleryImages.length === 0) {
        console.error("❌ One or more elements are missing! Check HTML.");
        return;
    }

    console.log(`✅ Found ${galleryImages.length} images in the gallery.`);

    // Open modal and set the clicked image
    function openModal(index, isProfile = false) {
        isProfilePic = isProfile;
        if (!isProfile) {
            currentIndex = index;
            modalImage.src = galleryImages[currentIndex].src;
        } else {
            modalImage.src = profilePic.src; // Set the main profile image
        }
        modal.style.display = "flex";
        downloadBtn.href = modalImage.src;
        downloadBtn.setAttribute("download", modalImage.src.split('/').pop());

        // Hide navigation arrows if profile picture is opened
        prevBtn.style.display = isProfile ? "none" : "block";
        nextBtn.style.display = isProfile ? "none" : "block";
    }

    // Close modal function
    function closeModalFunction() {
        modal.style.display = "none";
    }

    // Show the previous image
    function showPrevImage() {
        if (isProfilePic) return; // Do nothing if profile pic is displayed
        currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
        openModal(currentIndex);
    }

    // Show the next image
    function showNextImage() {
        if (isProfilePic) return; // Do nothing if profile pic is displayed
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
        if (event.target === modal) {
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
});
