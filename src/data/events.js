const brokenPhone = {
    id: "brokenPhone",
    title: "Your phone broke.",
    choices: [
        {   id: "repairBrokenPhone",
            label: "repair broken phone",
            moneyChange: -80,
            energyChange: 0,
            happinessChange: 0,
            healthChange: 0,
            message: "Your phone was repaired.",
            consequence: "phoneRepaired"
        },
        {   id: "ignoreBrokenPhone",
            label: "ignore broken phone",
            moneyChange: 0,
            energyChange: 0,
            happinessChange: 0,
            healthChange: 0,
            message: "You ignored the broken phone.",
            consequence: "phoneBroken"
        }
    ]
}

const partyInvitation = {
    id: "partyInvitation",
    title: "Your friend invited you to a party.",
    choices: [
        {   id: "goToParty",
            label: "Go to a party.",
            moneyChange: -30,
            energyChange: -20,
            happinessChange: 30,
            healthChange: -5,
            message: "You decided to go to a party."
        },

        {   id: "stayHome",
            label: "Stay home",
            moneyChange: 0,
            energyChange: 0,
            happinessChange: -5,
            healthChange: 0,
            message: "You decided to stay home."
        }
    ]
}

const events = [
    brokenPhone,
    partyInvitation
]

export default events