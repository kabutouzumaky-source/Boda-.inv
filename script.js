document.addEventListener("DOMContentLoaded", function () {

    /* ELEMENTOS */
    const envelopeScreen = document.getElementById("envelope-screen");
    const envelope = document.querySelector(".envelope");
    const openButton = document.getElementById("open-envelope");
    const invitation = document.getElementById("invitation");
    const petalsContainer = document.getElementById("petals-container");
    const music = document.getElementById("wedding-music");
    const musicButton = document.getElementById("music-button");

    /* ABRIR EL SOBRE */
    if (openButton) {
        openButton.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Evita que se abra varias veces
            if (envelope && envelope.classList.contains("open")) return;

            if (envelope) envelope.classList.add("open");

            const openText = document.querySelector(".open-text");
            if (openText) {
                openText.textContent = "Nuestra historia comienza...";
            }

            setTimeout(function () {
                if (envelopeScreen) {
                    envelopeScreen.classList.add("hidden");
                }

                if (invitation) {
                    invitation.classList.remove("hidden");
                }

                startPetals();
                playMusic();
            }, 1600);
        });
    }

    /* MÚSICA */
    function playMusic() {
        if (!music) return;

        music.volume = 0.45;

        music.play().then(function () {
            if (musicButton) musicButton.textContent = "♫";
        }).catch(function () {
            if (musicButton) musicButton.textContent = "♪";
        });
    }

    if (musicButton) {
        musicButton.addEventListener("click", function () {
            if (!music) return;

            if (music.paused) {
                music.play().then(function () {
                    musicButton.textContent = "♫";
                }).catch(function () {
                    musicButton.textContent = "♪";
                });
            } else {
                music.pause();
                musicButton.textContent = "♪";
            }
        });
    }

    /* LLUVIA DE PÉTALOS */
    function createPetal() {
        if (!petalsContainer) return;

        const petal = document.createElement("span");
        petal.className = "petal";

        petal.style.left = Math.random() * 100 + "vw";

        const size = Math.random() * 4 + 3;
        petal.style.width = size + "px";
        petal.style.height = size + "px";

        const duration = Math.random() * 4 + 4;
        petal.style.animationDuration = duration + "s";
        petal.style.opacity = Math.random() * .6 + .3;

        petalsContainer.appendChild(petal);

        setTimeout(function () {
            petal.remove();
        }, (duration + 1) * 1000);
    }

    function startPetals() {
        for (let i = 0; i < 30; i++) {
            setTimeout(createPetal, i * 100);
        }

        setInterval(createPetal, 250);
    }

    /* CRONÓMETRO: 28 DE NOVIEMBRE DE 2026, 5:00 PM */
    const weddingDate = new Date(2026, 10, 28, 17, 0, 0).getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const days = document.getElementById("days");
        const hours = document.getElementById("hours");
        const minutes = document.getElementById("minutes");
        const seconds = document.getElementById("seconds");

        if (!days || !hours || !minutes || !seconds) return;

        if (distance <= 0) {
            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";
            return;
        }

        const dayValue = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hourValue = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minuteValue = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const secondValue = Math.floor(
            (distance % (1000 * 60)) / 1000
        );

        days.textContent = String(dayValue);
        hours.textContent = String(hourValue).padStart(2, "0");
        minutes.textContent = String(minuteValue).padStart(2, "0");
        seconds.textContent = String(secondValue).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);

    /* CONTADOR DE ASISTENCIA DE FAMILIA */
    const guestCount = document.getElementById("guest-count");
    const addGuestButton = document.getElementById("add-guest");
    const attendanceMessage = document.getElementById("attendance-message");

    // Recupera el número guardado en este dispositivo
    let guests = Number(localStorage.getItem("boda-familia-invitados")) || 0;

    function updateGuestCount() {
        if (guestCount) {
            guestCount.textContent = guests;
        }
    }

    updateGuestCount();

    if (addGuestButton) {
        addGuestButton.addEventListener("click", function () {
            guests++;

            // Guarda el nuevo total
            localStorage.setItem("boda-familia-invitados", guests);

            updateGuestCount();

            if (attendanceMessage) {
                attendanceMessage.textContent =
                    "¡Asistencia registrada! ♡";
            }
        });
    }

    /* ANIMACIÓN DE LAS SECCIONES AL DESPLAZARSE */
    const sections = document.querySelectorAll(".section");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, { threshold: 0.15 });

        sections.forEach(function (section) {
            observer.observe(section);
        });
    } else {
        sections.forEach(function (section) {
            section.classList.add("visible");
        });
    }

});