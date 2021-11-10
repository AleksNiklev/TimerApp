let hoursElement;
let minutesElement;
let secondsElement;

let renderTimer = (hours, minutes, seconds, className) => {
    minutesElement.className = className;
    secondsElement.className = className;
    hoursElement.innerText = `${('0' + hours).toString().slice(-2)}:`;
    minutesElement.innerText = `${('0' + minutes).toString().slice(-2)}:`;
    secondsElement.innerText = ('0' + seconds).toString().slice(-2);
}

let renderTimerSection = () => {
    var div = document.createElement('div');
    hoursElement = document.createElement("span");
    hoursElement.id = 'hours';
    hoursElement.classList.add('work')
    hoursElement.innerText = '00:'
    minutesElement = document.createElement("span");
    minutesElement.id = 'minutes';
    minutesElement.classList.add('work')
    minutesElement.innerText = '00:'
    secondsElement = document.createElement("span");
    secondsElement.id = 'seconds';
    secondsElement.classList.add('work')
    secondsElement.innerText = '00'

    div.appendChild(hoursElement);
    div.appendChild(minutesElement);
    div.appendChild(secondsElement);

    return div;
}

let timerHtml = `<div>
    <span id="hours">00:</span>
    <span id="minutes" class="work">00:</span>
    <span id="seconds" class="work">00</span>
</div>`;

export {
    renderTimer,
    renderTimerSection,

}