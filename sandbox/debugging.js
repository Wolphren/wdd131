const PI = 3.14;
let radius = 3;
let area = 0;

area = radius * radius * PI;
console.log("Area1:", area)
radius = 4;
area = radius * radius * PI;
console.log("Area2:", area)

function circleArea(radius){
    const area = radius * PI;
    return area
}
area = circleArea(3);
console.log("Area1:", area);

area = circleArea(4);
console.log("Area2:", area);