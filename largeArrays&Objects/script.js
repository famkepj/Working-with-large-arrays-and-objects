// This exercise consists of 6 sub-exercises that increase in complexity. Choose a number of sub-questions that you like to make. Each sub-exercise has a number of points. Make sure you make sub exercises that total at least 4 points. Don't dwell too long on this exercise, it is a very big exercise. Maybe you can come back to this later for a replay!

// Country-list 1 point = DONE
// Capricorn women - 3 points
// Sub-exercise: old credit cards - 4 points = DONE
// Sub-question: most people - 3 points
// Sub exercise: average age - 5 points
// Sub-exercise: matchmaking - 6 points

// getAllData
const getAllData = randomPersonData.map((data) => {
  return data;
});

//country list - 1 point
const getCountryList = (country) => {
  const countryName = country.region;
  return countryName;
};

//Sort list
function sortList() {
  var list, i, switching, b, shouldSwitch;
  list = document.getElementById("results");
  switching = true;
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    b = list.getElementsByTagName("li");
    // Loop through all list items:
    for (i = 0; i < b.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Check if the next item should
      switch place with the current item: */
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        /* If next item is alphabetically lower than current item,
        mark as a switch and break the loop: */
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark the switch as done: */
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

// getCountryList & adToDom
const addDataToDom = (country) => {
  // Create HTML Elements
  const listItem = document.createElement("li");
  const list = document.getElementById("results");
  // Get name and make text node
  var region = getCountryList(country);
  var textNode = document.createTextNode(region);
  // Stick together
  listItem.appendChild(textNode);
  list.appendChild(listItem);
};

// showCountrylist
const showCountrylist = async () => {
  const countryS = getAllData;
  countryS.map((country) => {
    sortList();
    addDataToDom(country);
  });
};

// Remove all
const remove = () => {
  let element = document.getElementById("results");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

// Event by clicking on Country List
document.getElementById("countryList").addEventListener("click", () => {
  remove();
  showCountrylist();
});

//Old credit cards - 4 points

//Get date today month in numbers
const getMMToday = (date) => {
  var now = new Date();
  const month = now.getMonth(date); // nu is het december = '11'
  const monthNumber = parseInt(month, 10); // maak van het eerste in de string een nummer (10 is een vast getal) = 11
  const monthToday = monthNumber + 1; // javascript begint te tellen bij 0 - Januari is maand 0 - om dit gelijk te trekken + 1
  return monthToday; //12
};

//Get date today year in numbers
const getYYToday = (date) => {
  var now = new Date();
  const year = now.getUTCFullYear(date);
  const yearNumber = parseInt(year, 10);
  const yearToday = yearNumber - 2000;
  return yearToday; //21
};

//Get data today to Compare YYMM in Number
const getYYMM = (date) => {
  const YYMM = getYYToday(date) * 100 + getMMToday(date);
  return YYMM;
};

//Get maximum number to Compare YYMM
const getmaxYYMM = (date) => {
  const maxYYMM = getYYMM(date) + 100;
  return maxYYMM;
};

//Get expiration date from card in YYMM
const getexpYYMM = (cards) => {
  const cardsInfo = cards.credit_card.expiration; // "1/22"
  matches = cardsInfo.match(/\d+/g);
  var i = 0;
  const month = matches[0]; //"1"
  const year = matches[1]; // "22"
  const expMonth = parseInt(month, 10); //1
  const expYear = parseInt(year, 10); //22
  const expYYMM = expYear * 100 + expMonth; //2201
  return expYYMM; // 2201
};

// Get Data Creditcard
const getOldCreditCards = (cards) => {
  const information =
    "CardExpirationDate" +
    " " +
    "yymm:" +
    " " +
    getexpYYMM(cards) +
    " " +
    "Name:" +
    " " +
    cards.name +
    " " +
    cards.surname +
    " " +
    "Phone:" +
    cards.phone +
    " " +
    "CardNumber:" +
    " " +
    cards.credit_card.number;
  if (
    cards.age >= 18 && // 18 jaar en ouder
    getexpYYMM(cards) <= getmaxYYMM(cards) && // expired date < 1 year from today
    getexpYYMM(cards) >= getYYMM(cards) // expired date later than today (not expired yet)
  )
    return information;
  {
  }
};

// getCardsList & adToDom
const addCardsInfoToDom = (cards) => {
  // Create HTML Elements
  const listItem = document.createElement("li");
  const list = document.getElementById("results");
  // Get name and make text node
  var expired = getOldCreditCards(cards);
  if (expired !== undefined) {
    var textNode = document.createTextNode(expired);
    // Stick together
    listItem.appendChild(textNode);
    list.appendChild(listItem);
  }
};

// showExpiredCardlist
const expiredCardlist = async () => {
  const cardList = getAllData;
  cardList.map((cards) => {
    sortList();
    addCardsInfoToDom(cards);
  });
};

// Event by clicking on Credit Cards
document.getElementById("oldCreditCards").addEventListener("click", () => {
  remove();
  expiredCardlist();
});
