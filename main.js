const userInput = document.getElementById("user-input")
const checkBtn = document.getElementById("check-btn")
const clearBtn = document.getElementById("clear-btn")
const result = document.getElementById("results-div")
const holder = document.getElementById("holder")

//functions begin here
function telephoneCheck(input) {
  let num = input.toString()
  //Below are the regex for the accepted format
  const vodafone = /^0[25]0\d{7}$/
  const mtn = /^0[25][459]\d{7}$/
  const airteltigo = /^0[25][76]\d{7}$/

  let arr = [vodafone, mtn, airteltigo] //stores regex in array to be used to test string

  //test string against each regex
  const tester = (str) => arr.some((regex) => str.match(regex))
  //HTML strings
  const validString = `<p class="resulttext">Valid GH Number:  ${num}</p>`
  const invalidString = `<p class="resulttext">Invalid GH Number:  ${num}</p>`
  //test string against each regex
  result.innerHTML = tester(num) ? validString : invalidString
  userInput.value = ""
  if(tester(num)){
    holder.innerHTML += `<p style="margin-top: 1rem">${networkVerify(
    num
  )}:  ${num}</p>`
  }

}

const networkVerify = (num) => {
  const numstr = num.toString()
  const operators = {
    vodafone: "0",
    Mtn: "459",
    AirtelTigo: "67",
  }
  for (let check in operators) {
    if (operators[check].includes(numstr[2])) {
      return check
    }
  }
}

const checker = () => {
  if (userInput.value == "" || userInput.value.split("").length < 10) {
    alert("Please provide a phone number")
    return
  }
  telephoneCheck(userInput.value)
}

const clear = () => {
  result.textContent = ""
  Array.from(document.querySelectorAll("#holder p")).forEach((p) => p.remove())
}

const lauchnumberchecker = () => {
  result.innerHTML = `<p class="animtext">Api Connected</p>`
  setTimeout(() => {
    result.innerHTML = `<p class="animtext">Starting Validation</p>`
  }, 1000)
  setTimeout(() => {
    result.innerHTML = `<p class="animtext">Validating >> <span class="red">${Math.floor(
      Math.random() * 10
    )}%</span></p>`
  }, 2000)
  setTimeout(() => {
    result.innerHTML = `<p class="animtext">Validating >> <span class="redyellow">${Math.floor(
      Math.random() * (50 - 30 + 1) + 30
    )}%</span></p>`
  }, 2500)
  setTimeout(() => {
    result.innerHTML = `<p class="animtext">Validating >> <span class="yellow">${Math.floor(
      Math.random() * (95 - 90 + 1) + 90
    )}%<span></p>`
  }, 2800)
  setTimeout(() => {
    result.innerHTML = `<p class="animtext">Validating >> <span class="green">100%<span></p>`
  }, 3800)
  setTimeout(() => {
    result.innerHTML = ""
    checker()
  }, 5000)
}
//functions end here

//event listeners start here
userInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    lauchnumberchecker()
  }
})
checkBtn.addEventListener("click", lauchnumberchecker)
clearBtn.addEventListener("click", clear)
userInput.addEventListener("change", () =>
  localStorage.setItem("data", userInput.value)
)
window.onload = () => {
  userInput.value = localStorage.getItem("data")
}
