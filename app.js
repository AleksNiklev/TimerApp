import { renderTimer, renderTimerSection } from './src/timer.js';
import { renderSettingsSection, renderRoundsSection, renderStartButton } from "./src/settings.js";

const startSound = new Audio('./static/BoxingBell.mp3');
const singleBellSound = new Audio('./static/SingleBell.mp3');
let appElement = document.getElementById("app");
let interval;
let isPaused = false;
let prepTime = 10;
let workTime = 20;
let restTime = 10;
let rounds = 8;


async function main() {
    startSound.load();
    singleBellSound.load();
    renderSetupSection()
}


function renderSetupSection() {
    clearSection();
    var prepareSecton = renderSettingsSection("PREPARE", getMinutesAndSeconds(prepTime));
    var workSecton = renderSettingsSection("WORK", getMinutesAndSeconds(workTime));
    var restSecton = renderSettingsSection("REST", getMinutesAndSeconds(restTime));
    var roundsSecton = renderRoundsSection("ROUNDS", rounds);
    var startButton = renderStartButton('START WORKOUT', () => {

        prepTime = getTime(+`${prepareSecton.inputMinute1.value}${prepareSecton.inputMinute2.value}`, +`${prepareSecton.inputSecond1.value}${prepareSecton.inputSecond2.value}`);
        workTime = getTime(+`${workSecton.inputMinute1.value}${workSecton.inputMinute2.value}`, +`${workSecton.inputSecond1.value}${workSecton.inputSecond2.value}`);
        restTime = getTime(+`${restSecton.inputMinute1.value}${restSecton.inputMinute2.value}`, +`${restSecton.inputSecond1.value}${restSecton.inputSecond2.value}`);
        rounds = +`${roundsSecton.inputRound1.value}${roundsSecton.inputRound2.value}`;
        isPaused = false;
        renderStartWorkout();
        startWorkout(prepTime, workTime, restTime, rounds);
    });

    appElement.appendChild(prepareSecton.div);
    appElement.appendChild(workSecton.div);
    appElement.appendChild(restSecton.div);
    appElement.appendChild(roundsSecton.div);
    appElement.appendChild(startButton);
}

function getTime(minutes, seconds) {
    return minutes * 60 + seconds;
}

function renderStartWorkout() {
    clearSection();
    var backButton = renderStartButton('BACK', () => {
        clearInterval(interval);
        renderSetupSection();
    });
    var pauseButton = renderStartButton('PAUSE', () => {
        isPaused = !isPaused;
        pauseButton.innerText = isPaused ? 'START' : 'PAUSE';
    });



    var div = document.createElement('div');
    var butonsWrapper = document.createElement('div');
    div.classList.add("timer-wrapper")
    butonsWrapper.classList.add("butons-wrapper")
    div.append(renderTimerSection());
    butonsWrapper.append(pauseButton);
    butonsWrapper.append(backButton);
    div.append(butonsWrapper);

    appElement.append(div);
}

async function startWorkout(preprTime, workTime, restTime, rounds) {
    let round = 1;
    await startPrep(preprTime, round, rounds);
    while (round <= rounds) {
        await startWork(workTime, round, rounds);
        if (round < rounds) {
            await startRest(restTime, round, rounds);
        }
        round++;
    }

}

function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function playPrepBell(time, initialTime) {
    if (time === 3 || time === 2 || time === 1) {
        playSound(singleBellSound);
    }
}

function playWorkSound(time, initialTime) {
    if (time == initialTime || time === 0) {
        playSound(startSound);
    }
}

function playRestBell(time, initialTime) {
    if (time === 3 || time === 2 || time === 1) {
        playSound(singleBellSound);
    } else if (time == initialTime) {
        playSound(startSound);
    }
}

async function startPrep(prep, round, rounds) {
    await startTimer(prep, round, rounds, 'prep', playPrepBell);
}

async function startWork(work, round, rounds) {
    await startTimer(work, round, rounds, 'work', playWorkSound)
}

async function startRest(rest, round, rounds) {
    await startTimer(rest, round, rounds, 'rest', playRestBell);
}

function startTimer(timer, round, rounds, className, playSound) {
    let initialTime = +timer;
    return new Promise((resolve, reject) => {
        interval = setInterval(function() {
            if (!isPaused) {
                playSound(+timer, initialTime);
                var { minutes, seconds } = getMinutesAndSeconds(timer);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                renderTimer(round, minutes, seconds, className)

                if (className === 'work') {
                    if (round === rounds) {
                        if (--timer < 0) {
                            clearInterval(interval)
                            resolve();
                        }
                    } else if (--timer <= 0) {
                        clearInterval(interval)
                        resolve();
                    }
                } else if (--timer <= 0) {
                    clearInterval(interval)
                    resolve();
                }
            }
        }, 1000);
    })
}

function getMinutesAndSeconds(time) {
    return {
        minutes: parseInt(time / 60, 10),
        seconds: parseInt(time % 60, 10)
    }
}

let clearSection = () => {
    appElement.innerHTML = '';
}

function clock() {
    setInterval(() => {
        var d = new Date();
        renderTimer(d.getHours(), d.getMinutes(), d.getSeconds(), "work")
    }, 1000);
}

main();