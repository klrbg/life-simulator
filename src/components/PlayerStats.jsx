function PlayerStats({ money, energy, happiness, health }) {
    return (
        <>
        <p>Money: ${money}</p>
        <p>Energy: {energy}</p>
        <p>Happiness: {happiness}</p>
        <p>Health: {health}</p>
        </>
    )
}

export default PlayerStats