window.onload = () => {
    setTimeout(() => {
        document.querySelector("body").classList.add("display");
    }, 3000);
};
// Seleziona l'elemento h5
const h5 = document.querySelector("h5");
const phrases = ["Web Design", "UX/UI", "Web Development"];
let currentIndex = 0;

// Aggiunge un listener per l'evento 'animationiteration'

h5.addEventListener("animationiteration", () => {
    // Aggiunge e toglie la classe 'hovered'

    setTimeout(() => {
        h5.textContent = phrases[currentIndex];
        if (h5.classList.length > 0) {
            h5.classList.remove("hovered");
            currentIndex = (currentIndex + 1) % phrases.length;
            return;
        }
        if (h5.classList.length === 0) {
            h5.classList.add("hovered");
            return;
        }
    }, 3500);
});

const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");

btn.addEventListener("click", () => {
    search.classList.toggle("active");
    input.focus();
});

const boxes = document.querySelectorAll(".card");

window.addEventListener("scroll", checkBoxes);
window.addEventListener("resize", checkBoxes); // Recalculate on resize
checkBoxes();

function checkBoxes() {
    const trigger = window.innerHeight * 0.6; // 60% of viewport height

    boxes.forEach((box) => {
        const boxTop = box.getBoundingClientRect().top;
        if (boxTop < trigger) {
            box.classList.add("show");
        } else {
            box.classList.remove("show");
        }
    });
}
