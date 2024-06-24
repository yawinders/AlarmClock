let alarms = [];

document.addEventListener("DOMContentLoaded", () => {
    setInterval(updateTime, 1000);
    document.getElementById('set-alarm-btn').addEventListener('click', setAlarm);
});

function updateTime() {
    const currentTimeElement = document.getElementById('current-time');
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = String(minutes).padStart(2, '0');  //padstarts attach zero in case f single digit time
    seconds = String(seconds).padStart(2, '0');    //eg 1-->01 etc

    const currentTime = `${hours}:${minutes}:${seconds} ${ampm}`;
    currentTimeElement.textContent = currentTime;

    alarms.forEach((alarm, index) => {
        if (alarm.time === currentTime) {
            alert(`Time's up for alarm set at ${alarm.time}`);
            deleteAlarm(index); // Remove the alarm after it rings
        }
    });
}

function setAlarm() {
    const hrs = document.getElementById('alarm-hrs').value;
    const mins = document.getElementById('alarm-mins').value;
    const secs = document.getElementById('alarm-secs').value;
    const ampm = document.getElementById('alarm-ampm').value;

    if (hrs === '' || mins === '' || secs === '') {
        alert("Please set a valid time for the alarm.");
        return;
    }

    const alarmTime = `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} ${ampm}`;
    const alarm = { time: alarmTime };
    alarms.push(alarm);

    addAlarmToList(alarmTime);
}

function addAlarmToList(time) {
    console.log(alarms);
    const alarmsUl = document.getElementById('alarms-ul');
    const li = document.createElement('li');
    li.textContent = time;
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        const index = alarms.findIndex(alarm => alarm.time === time);
        deleteAlarm(index, li);
    };
    li.appendChild(deleteBtn);
    alarmsUl.appendChild(li);
}

function deleteAlarm(index, listItem) {
    alarms.splice(index, 1);
    listItem.remove();
}
