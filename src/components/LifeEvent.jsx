function LifeEvent({ activeEvent, onEventChoice }) {

    const choiceButtons = activeEvent.choices.map((choice) => {
        return (
            <button
                key={choice.id}
                onClick={() => onEventChoice(choice)}
            >
                &gt; {choice.label}

            </button>
        )
    })
    return ( 
        <div className="event-overlay">
            <div className="event-modal">
                <p>EVENT</p>
                <p>{activeEvent.title}</p>
                {choiceButtons}
            </div>
        </div>
    )
}

export default LifeEvent