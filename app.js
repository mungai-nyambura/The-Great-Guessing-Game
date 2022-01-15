const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");
const colorDisplayElement = document.getElementById("color-display");

const levels = Array.from(document.getElementsByClassName("mode"));
const squares = Array.from(document.getElementsByClassName("square"));

let gamelevel = levels.find((level) => {
    const classList = Array.from(level.classList);    
    return classList.includes("selected");
}).innerHTML;

levels.forEach(level => {

    level.addEventListener("click", function(){
        levels.forEach(mode => mode.classList.remove("selected"));
        this.classList.add("selected");

        gamelevel = this.innerHTML;
    });
    ``
});

// make all squares have a background color
const startbutton = document.getElementById("reset");

startbutton.addEventListener("click", function() {
    this.innerHTML = "NEW COLORS"
// assign each individual square a background color
    for (let i = 0; i < squares.length; i++){
        const red = Math.floor(Math.random()*256);
        const green = Math.floor(Math.random()*256);
        const blue = Math.floor(Math.random()*256);
        
        const rgbString = "rgb(" + red + "," + green + "," + blue + ")";

        const square = squares[i];
        
        square.dataset.rgb_value = JSON.stringify([red, green, blue]);
        square.style.backgroundColor = rgbString;
    }

    // assign the header a random rgb value from one of the square values.
    const randomSquareIndex = Math.floor(Math.random() *6);
    const headerColorSquare = squares[randomSquareIndex];
    setHeaderRgbBackgroundColor(headerColorSquare);
});

function setHeaderRgbBackgroundColor(squareElement) {
    const setHeaderElementBackgroundColor = (rgbValues, element) => {
        const [r, g, b] = rgbValues;
        const rgbString = `rgb(${r}, ${g}, ${b})`;
        console.log(rgbString)
        element.style.backgroundColor = rgbString;
        element.innerHTML = rgbValues.find((rgbValue) => {
            return rgbValue > 0;
        });
    };
    const rgbString = squareElement.dataset.rgb_value;
    colorDisplayElement.dataset.rgb_value = rgbString;
    const[red, green, blue] = JSON.parse(rgbString);
    
    const redBackground = [red, 0, 0];
    const greenBackground = [0, green, 0];
    const blueBackground = [0, 0, blue];

    setHeaderElementBackgroundColor(redBackground, rElement);
    setHeaderElementBackgroundColor(greenBackground, gElement);
    setHeaderElementBackgroundColor(blueBackground, bElement);
}
// add event listener to each square so that it either disappears or changes every square color
squares.forEach(square =>{
    square.addEventListener("click", function(){
        const headerRgbValue = colorDisplayElement.dataset.rgb_value
        const squareRgbValue = this.dataset.rgb_value;

        if (headerRgbValue == squareRgbValue){
          setSquareBackgroundAfterWin(headerRgbValue)  
        } else {
            this.classList.add("hidden")
        }
    });
});

function setSquareBackgroundAfterWin(headerRgbString){
    const [r, g, b] = JSON.parse(headerRgbString);
    const rgbString = `rgb(${r}, ${g}, ${b})`;

    squares.forEach(sq => {
        sq.classList.remove("hidden")
        sq.style.backgroundColor = rgbString
    })
}