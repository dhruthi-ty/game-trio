const BASE_URL = "https://api.frankfurter.app/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency codes
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Fetch exchange rates
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value.trim() || "1"; // Default to 1 if empty

  if (amtVal < 1) {
    amtVal = "1";
    amount.value = "1";
  }

  const fromCurrency = fromCurr.value.toUpperCase();
  const toCurrency = toCurr.value.toUpperCase();

  // 🚨 New API URL
  const URL = `${BASE_URL}?from=${fromCurrency}&to=${toCurrency}`;

  try {
    let response = await fetch(URL);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    let data = await response.json();
    let rate = data.rates[toCurrency];

    if (!rate) throw new Error("Invalid conversion rate received");

    let finalAmount = (amtVal * rate).toFixed(2);
    msg.innerText = `${amtVal} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
  } catch (error) {
    console.error("🚨 Error fetching exchange rate:", error.message);
    msg.innerText = "Error fetching rates. Try again.";
  }
};

// Update flag images
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Load exchange rate on page load
window.addEventListener("load", updateExchangeRate);

