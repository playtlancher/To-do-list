let isToggle = false;

export function changeTheme() {
    if (isToggle) {
        let root = document.documentElement;
        root.style.setProperty("--input-color", "black")
        root.style.setProperty('--border-color', 'darkgray');
        root.style.setProperty('--text-color', 'white');
        root.style.setProperty("--background-color", "#333")
    } else {
        let root = document.documentElement;
        root.style.setProperty("--input-color", "white")
        root.style.setProperty('--border-color', 'lightgray');
        root.style.setProperty('--text-color', 'black');
        root.style.setProperty("--background-color", "white")

    }
    isToggle = !isToggle;
    localStorage.setItem("theme", !isToggle);
}

export function setTheme(status) {
    if ("true" === status) {
        isToggle = !isToggle;
    }
    changeTheme()
}