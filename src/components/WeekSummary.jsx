function WeekSummary({ startNextWeek, weekSummary,  currentWeek }) {
    let workMessage = ""

    if (weekSummary.work >= 5) {
        workMessage = "You have a productive week. Money +50"
    } else {
        workMessage = "You barely worked this week."
    }

    let sleepMessage = ""

    if (weekSummary.sleep >= 7) {
        sleepMessage = "You got enough rest this week."
    } else {
        sleepMessage = "You didn't get enough rest last week. Energy -20."
    }

    let watchMovieMessage = ""
    if (weekSummary.watchMovie > 8) {
        watchMovieMessage = "You wasting your time."
    } else {
        watchMovieMessage = "You have balanced week"
    }

    let takeWalkMessage = ""
    if (weekSummary.takeWalk >= 4) {
        takeWalkMessage = "A healthy mind in a healthy body."
    } else {
        takeWalkMessage = "You're only one walk away from a good mood."
    }

    return (
        <>
        <h1>WEEK {currentWeek} SUMMARY</h1>
        <p>Work: {weekSummary.work}</p>
        <p>{workMessage}</p>
        <p>Sleep: {weekSummary.sleep}</p>
        <p>{sleepMessage}</p>
        <p>Watch Movie: {weekSummary.watchMovie}</p>
        <p>{watchMovieMessage}</p>
        <p>Take Walk: {weekSummary.takeWalk}</p>
        <p>{takeWalkMessage}</p>

        <button onClick={startNextWeek}>
            START NEXT WEEK
        </button>
        </>
    )
}

export default WeekSummary