const API = "https://api.adviceslip.com/advice"

const idNumber = document.querySelector(".idNumber")
const advice = document.querySelector(".advice")
const adviceGenerator =  document.querySelector(".dice-img")
const errorMessage = document.querySelector(".error")




const events = ["click", "touchstart"]

async function adviceFetch(e) {
    e.preventDefault()
    try {
        const response = await fetch(API)
        const data = await response.json()
       idNumber.innerText = data.slip.id
       advice.innerText = `"${data.slip.advice}"`
    } catch (error) {
        errorMessage.style.display = "block"
    }
  }


events.forEach(userEvent =>{
    adviceGenerator.addEventListener(userEvent, adviceFetch)
})