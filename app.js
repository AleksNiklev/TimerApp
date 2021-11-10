import { renderTimer, renderTimerSection } from './src/timer.js';
import { renderSettingsSection, renderRoundsSection, renderStartButton } from "./src/settings.js";

const startSound = new Audio('./static/BoxingBell.mp3');
const singleBellSound = new Audio('./static/SingleBell.mp3');
let setupElement = document.getElementById("container");
let timerElement = document.getElementById("timer");
let interval;
let isPaused = false;

async function main() {

    singleBellSound.load();
    startSound.load();
    renderSetupSection()
}


function renderSetupSection() {
    clearSetupSection();
    clearTimerSection();
    var prepareSecton = renderSettingsSection("PREPARE", 1);
    var workSecton = renderSettingsSection("WORK", 2);
    var restSecton = renderSettingsSection("REST", 1);
    var roundsSecton = renderRoundsSection("ROUNDS");
    var startButton = renderStartButton('START WORKOUT', () => {

        let prepTime = getTime(+`${prepareSecton.inputMinute1.value}${prepareSecton.inputMinute2.value}`, +`${prepareSecton.inputSecond1.value}${prepareSecton.inputSecond2.value}`);
        let workTime = getTime(+`${workSecton.inputMinute1.value}${workSecton.inputMinute2.value}`, +`${workSecton.inputSecond1.value}${workSecton.inputSecond2.value}`);
        let restTime = getTime(+`${restSecton.inputMinute1.value}${restSecton.inputMinute2.value}`, +`${restSecton.inputSecond1.value}${restSecton.inputSecond2.value}`);
        let rounds = +`${roundsSecton.inputRound1.value}${roundsSecton.inputRound2.value}`;
        isPaused = false;
        renderStartWorkout();
        startWorkout(prepTime, workTime, restTime, rounds);
    });

    setupElement.appendChild(prepareSecton.div);
    setupElement.appendChild(workSecton.div);
    setupElement.appendChild(restSecton.div);
    setupElement.appendChild(roundsSecton.div);
    setupElement.appendChild(startButton);
}

function getTime(minutes, seconds) {
    return minutes * 60 + seconds;
}

function renderStartWorkout() {
    clearSetupSection();
    var backButton = renderStartButton('BACK', () => {
        clearInterval(interval);
        renderSetupSection();


    });
    var pauseButton = renderStartButton('PAUSE', () => {
        isPaused = !isPaused;
        pauseButton.innerText = isPaused ? 'START' : 'PAUSE';
    });


    timerElement.append(renderTimerSection());
    timerElement.append(backButton);
    timerElement.append(pauseButton);

}

async function startWorkout(preprTime, workTime, restTime, rounds) {
    let round = 1;
    await startPrep(preprTime, rounds);
    while (round <= rounds) {
        await startWork(workTime, round);
        if (round < rounds) {
            await startRest(restTime, round);
        }
        round++;
    }

}

function playStartSound(time) {
    if (!time) {
        startSound.load();
        startSound.play();
    }
}

function playSingleBell(time) {
    if (time === 3 || time === 2 || time === 1) {
        singleBellSound.load();
        singleBellSound.play();
    } else if (!time) {
        startSound.load();
        startSound.play();
    }
}

async function startPrep(prep, rounds) {
    await startTimer(prep, rounds, 'prep', playSingleBell);
}

async function startWork(work, rounds) {
    await startTimer(work, rounds, 'work', playStartSound)
}

async function startRest(rest, rounds) {
    await startTimer(rest, rounds, 'rest', playSingleBell);
}

function startTimer(timer, rounds, className, playSound) {
    return new Promise((resolve, reject) => {
        interval = setInterval(function() {
            if (!isPaused) {
                playSound(+timer);
                let minutes = parseInt(timer / 60, 10);
                let seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                renderTimer(rounds, minutes, seconds, className)

                if (--timer < 0) {
                    clearInterval(interval)
                    resolve();
                }

            }
        }, 1000);
    })
}

let clearSetupSection = () => {
    setupElement.innerHTML = '';
}
let clearTimerSection = () => {
    timerElement.innerHTML = '';
}

function clock() {
    setInterval(() => {
        var d = new Date();
        renderTimer(d.getHours(), d.getMinutes(), d.getSeconds(), "work")
    }, 1000);
}

main();