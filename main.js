const actionLine = document.createElement("div")
actionLine.classList.add("action-line")
document.body.prepend(actionLine)

let requestedAction = ""

document.addEventListener("keydown", (e) => {
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
    // const row = getRowFromName(instrumentName)
    // const { buyButton, sellButton } = getBuyAndSellButton(row)

    if (requestedAction === "buy") {
      console.log("buy")
      // buyButton.click()
    }

    if (requestedAction === "sell") {
      console.log("sell")
      // sellButton.click()
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
    default:
    return null
  }
}

function getBuyAndSellButton(row) {
  const columns = row.getElementsByClassName("column")
  const columnCount = columns.length - 1

  const buyButton = columns[columnCount].getElementsByClassName("double-row-actions__bid")[0]
  const sellButton = columns[columnCount].getElementsByClassName("double-row-actions__offer")[0]

  return {
    buyButton,
    sellButton,
  }
}

function getRowFromName(name) {
  const wrapper = document.getElementsByClassName('feature-next-gen-watchlist')[0]
  const rows = wrapper.getElementsByClassName("row")

  const z = [...rows].filter((row) => {
    const columns = row.getElementsByClassName("column")
    return columns[0].getAttribute("title") === name
  });

  return z[0]
}
