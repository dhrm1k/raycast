function sendKey(key) {
    console.log("Key Pressed:", key);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: key }));
}

function releaseKey(key) {
    document.dispatchEvent(new KeyboardEvent("keyup", { key: key }));
}

// Ensure both touch and mouse events work
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".arrow-button").forEach(button => {
        button.addEventListener("touchstart", (e) => {
            e.preventDefault(); // Prevent accidental scrolling
            sendKey(button.dataset.key);
        });

        button.addEventListener("touchend", (e) => {
            e.preventDefault();
            releaseKey(button.dataset.key);
        });

        button.addEventListener("mousedown", () => sendKey(button.dataset.key));
        button.addEventListener("mouseup", () => releaseKey(button.dataset.key));
    });
});
