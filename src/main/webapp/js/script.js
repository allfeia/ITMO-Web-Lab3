let lastR = 1;

function removeError(element) {
    const errorElement = element.parentNode.querySelector('.error-message');
    if (errorElement) {
        errorElement.remove();
    }
}
function createError(element, message) {
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.innerText = message;
    element.parentNode.appendChild(errorElement);
}
function validation() {

    let y = document.getElementById("j_idt6:yInput").value;

    removeError(document.getElementById("j_idt6:yInput"));

    let valid = true;

    y = y.replace(',', '.');
    let numberPattern = /^-?\d+(\.\d{1,2})?$/;

    if (y === "") {
        createError(document.getElementById("j_idt6:yInput"), "Please enter the coordinate Y");
        valid = false;

    } else if (!numberPattern.test(y)) {
        createError(document.getElementById("j_idt6:yInput"), "Y must be a number with at most 2 decimal places");
        valid = false;

    } else {
        y = parseFloat(y);

        if (-5 > y || y > 3) {
            createError(document.getElementById("j_idt6:yInput"), "Y must be an number between -5 to 3");
            valid = false;
        }
    }

    if (!valid) {
        return false;
    }

    removeError(document.getElementById("status"));
    return true;
}
function reDrawAxis(newR) {
    const svg = document.getElementById('axis-svg');

    const rect = svg.querySelector("rect.figure")
    const polygon = svg.querySelector("polygon.figure")
    const path = svg.querySelector("path.figure")

    rect.setAttribute("x", 150 - newR * 33.2)
    rect.setAttribute("y", 150 - newR * 33.2)
    rect.setAttribute("width", newR * 33.2)
    rect.setAttribute("height", newR * 33.2)

    path.setAttribute(
        "d",
        `
        M ${150 + newR * 16.6} 150
        A ${newR * 16.6} ${newR * 16.6}
        0 0 1
        150 ${150 + newR * 16.6}
        L 150 150 Z
        `
    );

    polygon.setAttribute(
        "points",
        `
        150, 150
        ${150 + newR * 16.6}, 150
        150, ${150 - newR * 33.2}
        `
    );

}

function drawPoint(x, y, r, answer){
    if (!(lastR === r)){
        lastR = r
    }

    const svg = document.getElementById('axis-svg');
    // Создаем новую точку (круг) в SVG
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");


    circle.setAttribute("cx", parseFloat(x) / 3 * 100 + 150);
    circle.setAttribute("cy", parseFloat(y) / 3 * 100 * -1 + 150);

    circle.setAttribute("r", 3);
    if (answer){
        circle.setAttribute("fill", "green");
    }else{
        circle.setAttribute("fill", "red");
    }
    svg.appendChild(circle);

}
function clearPoints() {
    const svgElement = document.getElementById('axis-svg');


    // Преобразуем HTMLCollection в массив и удаляем каждый элемент
    const circles = svgElement.getElementsByTagName('circle');
    const circleArray = Array.from(circles);

    circleArray.forEach(circle => {
        svgElement.removeChild(circle);
    });
}
document.getElementById('axis-svg').addEventListener('click', function (event) {
    const svgElement = document.getElementById('axis-svg');
    // Получаем координаты клика относительно SVG
    const rect = svgElement.getBoundingClientRect();
    const xGraph = event.clientX - rect.left;
    const yGraph = event.clientY - rect.top;
    console.log(xGraph, yGraph)

    const r = document.getElementById("j_idt6:rInput").value;

    // Отображаем координаты
    const x = ((xGraph - 150) / 100 * 3).toFixed(2);
    const y = ((yGraph - 150) / 100 * -1 * 3).toFixed(2);

    document.getElementById("j_idt6:xH").value = x
    document.getElementById("j_idt6:yInput").value = y

    document.getElementById("j_idt6:checkButton").click()


    setTimeout(() => {
        resetForm();
    }, 100);
});

function resetForm() {
    const xField = document.getElementById("j_idt6:xH");
    if (xField) {
        xField.value = "";
    }
}
document.getElementById("j_idt6:xInput").addEventListener('change', function (event) {
    const xField = document.getElementById("j_idt6:xH");
    if (xField) {
        xField.value = event.target.value;
    }
});