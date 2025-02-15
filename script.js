const API_KEY = '49e68f1e9578b435fe09c4e0';
const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`;

const fromCurrencyElement = document.getElementById('fromCurrency');
const toCurrencyElement = document.getElementById('toCurrency');
const amountElement = document.getElementById('amount');
const resultElement = document.getElementById('result');
const convertBtnElement = document.getElementById('ConvertBtn');  // Fix here

async function loadCurrencies() {
    console.log("Loading currencies...");

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log("Fetched data:", data);

        if (!data || !data.conversion_rates) {
            
            throw new Error("Invalid API response");
        }

        const currencies = Object.keys(data.conversion_rates);

        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrencyElement.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrencyElement.appendChild(optionTo);
        });

    } catch (error) {
        console.error('Error Loading Currencies:', error);
        resultElement.textContent = "Failed to load currencies. Please try again later.";
    }
}

async function convertCurrency() {
    console.log("Convert button clicked!");  // Debugging log

    const amount = parseFloat(amountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;

    if (isNaN(amount) || amount <= 0) {
        resultElement.textContent = "Enter a valid amount";
        return;
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const fromRate = data.conversion_rates[fromCurrency];
        const toRate = data.conversion_rates[toCurrency];

        const conversionAmount = (amount / fromRate) * toRate;
        resultElement.textContent = `${amount} ${fromCurrency} = ${conversionAmount.toFixed(2)} ${toCurrency}`;

    } catch (error) {
        resultElement.textContent = 'Error fetching currency rates. Please try again later.';
        console.error('Error converting currency:', error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadCurrencies();
    convertBtnElement.addEventListener("click", convertCurrency);
});
