let milliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;

let leadingSeconds = 0;
let leadingMinutes = 0;
let leadingHours = 0;

let timerInterval = null;
let timerStatus = "stopped";

let displayTimer = null;


function stopWatch() {
    milliseconds += 10
    if(milliseconds/1000 === 1){
    seconds++
    milliseconds = 0;

        if(seconds/60 === 1){
        minutes ++;
        seconds = 0;

            if(minutes/60 === 1){
            minutes = 0;
            hours ++;
            }
        }
    }
    if(seconds < 10){
        leadingSeconds = "0" + seconds.toString();
      } else {
        leadingSeconds = seconds;
      }
      if(minutes < 10){
        leadingMinutes = "0" + minutes.toString();
      } else {
        leadingMinutes = minutes;
      }
      if(hours < 10){
        leadingHours = "0" + hours.toString();
      } else {
        leadingHours = hours;
      } 
 displayTimer = document.querySelector('.timer').innerText = leadingHours + ':' + leadingMinutes + ':' + leadingSeconds + ":" + milliseconds;
}

const resetBtn = document.getElementById('reset-button');
const splitBtn = document.getElementById('split-button');


const startActionBtn = document.getElementById('start-button');



const startBtn = document.querySelector('.startOrPause');
const pauseBtn = document.getElementById('pause-button'); 
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', startTimer);

function startTimer () {
    if (timerStatus === "stopped") {
    timerInterval = window.setInterval(stopWatch, 10);
    document.getElementById('start-button').style.display = 'none';
    document.getElementById('pause-button').style.display = 'block';
    document.getElementById('reset-button').style.display = 'none';
    document.getElementById('split-button').style.display = 'block';
    timerStatus = "started"

} else {

    window.clearInterval(timerInterval);
    document.getElementById('start-button').style.display = 'block';
    document.getElementById('pause-button').style.display = 'none';
    document.getElementById('reset-button').style.display = 'block';
    document.getElementById('split-button').style.display = 'none';
    timerStatus = "stopped";
}};


resetBtn.addEventListener('click', timeAndDataReset);

function timeAndDataReset() {
    milliseconds = 0;
    seconds = 0;
    hours = 0;
    minutes = 0;
    displayTimer = document.querySelector('.timer').innerText = '00:00:00:00';

    document.querySelector('.lp-num').innerHTML = '';
    document.querySelector('.split-results').innerHTML = '';
    document.querySelector('.total-time').innerHTML = '';
    LapNumber = 0;
    totalTimes = [];
    intervalTimes = [];
  };

let totalTimes = [];
let intervalTimes = [];
let LapNumber = 0;

const timeString = document.querySelector('.timer').innerText;

function parseTimeToMilliseconds(timeString) {
 
  const parts = timeString.split(':');
  const hours = parseInt(parts[0]);
  const minutes = parseInt(parts[1]);
  const seconds = parseInt(parts[2]);
  const milliseconds = parseInt(parts[3]);
  
  const totalMilliseconds = hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
  return totalMilliseconds;
}
function millisecondsToTimeFormat(milliseconds) {
  const hours = Math.floor(milliseconds / 3600000);
  milliseconds %= 3600000;
  const minutes = Math.floor(milliseconds / 60000);
  milliseconds %= 60000;
  const seconds = Math.floor(milliseconds / 1000);
  const remainingMilliseconds = milliseconds % 1000;

  return (
    hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    seconds.toString().padStart(2, '0') + ':' +
    remainingMilliseconds.toString().padStart(3, '0')
  );
}

splitBtn.addEventListener('click', totalTimer);

function totalTimer() {
  let totalResult = document.querySelector('.timer').innerText;
  totalTimes.push(totalResult);

  const resultsContainer = document.querySelector('.total-time');
  const TotalTimeElement = document.createElement('div');
  TotalTimeElement.innerText = totalResult;
  resultsContainer.appendChild(TotalTimeElement);

  
    LapNumber++;
    const lapContainer = document.querySelector('.lp-num');
    const lapElement = document.createElement('p');
    lapElement.innerText = LapNumber;
    lapContainer.appendChild(lapElement);


    const intervalContainer = document.querySelector('.split-results');
    const intervalElement = document.createElement('div');


    if (totalTimes.length === 1) {
      let intervalResult = document.querySelector('.timer').innerText;
      intervalElement.innerText = intervalResult;
    } else {
      let interval2 = parseTimeToMilliseconds(totalTimes[totalTimes.length - 1]) - parseTimeToMilliseconds(totalTimes[totalTimes.length - 2]);
      intervalElement.innerText = millisecondsToTimeFormat(interval2);
    }
  
    intervalContainer.appendChild(intervalElement);
  };




/*
    
      for (let i = 0; i < totalTimes.length; i++) {
        const intervalContainer = document.querySelector('.split-results');
        const intervalElement = document.createElement('div');

        if(i === 0) {

          let intervalResult = document.querySelector('.timer').innerText;
          intervalElement.innerText = intervalResult;
          intervalContainer.appendChild(intervalElement);

        } else {

          let ostatniWynik = parseTimeToMilliseconds([totalTimes.length-1]);
          let intervalResult = parseTimeToMilliseconds([totalTimes.length-1]) - parseTimeToMilliseconds(totalTimes.length[i-2]);
          intervalElement.innerText = millisecondsToTimeFormat(intervalResult);
          intervalTimes.push(intervalElement);
          intervalContainer.appendChild(intervalTimes[intervalTimes.length-1]);
      }
      };

};
*/




  