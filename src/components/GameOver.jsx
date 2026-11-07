function GameOver({ onRestart }) {
    return (
        <>
        <p>SYSTEM FAILURE</p>
        <p>HEALTH CRITICAL: 0</p>
        <p>SIMULATION TERMINATED</p>

        <button onClick={onRestart}>
            &gt; restart simulation
        </button>
        </>
    )
}

export default GameOver