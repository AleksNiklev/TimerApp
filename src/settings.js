import { renderSpinner } from "./spinner.js";

let renderSettingsSection = (label, value = 0) => {
    let div = document.createElement('div');
    div.classList.add('spinners');

    let p = document.createElement('p');
    p.innerText = label;

    let wrapper = document.createElement('div');
    wrapper.classList.add('spinners-wrapper');

    let span = document.createElement('span');
    span.innerText = ':'

    var divMinute1 = renderSpinner();
    var divMinute2 = renderSpinner();
    var divSecond1 = renderSpinner(value);
    var divSecond2 = renderSpinner();
    wrapper.appendChild(divMinute1);
    wrapper.appendChild(divMinute2);
    wrapper.appendChild(span);
    wrapper.appendChild(divSecond1);
    wrapper.appendChild(divSecond2);

    div.appendChild(p);
    div.appendChild(wrapper);

    let inputMinute1 = divMinute1.childNodes[1];
    let inputMinute2 = divMinute2.childNodes[1];
    let inputSecond1 = divSecond1.childNodes[1];
    let inputSecond2 = divSecond2.childNodes[1];

    return {
        div,
        inputMinute1,
        inputMinute2,
        inputSecond1,
        inputSecond2
    }
}

let renderRoundsSection = (label) => {
    let div = document.createElement('div');
    div.classList.add('spinners');

    let p = document.createElement('p');
    p.innerText = label;

    let wrapper = document.createElement('div');
    wrapper.classList.add('spinners-wrapper');

    let span = document.createElement('span');
    span.innerText = ':'

    var divRound1 = renderSpinner();
    var divRound2 = renderSpinner(1, 1);
    wrapper.appendChild(divRound1);
    wrapper.appendChild(divRound2);

    div.appendChild(p);
    div.appendChild(wrapper);

    let inputRound1 = divRound1.childNodes[1];
    let inputRound2 = divRound2.childNodes[1];

    return { div, inputRound1, inputRound2 }

}

let renderStartButton = (label, onclick) => {
    let button = document.createElement('button');
    button.classList.add('start-button');
    button.textContent = label
    button.addEventListener('click', onclick)
    return button;
}

export {
    renderSettingsSection,
    renderRoundsSection,
    renderStartButton,

}