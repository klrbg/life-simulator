import PlayerStats from "./PlayerStats.jsx"
import actions from "../data/actions.js"
import shopItems from "../data/shopItems.js"
import LifeEvent from "./LifeEvent.jsx"
import { useState } from "react"



function getWeatherDescription(weatherCode) {
  if (weatherCode === 0) {
    return "Clear"
  } else if ([1, 2, 3].includes(weatherCode)) {
    return "Cloudy"
  } else if ([61, 63, 65].includes(weatherCode)) {
    return "Rain"
  } else {
    return "Unknown"
  }
}

function SimulationPage({ playerName, money, energy, happiness, health, onAction, actionMessage, currentHour, currentDay, currentWeek, weather, weatherError, promotionOpportunity, acceptPromotion, declinePromotion, selectedAvatar, buyItem, inventory, useItem, activeEvent, onEventChoice}) {


const [activePanel, setActivePanel] = useState(null)

function togglePanel (panel) {
 
  setActivePanel((currentActivePanel) => currentActivePanel === panel ? null : panel)

}


  let weatherText = "Weather: Loading..."
  if (weatherError) {
   weatherText = "Weather: Cannot load the weather"
  } else if (weather) {
    weatherText = `Weather: ${weather.temperature_2m}°C | ${getWeatherDescription(weather.weather_code)}`
  }

  let opportunityContent = null

  if (promotionOpportunity === "available") {
    opportunityContent = 
    <div className="promotion-overlay">
      <div className="promotion-modal">
        <p>Promotion opportunity available.</p>
          <button onClick={acceptPromotion}>ACCEPT</button>
          <button onClick={declinePromotion}>DECLINE</button>
      </div>
    </div>
  }

  let lifeEventContent = null
  
  if (activeEvent !== null) {
    lifeEventContent = 
    <LifeEvent
      activeEvent={activeEvent}
      onEventChoice={onEventChoice}/>
  }

  const actionButtons = actions.map((action) => {
    return (
      <button key = {action.id}
      onClick={() => onAction(action)}>
        &gt; {action.name}
      </button>
    )
  })

  const shopButtons = shopItems.map((item) => {
    return (
      <button key = {item.id}
        onClick={() => buyItem(item)}>
          &gt; {item.name} {item.price}$
      </button>
    )
  })

  const inventoryButtons = inventory.map((inventoryItem) => {
    const shopItem = shopItems.find((shopItem) => {
      return shopItem.id === inventoryItem.itemId   
    })
    return (
      <button key = {inventoryItem.itemId}
        onClick={() => useItem(shopItem)}>
        &gt; {shopItem.name} {inventoryItem.quantity}
      </button>
    )
  })

    return (
      <>
      <div className="simulation-ui">

      
      <section className="header">
      <h1>SIMULATION</h1>
      </section>

      <section className="avatar-panel">
        <h2 className="panel-title">---AVATAR---</h2>
        {selectedAvatar && (
          <img src= {selectedAvatar.image}
          alt="Avatar"
          className="player-avatar" 
          />
        )}
      </section>

      <section className="stats-panel">
      <h2 className="panel-title">---STATUS---</h2>
      <p>Player: {playerName}</p>
      <PlayerStats
      money={money}
      energy={energy}
      happiness={happiness}
      health={health}
      />
      </section>

      <section className="time-panel">
      <h2 className="panel-title">---TIME---</h2>
      <p>Week: {currentWeek}</p>
      <p>Day: {currentDay}</p>
      <p>Time: {currentHour.toString().padStart(2, "0")}:00</p>
      <p>{weatherText}</p>
      </section>

      <section className="actions-panel">
        <button onClick={() => togglePanel("actions")}>
          &gt;&gt;&gt; ACTIONS &lt;&lt;&lt;
        </button>
          <div className="terminal-menu">
            {activePanel === "actions" && actionButtons}
          </div>
      </section>

      <section className="shop-panel">
        <button onClick={() => togglePanel("shop")}>
          &gt;&gt;&gt; SHOP &lt;&lt;&lt;
        </button>
        <div className="terminal-menu">
            {activePanel === "shop" && shopButtons}
        </div>
      </section>

      <section className="inventory-panel">
        <button onClick={() => togglePanel("inventory")}>
          &gt;&gt;&gt; INVENTORY &lt;&lt;&lt;
        </button>
        <div className="terminal-menu">
            {activePanel === "inventory" && (
                inventory.length === 0 ?
                "Your inventory is empty." : 
                inventoryButtons
            )}
        </div>
      </section>


      <section className="message-panel">
        <span className="message-label">SYSTEM &gt; </span>
      {actionMessage}
      </section>

      
      {opportunityContent}
      

      
      {lifeEventContent}
     
      
      </div>
      </>
    )
}

export default SimulationPage