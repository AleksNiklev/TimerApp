let renderSpinner = (value = 0, min = 0, max = 9) => {
    let div = document.createElement('div');
    div.classList.add('spinner');

    let input = document.createElement('input');
    input.type = "number";
    input.value = value;
    input.disabled = true;

    let spinnerUp = document.createElement('div');
    spinnerUp.innerText = '+';
    spinnerUp.classList.add('spinner-button', 'spinner-up');
    spinnerUp.addEventListener("click", () => {
        if (input.value < max) {
            input.value++;
        }
    })
    let spinnerDown = document.createElement('div');
    spinnerDown.innerText = '-';
    spinnerDown.classList.add('spinner-button', 'spinner-down');
    spinnerDown.addEventListener("click", () => {
        if (input.value > min) {
            input.value--;
        }
    })

    div.appendChild(spinnerUp);
    div.appendChild(input);
    div.appendChild(spinnerDown);
    return div;
}


export { renderSpinner }