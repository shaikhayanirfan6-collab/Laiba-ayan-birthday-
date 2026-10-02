document.addEventListener("DOMContentLoaded", function(){

    /* =========================
       SCENES
    ========================= */

    const scenes = [
        document.getElementById("scene1"),
        document.getElementById("scene2"),
        document.getElementById("scene3"),
        document.getElementById("scene4")
    ];

    const dots = document.querySelectorAll(".dot");

    let current = 0;


    function showScene(index){

        if(index < 0){
            index = 0;
        }

        if(index >= scenes.length){
            index = scenes.length - 1;
        }

        scenes[current].classList.remove("active");

        current = index;

        scenes[current].classList.add("active");

        dots.forEach(function(dot,i){
            dot.classList.toggle(
                "active",
                i === current
            );
        });

        if(current === 3){
            createParticles(15);
        }
    }


    /* NEXT BUTTONS */

    document.querySelectorAll(".next").forEach(function(button){

        button.addEventListener("click",function(){

            showScene(current + 1);

        });

    });


    /* =========================
       SECRET MESSAGE
    ========================= */

    const secretBtn =
        document.getElementById("secretBtn");

    const secretMessage =
        document.getElementById("secretMessage");

    const continueBtn =
        document.getElementById("continueBtn");


    secretBtn.addEventListener("click",function(){

        secretMessage.style.display = "block";

        secretBtn.innerHTML =
            "Message opened ♡";

        createParticles(10);

        setTimeout(function(){

            continueBtn.style.display =
                "inline-flex";

        },500);

    });


    /* =========================
       COUNTDOWN
    ========================= */

    function updateCountdown(){

        const now = new Date();

        let year = now.getFullYear();

        let target = new Date(
            year,
            9,
            31,
            0,
            0,
            0
        );

        if(now > target){

            target = new Date(
                year + 1,
                9,
                31,
                0,
                0,
                0
            );

        }

        const difference =
            target - now;


        if(difference <= 0){

            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";

            return;
        }


        const days = Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (
                difference /
                (1000 * 60 * 60)
            ) % 24
        );

        const minutes = Math.floor(
            (
                difference /
                (1000 * 60)
            ) % 60
        );

        const seconds = Math.floor(
            (
                difference /
                1000
            ) % 60
        );


        document.getElementById("days").innerText =
            String(days).padStart(2,"0");

        document.getElementById("hours").innerText =
            String(hours).padStart(2,"0");

        document.getElementById("minutes").innerText =
            String(minutes).padStart(2,"0");

        document.getElementById("seconds").innerText =
            String(seconds).padStart(2,"0");

    }


    updateCountdown();

    setInterval(
        updateCountdown,
        1000
    );


    /* =========================
       FLOATING PARTICLES
    ========================= */

    function createParticle(){

        const particle =
            document.createElement("div");

        particle.className = "float";


        const symbols = [
            "♡",
            "♥",
            "✦",
            "✧",
            "⋆"
        ];


        particle.innerHTML =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            Math.random() * 100 + "vw";


        particle.style.fontSize =
            (12 + Math.random() * 20) + "px";


        particle.style.animationDuration =
            (3 + Math.random() * 3) + "s";


        document.body.appendChild(particle);


        setTimeout(function(){

            particle.remove();

        },6000);

    }


    function createParticles(amount){

        for(
            let i = 0;
            i < amount;
            i++
        ){

            setTimeout(
                createParticle,
                i * 90
            );

        }

    }


    /* =========================
       FINAL BUTTON
    ========================= */

    document
        .getElementById("celebrate")
        .addEventListener("click",function(){

            createParticles(45);

            this.innerHTML =
                "✨ Happy Birthday Jan ✨";

        });


    /* =========================
       STARS
    ========================= */

    const stars =
        document.getElementById("stars");


    for(
        let i = 0;
        i < 100;
        i++
    ){

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "%";

        star.style.top =
            Math.random() * 100 + "%";

        star.style.animationDelay =
            Math.random() * 3 + "s";

        stars.appendChild(star);

    }


    /* =========================
       MOBILE SWIPE
    ========================= */

    let startX = 0;
    let startY = 0;


    document.addEventListener(
        "touchstart",
        function(e){

            startX =
                e.changedTouches[0].screenX;

            startY =
                e.changedTouches[0].screenY;

        },
        {passive:true}
    );


    document.addEventListener(
        "touchend",
        function(e){

            const endX =
                e.changedTouches[0].screenX;

            const endY =
                e.changedTouches[0].screenY;

            const diffX =
                endX - startX;

            const diffY =
                endY - startY;


            if(
                Math.abs(diffX) > 70 &&
                Math.abs(diffX) >
                Math.abs(diffY)
            ){

                if(diffX < 0){

                    showScene(
                        current + 1
                    );

                }else{

                    showScene(
                        current - 1
                    );

                }

            }

        },
        {passive:true}
    );


    /* =========================
       KEYBOARD
    ========================= */

    document.addEventListener(
        "keydown",
        function(e){

            if(e.key === "ArrowRight"){

                showScene(
                    current + 1
                );

            }

            if(e.key === "ArrowLeft"){

                showScene(
                    current - 1
                );

            }

        }
    );

});
