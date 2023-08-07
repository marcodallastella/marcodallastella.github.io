const scroller = scrollama();

scroller
    .setup({
        step: "#scrolly .scrolly-overlay .step",
        offset: 0.90,
        debug: true
    })
    .onStepEnter(function (response) {
        switch (response.element.id) {
            case "step-zero":
                document.getElementById("first-image").style.visibility = "visible";
                document.getElementById("second-image").style.visibility = "hidden";
                document.getElementById("third-image").style.visibility = "hidden";
                break;
            case "step-one":
                document.getElementById("first-image").style.visibility = "hidden";
                document.getElementById("second-image").style.visibility = "visible";
                document.getElementById("third-image").style.visibility = "hidden";
                break;
            case "step-two":
                document.getElementById("first-image").style.visibility = "hidden";
                document.getElementById("second-image").style.visibility = "hidden";
                document.getElementById("third-image").style.visibility = "visible";
                break;
            case "step-three":
                document.getElementById("first-image").style.visibility = "hidden";
                document.getElementById("second-image").style.visibility = "hidden";
                document.getElementById("third-image").style.visibility = "hidden";
                var video = document.getElementById("background-video");
                video.style.visibility = "visible";
                video.play();
                break;
        }
    })
    .onStepExit(function (response) {
        if (response.element.id === "step-zero") {
            document.getElementById("first-image").style.visibility = "visible";
            document.getElementById("second-image").style.visibility = "hidden";
        }
        if (response.element.id === "step-one") {
            document.getElementById("first-image").style.visibility = "hidden";
            document.getElementById("second-image").style.visibility = "visible";
            document.getElementById("third-image").style.visibility = "hidden";
        }
        if (response.element.id === "step-two") {
            document.getElementById("first-image").style.visibility = "hidden";
            document.getElementById("second-image").style.visibility = "hidden";
            document.getElementById("third-image").style.visibility = "visible";
        }
        if (response.element.id === "end-step") {
            var video = document.getElementById("background-video");
            video.style.visibility = "hidden";
            video.pause();
        
        }

    });

window.addEventListener("resize", scroller.resize);
