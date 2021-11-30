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
    div.classList.add('timer')
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

export {
    renderTimer,
    renderTimerSection,

}