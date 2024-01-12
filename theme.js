let isToggle = false;
let root = document.documentElement;

export function changeTheme() {
    localStorage.setItem("theme", isToggle);
    if (isToggle) {
        setRootStyle("--input-color", "black")
        setRootStyle('--border-color', 'darkgray');
        setRootStyle('--text-color', 'white');
        setRootStyle("--background-color", "#333")
    } else {
        setRootStyle("--input-color", "white")
        setRootStyle('--border-color', 'lightgray');
        setRootStyle('--text-color', 'black');
        setRootStyle("--background-color", "white")

    }
    isToggle = !isToggle;
}

export function setTheme(status) {
    if (status === "true") {
        isToggle = true;
        changeTheme()
    }
}
function setRootStyle(style,value){
    root.style.setProperty(style,value)

}