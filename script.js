document.getElementById('timetable-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const startTime = document.getElementById('startTime').value;
    const totalTime = parseInt(document.getElementById('totalTime').value) * 60; // convert hours to minutes
    const numberOfChapters = parseInt(document.getElementById('chapters').value);

    const scheduleList = document.getElementById('schedule-list');
    const warningMessage = document.getElementById('warning-message');
    scheduleList.innerHTML = ''; // Clear the previous schedule
    warningMessage.textContent = ''; // Clear previous warning message

    let studySession = 45; // 45 minutes study session
    let breakSession = 10; // 10 minutes break
    let totalMinutes = 0;
    let chaptersCovered = 0;

    // Check if the total time is sufficient for the number of chapters
    const requiredTime = numberOfChapters * (studySession + breakSession) - breakSession; // No break after the last session

    if (totalTime < requiredTime) {
        warningMessage.textContent = 'Warning: Insufficient time to cover all chapters! Spend more time to reach your goals! Maximize your minutes for maximum results!';
        return;
    }

    let [startHours, startMinutes] = startTime.split(':').map(Number);
    let currentTime = new Date();
    currentTime.setHours(startHours);
    currentTime.setMinutes(startMinutes);
    currentTime.setSeconds(0);

    while (totalMinutes < totalTime && chaptersCovered < numberOfChapters) {
        let start = formatTime(currentTime);
        currentTime.setMinutes(currentTime.getMinutes() + studySession);
        let end = formatTime(currentTime);
        chaptersCovered++;
        totalMinutes += studySession;

        const listItem = document.createElement('li');
        listItem.textContent = `Study Chapter ${chaptersCovered} from ${start} to ${end}.`;
        scheduleList.appendChild(listItem);

        if (totalMinutes < totalTime && chaptersCovered < numberOfChapters) {
            currentTime.setMinutes(currentTime.getMinutes() + breakSession);
            totalMinutes += breakSession;
        }
    }

    document.getElementById('timetable-form').reset();
});

function formatTime(date) {
    let hours = date.getHours().toString().padStart(2, '0');
    let minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
