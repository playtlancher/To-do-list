let isToggle = false;
export function changeTheme(){
    let body = document.body.style;
    let inputs = document.getElementsByTagName("input");
    if (isToggle) {
        body.backgroundColor = "#333";
        body.color = "white"
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            input.style.backgroundColor = "black";
            input.style.color = "white"
            input.style.border = "1px solid darkgrey";
            input.addEventListener("focus",function (){
                input.style.border = "1px solid white";
            });
            input.addEventListener('blur', function() {
                input.style.border = "1px solid darkgrey";
            });
        }
    }else{
        body.backgroundColor = "white";
        body.color = "black"
        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            input.style.backgroundColor = "white";
            input.style.color = "black"
            input.style.border = "1px solid lightgrey";
            input.addEventListener("focus",function (){
                input.style.border = "1px solid black";
            });
            input.addEventListener('blur', function() {
                input.style.border = '1px solid lightgrey"';
            });
        }
    }
    isToggle = !isToggle;
    localStorage.setItem("theme",!isToggle);

}
export function setTheme(status){
    if ("true"===status){
        isToggle = !isToggle;
    }
    changeTheme()
}