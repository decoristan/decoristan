

    // Load video sources dynamically
    document.querySelectorAll(".reel").forEach(reel => {
        const videoEl = reel.querySelector("video");
        videoEl.src = reel.dataset.video;
        videoEl.muted = false;
    });

    // Click to pause/play
    document.querySelectorAll("video").forEach(video => {
        video.addEventListener("click", () => {
            video.paused ? video.play() : video.pause();
        });
    });

    // Auto play/pause on scroll
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.play();
            } else {
                entry.target.pause();
            }
        });
    }, { threshold: 0.6 });

    document.querySelectorAll("video").forEach(video => observer.observe(video));

    // Share functionality
    function shareVideo(url) {
        if (navigator.share) {
            navigator.share({ title: "Check this out", url });
        } else {
            prompt("Copy this link:", url);
        }
    }
