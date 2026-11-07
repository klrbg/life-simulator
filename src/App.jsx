import { useState, useEffect } from "react"
import "./App.css"
import LandingPage from "./components/LandingPage.jsx"
import CharacterSetup from "./components/CharacterSetup.jsx"
import SimulationPage from "./components/SimulationPage.jsx"
import WeekSummary from "./components/WeekSummary.jsx"
import GameOver from "./components/GameOver.jsx"
import { fetchWeather } from "./api/weatherApi.js"
import events from "./data/events.js"
import gameConfig from "./data/gameConfig.js"





function App() {    
  const initialGameState = {
    playerName: "",
    money: 100,
    energy: 100,
    happiness: 100,
    health: 100,
    message: "",
    currentHour: gameConfig.dayStartHour,
    currentDay: 1,
    currentWeek: 1,
    weekSummary: {
      work: 0, 
      sleep: 0, 
      watchMovie: 0, 
      takeWalk: 0
    },
    dailyActions: {
      work: 0,
      watchMovie: 0,
      takeWalk: 0
    },
    weather: null,
    weatherError: false,
    promotionOpportunity: "locked",
    activeEvent: null,
    eventHistory: [],
    phoneBroken: false,
    selectedAvatar: null,
    inventory: [],
    screen: "landing"
  }

  const [screen, setScreen] = useState(initialGameState.screen)
  const [playerName, setPlayerName] = useState(initialGameState.playerName)
  const [money, setMoney] = useState(initialGameState.money)
  const [energy, setEnergy] = useState(initialGameState.energy)
  const [happiness, setHappiness] = useState(initialGameState.happiness)
  const [health, setHealth] = useState(initialGameState.health)
  const [message, setMessage] = useState(initialGameState.message)

  const [currentHour, setCurrentHour] = useState(initialGameState.currentHour)
  const [currentDay, setCurrentDay] = useState(initialGameState.currentDay)
  const [currentWeek, setCurrentWeek] = useState(initialGameState.currentWeek)
  const [weekSummary, setWeekSummary] = useState(initialGameState.weekSummary)
  const [dailyActions, setDailyActions] = useState(initialGameState.dailyActions)

  const [weather, setWeather] = useState(initialGameState.weather)
  const [weatherError, setWeatherError] = useState(initialGameState.weatherError)

  const [promotionOpportunity, setPromotionOpportunity] = useState(initialGameState.promotionOpportunity)
  const [activeEvent, setActiveEvent] = useState(initialGameState.activeEvent)
  const [eventHistory, setEventHistory] = useState(initialGameState.eventHistory)
  const [phoneBroken, setPhoneBroken] = useState(initialGameState.phoneBroken)
  const [selectedAvatar, setSelectedAvatar] = useState(initialGameState.selectedAvatar)
  const [inventory, setInventory] = useState(initialGameState.inventory)
  
  
  

  function limitStat(value) {
    if (value > 100) {
      return 100
    } else if (value < 0) {
      return 0
    }
    return value
  }



  function handleAction(action) {
    const {
      moneyChange,
      energyChange,
      happinessChange,
      healthChange,
      actionMessage,
      duration
    } = action

    let adjustedHappinessChange = happinessChange
    let adjustedMoneyChange = moneyChange
    let adjustedEnergyChange = energyChange
    let adjustedActionMessage = actionMessage
    


    if(action.id === "work" && weekSummary[action.id] >= gameConfig.weeklyWorkLimit) {
      setMessage("You already worked 5 shifts this week.")
      return
    }

    if (action.id === "work" && promotionOpportunity === "accepted") {
      adjustedMoneyChange = 150
      adjustedEnergyChange = -50
    }

    if (action.id === "work" && phoneBroken === true) {
      adjustedMoneyChange = adjustedMoneyChange - 30
      adjustedActionMessage = "You can't do your job to the fullest with a broken phone." 
    }

    if (action.id === "takeWalk" && weather) {

    if (weather.weather_code === 0) {
      adjustedHappinessChange = 20
      adjustedActionMessage = "You took a walk in the sun. Happiness +20."
    } else if ([61, 63, 65].includes(weather.weather_code)) {
      adjustedHappinessChange = 5
      adjustedActionMessage = "You took a walk in the rain. Happiness +5."
    }
    }

    if (
      action.id !== "sleep" &&
      dailyActions[action.id] >= gameConfig.dailyActionLimit
    ) {
      setMessage("You already did this action today.")
      return
    }


    if (action.id !== "sleep" && currentHour + duration >= 24){
      setMessage("There isn't enough time left in the day.")
      return
    }

    if (money + adjustedMoneyChange < 0) {
      setMessage("You don't have enough money!")
      return
    }
     
    if (energy + adjustedEnergyChange < 0) {
      setMessage("You don't have enough energy!")
      return
    }

    if (happiness + adjustedHappinessChange < 0) {
      setMessage("You are depressed.")
      return
    }
    

    
    if (action.id !== "sleep") {
      setDailyActions((currentDailyActions) => 
      { 
        return {
          ...currentDailyActions,
          [action.id]: currentDailyActions[action.id] + 1
        }
      })
    }

    setMoney((currentMoney) => currentMoney + adjustedMoneyChange)

    setEnergy((currentEnergy) => 
      limitStat(currentEnergy + adjustedEnergyChange))

    setHappiness((currentHappiness) => 
      limitStat(currentHappiness + adjustedHappinessChange))

    const nextHealth = limitStat(health + healthChange)

    setHealth(nextHealth)
      if (nextHealth <= 0) {
        setScreen("gameOver")
        return
      }

    setMessage(adjustedActionMessage)

    setWeekSummary((currentWeekSummary) =>
    { 
      return {
      ...currentWeekSummary,
      [action.id]: currentWeekSummary[action.id] + 1
    }
      
    })


    if (action.id === "sleep") {
      if (currentDay === 7) {
        setScreen("summary")
      } else {
        setCurrentDay((currentDay) => currentDay + 1)
        setCurrentHour(gameConfig.dayStartHour)
        setDailyActions(initialGameState.dailyActions)
      }
    } else {
        setCurrentHour((currentHour) => currentHour + duration)
      }
    }
    
    

  const availableEvents = events.filter((event) =>{
    return !eventHistory.includes(event.id)
  })

  const EVENT_CHANCE = 0.5


  function handleStartNextWeek () {
    if (weekSummary.sleep < 7) {
      setEnergy((currentEnergy) => 
        limitStat(currentEnergy - 20))
    }
      
    if (weekSummary.work >= 5) {
      setMoney((currentMoney) => currentMoney + 50)

      if (promotionOpportunity === "locked") {
        setPromotionOpportunity("available")
      }
    }

    if (Math.random() < EVENT_CHANCE && availableEvents.length > 0) {
    const randomIndex = Math.floor(
      Math.random() * availableEvents.length
    )

    const selectedEvent = availableEvents[randomIndex]
    setActiveEvent(selectedEvent)

    setEventHistory((currentEventHistory) => {
      return [
        ...currentEventHistory,
        selectedEvent.id
      ]
    })
  }
    setCurrentWeek((currentWeek) => currentWeek + 1)
    setCurrentDay(1)
    setCurrentHour(8)
    setMessage("A new week has begun.") 
    setScreen("simulation")
    setWeekSummary(initialGameState.weekSummary)
    setDailyActions(initialGameState.dailyActions)
  }

  
  function handleEventChoice(choice) {
    if (money + choice.moneyChange < 0 ) {
      setMessage("You don't have enough money!")
      return
    }

    setMoney((currentMoney) => currentMoney + choice.moneyChange)
    setMessage(choice.message)

    setEnergy((currentEnergy) => 
    limitStat(currentEnergy + choice.energyChange))
    setHappiness((currentHappiness) =>
    limitStat(currentHappiness + choice.happinessChange))
    
    const nextHealth = limitStat(health + choice.healthChange)
    setHealth(nextHealth)

    if (nextHealth <= 0) {
      setScreen("gameOver")
      return
    }
  

  if (choice.consequence === "phoneBroken") {
    setPhoneBroken(true)
  }

  if (choice.consequence === "phoneRepaired") {
    setPhoneBroken(false)
  }

  setActiveEvent(null)

  }

  useEffect(() => {
    if (screen !== "simulation") {
      return
    }
    async function loadWeather() {
    setWeatherError(false)
    
    try { 
      const currentWeather = await fetchWeather()
      setWeather(currentWeather)
    }
  
    catch (error) {
    console.log(error.message)
    setWeatherError(true)
    }
  }
    loadWeather()

  }, [currentWeek, screen])

  function handleAcceptPromotion() {
    setPromotionOpportunity("accepted")
  }

  function handleDeclinePromotion() {
    setPromotionOpportunity("declined")
  }

  function resetGame() {
    setPlayerName(initialGameState.playerName)
    setMoney(initialGameState.money)
    setEnergy(initialGameState.energy)
    setHappiness(initialGameState.happiness)
    setHealth(initialGameState.health)
    setMessage(initialGameState.message)
    setCurrentHour(initialGameState.currentHour)
    setCurrentDay(initialGameState.currentDay)
    setCurrentWeek(initialGameState.currentWeek)
    setWeekSummary(initialGameState.weekSummary)
    setDailyActions(initialGameState.dailyActions)
    setWeather(initialGameState.weather)
    setWeatherError(initialGameState.weatherError)
    setPromotionOpportunity(initialGameState.promotionOpportunity)
    setActiveEvent(initialGameState.activeEvent)
    setEventHistory(initialGameState.eventHistory)
    setPhoneBroken(initialGameState.phoneBroken)
    setSelectedAvatar(initialGameState.selectedAvatar)
    setInventory(initialGameState.inventory)
    setScreen(initialGameState.screen)
  }

  function buyItem(item) {
    if (money < item.price) {
      setMessage("You don't have enough money!")
      return
    }

    setMoney((currentMoney) => currentMoney - item.price)

    setInventory((currentInventory) => {
      const existingItem = currentInventory
        .find((inventoryItem) => {
          return inventoryItem.itemId === item.id
        })

      if (existingItem) {
        return currentInventory.map((inventoryItem) => {
          if (inventoryItem.itemId === item.id) {
            return {
              ...inventoryItem,
              quantity: inventoryItem.quantity + 1
            }
          }
        return inventoryItem
      })    
    
    } else {
        
          return [
            ...currentInventory,
            {
              itemId: item.id,
              quantity: 1
            }
          ]
        }
      }
  )}

    

  function useItem (item) {
    setEnergy((currentEnergy) =>
    limitStat(currentEnergy + item.energyChange))

    setHappiness((currentHappiness) =>
    limitStat(currentHappiness + item.happinessChange))

    setHealth((currentHealth) =>
    limitStat(currentHealth + item.healthChange))

    setInventory((currentInventory) => currentInventory
      .map((inventoryItem) => {
        if (inventoryItem.itemId === item.id) {
          return { ...inventoryItem,
            quantity: inventoryItem.quantity - 1
          }
        }
        return inventoryItem
      })
      .filter((inventoryItem) => {
            return inventoryItem.quantity > 0
          })
    )
  }



  let screenContent = <LandingPage onStart={() => setScreen("setup")}/>

  if (screen === "setup") {
    screenContent =
      <CharacterSetup 
      playerName={playerName}
      setPlayerName={setPlayerName}
      setSelectedAvatar={setSelectedAvatar}
      selectedAvatar={selectedAvatar}
      onContinue={() => setScreen("simulation")}
      onBack={() => setScreen("landing")}
      />
  } 

  if (screen === "simulation") {
    screenContent =
      <SimulationPage
      playerName={playerName}
      money={money}
      energy={energy}
      happiness={happiness}
      health={health}
      
      currentWeek={currentWeek}
      currentDay={currentDay}
      currentHour={currentHour}
      weather={weather}
      weatherError={weatherError}

      onAction={handleAction}
      actionMessage={message}
      promotionOpportunity={promotionOpportunity}
      acceptPromotion={handleAcceptPromotion}
      declinePromotion={handleDeclinePromotion}
      activeEvent={activeEvent}
      onEventChoice={handleEventChoice}
      selectedAvatar={selectedAvatar}
      buyItem={buyItem}
      inventory={inventory}
      useItem={useItem}
      
      />
  }


  if (screen === "summary") {
    screenContent = 
      <WeekSummary
        startNextWeek={handleStartNextWeek}
        weekSummary={weekSummary}
        currentWeek={currentWeek}
    
      />
  }

  if (screen === "gameOver") {
    screenContent =
    <GameOver 
    onRestart={resetGame}
    />
  }

return (
  

    <div className="crt-frame">
      <div className="crt-inside-frame">
            <div className="crt-screen">
              {screenContent}
            </div>
      </div>
    </div>

  
)
}

export default App
