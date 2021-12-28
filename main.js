
setTimeout(() => {
  const actionLine = document.createElement("div")
  actionLine.classList.add("action-line")
  document.body.prepend(actionLine)
}, 12000)

let requestedAction = ""

console.log("hello")

console.log("plugin started")

document.addEventListener("keydown", (e) => {
  const actionLine = document.getElementsByClassName("action-line")[0]
  if(!actionLine) return
  console.log("key pressed")

  if (e.code === "ArrowLeft") {
    e.preventDefault()
    requestedAction = "sell"
    actionLine.classList.add("action-line--sell")
    actionLine.classList.remove("action-line--buy")
    return
  }

  if (e.code === "ArrowRight") {
    e.preventDefault()
    requestedAction = "buy"
    actionLine.classList.add("action-line--buy")
    actionLine.classList.remove("action-line--sell")
    return
  }

  const instrumentName = getInstrumentNameFromKeyCode(e.code)

  if (requestedAction && instrumentName) {
    const row = getRowFromName(instrumentName)
    const { sellButton, buyButton } = getBuyAndSellButton(row)

    if (requestedAction === "buy") {
      console.log("buy", buyButton)
      buyButton.click()

      try {
        setTimeout(() => document.querySelector(".feature-controller-div.aw12 .action-button.submit-button").click(), 1500)
      } catch(e) {
        console.log("kunde inte klicka på action-knapp", e)
      }

      try {
        setTimeout(() => document.querySelector(".feature-controller-div.aw12 .action-button.close-button").click(), 2500)
      } catch(e) {
        console.log("kunde inte klicka på stäng-knapp", e)
      }
    }

    if (requestedAction === "sell") {
      console.log("sell", sellButton)
      sellButton.click()

      try {
        setTimeout(() => document.querySelector(".feature-controller-div.aw12 .action-button.submit-button").click(), 1500)
      } catch(e) {
        console.log("kunde inte klicka på action-knapp", e)
      }

      try {
        setTimeout(() => document.querySelector(".feature-controller-div.aw12 .action-button.close-button").click(), 2500)
      } catch(e) {
        console.log("kunde inte klicka på stäng-knapp", e)
      }
    }
  }

  requestedAction = ""
  actionLine.classList.remove("action-line--buy")
  actionLine.classList.remove("action-line--sell")
})

function getInstrumentNameFromKeyCode(code) {
  switch (code) {
    case "KeyS":
      return "Sweden 30"
    case "KeyG":
      return "Germany 40"
    case "KeyN":
      return "US NDAQ 100"
    case "KeyU":
      return "US SPX 500"
    default:
    return null
  }
}

function getBuyAndSellButton(tile) {
  console.log("getBuyAndSellButton", tile)
  const sellButton = tile.querySelector(".price-box.sell")
  const buyButton = tile.querySelector(".price-box.buy")

  return {
    sellButton,
    buyButton,
  }
}

function getRowFromName(name) {
  const wrapper = document.getElementsByClassName("vertical-container")[0]
  const gridTiles = wrapper.getElementsByClassName("grid-tile")

  const z = [...gridTiles].filter((tile) => {
    const nameTile = tile.getElementsByClassName("grid-tile__title")[0]
    return nameTile.innerText === name
  });

  return z[0]
}
