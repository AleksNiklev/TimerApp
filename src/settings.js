import { renderSpinner } from "./spinner.js";

let renderSettingsSection = (label, { minutes = 0, seconds = 0 }) => {
    let div = document.createElement('div');
    div.classList.add('spinners');

    let p = document.createElement('p');
    p.innerText = label;

    let wrapper = document.createElement('div');
    wrapper.classList.add('spinners-wrapper');

    let span = document.createElement('span');
    span.innerText = ':'

    var divMinute1 = minutes > 9 ? renderSpinner(minutes.toString()[0]) : renderSpinner();
    var divMinute2 = minutes > 9 ? renderSpinner(minutes.toString()[1]) : renderSpinner(minutes.toString()[0]);
    var divSecond1 = seconds > 9 ? renderSpinner(seconds.toString()[0]) : renderSpinner();
    var divSecond2 = seconds > 9 ? renderSpinner(seconds.toString()[1]) : renderSpinner(seconds.toString()[0]);
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

let renderRoundsSection = (label, value) => {
    let div = document.createElement('div');
    div.classList.add('spinners');

    let p = document.createElement('p');
    p.innerText = label;

    let wrapper = document.createElement('div');
    wrapper.classList.add('spinners-wrapper');

    let span = document.createElement('span');
    span.innerText = ':'

    var divRound1 = renderSpinner();
    var divRound2 = renderSpinner(value, 1);
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