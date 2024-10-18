function run() {
    const ad = document.querySelector("#ad");
    const frames = [...ad.querySelectorAll(".frame")];

    const canvas = document.getElementById("js-confetti-canvas");
    const jsConfetti = new JSConfetti({ canvas });

    let video = null;

    let animationIndex = 0;
    const frameDelay = 2000;
    const lastFrame = frames.length - 1;

    const clickthroughs = document.querySelectorAll(".clickthrough");
    clickthroughs.forEach(element => element.addEventListener("click", showLastFrame));

    const replay = document.querySelector("#replay");
    replay.addEventListener("click", start);

    const action = document.querySelector("#action");
    action.addEventListener("click", showConfetti);

    function showConfetti() {
        jsConfetti.addConfetti();
    }

    function showNextFrame(delay = frameDelay) {
        animationIndex++;
        if (frames[animationIndex] !== undefined) {
            setTimeout(
                () => frames[animationIndex].classList.add("show"),
                delay
            );
        }
    }

    function showLastFrame() {
        if (video !== null) {
            cleanupVideo();
        }

        animationIndex = lastFrame;
        frames[animationIndex]?.classList.add("show");
    }

    function handleVideoComplete() {
        showNextFrame(0);
    }

    function initializeVideo(frame) {
        video = frame.querySelector("video");
        video.addEventListener("ended", handleVideoComplete);
        video.play();
    }

    function cleanupVideo() {
        video.removeEventListener("ended", handleVideoComplete);
        video.pause();
        video = null;
    }

    frames.forEach((frame) => {
        frame.classList.remove("show");
        const items = [...frame.querySelectorAll(".item")];
        let numAnimations = 0;

        if (frame.classList.contains("animated")) {
            numAnimations++;
        }

        items.forEach((item) => {
            if (item.classList.contains("animated")) {
                numAnimations++;
            }
        });

        function handleAnimationEnd(e) {
            numAnimations--;

            if (e.target.classList.contains("video")) {
                initializeVideo(e.target);
            }

            if (numAnimations === 0) {
                frame.removeEventListener("animationend", handleAnimationEnd);
                showNextFrame();
                return;
            }
        }

        frame.addEventListener("animationend", handleAnimationEnd);

        if (numAnimations === 0 && !frame.classList.contains("video")) {
            showNextFrame();
            return;
        }
    });

    frames[animationIndex].classList.add("show");
}

function start() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const newAd = ad.cloneNode(true);
                document.body.replaceChildren();
                document.body.append(newAd);
                run();
            }
        });
    });

    observer.observe(document.querySelector("#ad"));
}

function setSize() {
    const urlParams = new URLSearchParams(window.location.search);
    const w = urlParams.get("w")?.toLowerCase();
    const h = urlParams.get("h")?.toLowerCase();
    if (w & h) {
        document.documentElement.style.setProperty("--adWidth", `${w}px`);
        document.documentElement.style.setProperty("--adHeight", `${h}px`);
    }
}

setSize();
start();
