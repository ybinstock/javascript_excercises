var current = -1;
var colors = ["red", "blue", "yellow", "green", "orange", "black", "cyan", "magenta"]
function changeColor() {

    if(current > colors.length-1){
        current = 0;
    } else {
        current++;
    }

    var col = document.getElementById("changecolor");
    col.style.backgroundColor = colors[current];
}