Array.from(document.querySelectorAll(".navigation-button")).forEach((item) => {
    item.onclick = () => {
        item.parentElement.parentElement.classList.toggle("change");
    };
});

const panels = document.querySelectorAll(".panel");

panels.forEach((panel) => {
    panel.addEventListener("click", () => {
        removeClass();
        panel.classList.add("active");
    });
});

function removeClass() {
    panels.forEach((panel) => {
        panel.classList.remove("active");
    });
}
