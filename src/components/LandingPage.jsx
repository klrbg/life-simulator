function LandingPage({ onStart }) {
    return (
    <>
      <h1>LIFE://SIMULATION</h1>
      <p>Build a life. Live with the consequences.</p>
  
      <button onClick={onStart}>
      &gt; START SIMULATION
      </button>
    </>
  )
}
export default LandingPage