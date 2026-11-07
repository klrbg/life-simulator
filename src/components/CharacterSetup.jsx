import { useRef } from "react"
import avatars from "../data/avatar.js"


function CharacterSetup({ onBack, playerName, setPlayerName, onContinue, setSelectedAvatar, selectedAvatar}) {

  const avatarOptions = avatars.map((avatar) => {
    return (
      <button key={avatar.id}
              className="avatar-image-button"
              onClick={() => setSelectedAvatar(avatar)}
              aria-pressed={selectedAvatar?.id === avatar.id}>
        <img src={avatar.image}
          alt="Avatar option"
          className="avatar-image"
        />
      </button>
    )
  })

  const inputRef = useRef(null)
  const handleTerminalClick = () => {
    inputRef.current?.focus()
  }
    return (
      <div className="character-setup-container">
        <h1>CHARACTER SETUP</h1>
        <p>Create your player.</p>

        <div className="terminal-line" onClick={handleTerminalClick}>
        <span className="prompt">Enter name:</span>
        <div className="input-display">
          <span>{playerName}</span>
          <span className="cursor" />
        </div>
      </div>

      <input
        ref={inputRef}
        type="text"
        className="real-input"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        autoFocus
        autoComplete="off"
        spellCheck="false"
      />

        <section className="avatar-options">
        {avatarOptions}
        </section>

        <button onClick={onContinue}
                disabled={!selectedAvatar || !playerName}
                >
        &gt; CONTINUE
        </button>

        <button onClick={onBack}>
        &gt; BACK
        </button>
      </div>
    )
}

export default CharacterSetup