const work = {
    id: "work",
    name: "work",
    actionMessage: "You finished your shift!",
    duration: 8,
    moneyChange: 100,
    energyChange: -40,
    happinessChange: -20,
    healthChange: -10
}

const sleep = {
    id: "sleep",
    name: "sleep",
    actionMessage: "You ended the day and went to sleep.",
    duration: 8,
    moneyChange: 0,
    energyChange: 60,
    happinessChange: 5,
    healthChange: 15

}

const watchMovie = {
    id:"watchMovie",
    name:"watch movie",
    actionMessage: "You watched a movie.",
    duration: 2,
    moneyChange: -20,
    energyChange: 0,
    happinessChange: 20,
    healthChange: -5
}

const takeWalk = {
    id: "takeWalk",
    name: "take walk",
    actionMessage: "You took a walk!",
    duration: 2,
    moneyChange: 0,
    energyChange: -15,
    happinessChange: 15,
    healthChange: 10
}

const actions = [
    work,
    sleep,
    watchMovie,
    takeWalk
]

export default actions