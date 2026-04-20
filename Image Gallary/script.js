document.addEventListener("DOMContentLoaded", function () {

    // select all elements
    let items = document.querySelectorAll(".gallery-item");
    let buttons = document.querySelectorAll(".filter-btn");

    let lightbox = document.querySelector(".lightbox");
    let lightboxImg = document.querySelector(".lightbox-img");
    let lightboxCaption = document.querySelector(".lightbox-caption");

    let currentIndex = 0;

    //  CLICK IMAGE → OPEN LIGHTBOX
    for (let i = 0; i < items.length; i++) {

        items[i].onclick = function () {

            let img = items[i].querySelector("img");

            lightbox.style.display = "flex";
            lightboxImg.src = img.src;
            lightboxCaption.innerText = items[i].getAttribute("data-caption");

            currentIndex = i;
        };
    }

    //  FILTER BUTTONS
    for (let i = 0; i < buttons.length; i++) {

        buttons[i].onclick = function () {

            // remove active class
            for (let j = 0; j < buttons.length; j++) {
                buttons[j].classList.remove("active");
            }

            this.classList.add("active");

            let category = this.getAttribute("data-filter");

            // show/hide images
            for (let k = 0; k < items.length; k++) {

                let itemCategory = items[k].getAttribute("data-category");

                if (category === "all" || category === itemCategory) {
                    items[k].style.display = "block";
                } else {
                    items[k].style.display = "none";
                }
            }
        };
    }

    //  CLOSE LIGHTBOX
    document.querySelector(".lightbox-close").onclick = function () {
        lightbox.style.display = "none";
    };

    //  NEXT IMAGE
    document.querySelector(".lightbox-next").onclick = function () {

        currentIndex++;

        if (currentIndex >= items.length) {
            currentIndex = 0;
        }

        updateImage();
    };

    //  PREVIOUS IMAGE
    document.querySelector(".lightbox-prev").onclick = function () {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = items.length - 1;
        }

        updateImage();
    };

    //  FUNCTION TO UPDATE IMAGE
    function updateImage() {
        let img = items[currentIndex].querySelector("img");

        lightboxImg.src = img.src;
        lightboxCaption.innerText = items[currentIndex].getAttribute("data-caption");
    }

});