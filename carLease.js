// variables
let option, val, totalPrice, currentLeasePeriod, currentCarPrice;
let maxCarValue = 200000;
let minCarValue = 10000;
let maxDownPayment = 50;
let minDownPayment = 10;
let currentInterestRate;
let currentMonthlyInstallment;
let currentDownPayment;
let currentTotalCost;
// selectors
const inputCar = document.querySelector(".inputCar");
const rangeCar = document.querySelector(".carValueRange");
const leasePeriodSelect = document.querySelector(".leaseSelect");
const inputPayment = document.querySelector(".inputPayment");
const rangeDownPayment = document.querySelector(".downPayment");
const carSelect = document.querySelector(".carSelect");
const totalCost = document.querySelector(".totalCost");
const downPayment = document.querySelector(".downPaymentSpan");
const monthlyInstallment = document.querySelector(".monthlyInstallment");
const interestRate = document.querySelector(".interestRate");

// functions
const fillLease = () => {
  //fill for leasing months
  for (let i = 12; i <= 60; i += 12) {
    option = document.createElement("option");
    option.value = i;
    option.innerHTML = i;
    leasePeriodSelect.appendChild(option);
  }
};
//updating inputs after changing range
const rangeIntoInput = (e, input) => {
  input.value = e.currentTarget.value;
};
//validation for values if they are out of borders
//max price when it is over limit, min price when it is below limit
//when you type some value in input and input loses focus, range get that value
const valuesRangesOverBorders = (e, range, isCar) => {
  val = parseInt(e.currentTarget.value);
  if (isCar) {
    if (val > maxCarValue) e.currentTarget.value = maxCarValue;
    if (val < minCarValue) e.currentTarget.value = minCarValue;
  } else {
    if (val > maxDownPayment) e.currentTarget.value = maxDownPayment;
    if (val < minDownPayment) e.currentTarget.value = minDownPayment;
  }
  updateRange(e, range);
};
//updating range
const updateRange = (e, range) => {
  if (e.currentTarget.value === "" && range === rangeCar) {
    rangeCar.value = minCarValue;
  } else if (e.currentTarget.value === "" && range === rangeDownPayment) {
    rangeDownPayment.value = minDownPayment;
  } else range.value = e.currentTarget.value;
};
//updating interest
const updateInterest = (e) => {
  if (carSelect.value === "new") currentInterestRate = 2.99;
  else currentInterestRate = 3.7;
  interestRate.innerHTML = currentInterestRate;
};
//
const calculateTotalCost = () => {
  return totalCostFinal;
};

//function that updates all the prices when changes occur
const updatePrice = () => {
  if (inputCar.value === "" || inputPayment.value === "") {
    //setting values into 0
    totalCost.innerHTML = 0;
    monthlyInstallment.innerHTML = 0;
    downPayment.innerHTML = 0;
    return;
  }
  let initialCost = parseInt(inputCar.value);

  let downPaymentValue = (initialCost * parseInt(inputPayment.value)) / 100;

  let interestRateValue =
    (initialCost * parseFloat(interestRate.innerHTML)) / 100;

  let totalCostValue = initialCost + downPaymentValue - interestRateValue;
  console.log(totalCostValue);

  const monthlyCost =
    totalCostValue / parseInt(leasePeriodSelect.value) -
    ((initialCost / parseInt(leasePeriodSelect.value)) *
      parseInt(inputPayment.value)) /
      100;
  console.log(monthlyCost);

  currentDownPayment = (parseInt(inputPayment.value) / 100) * initialCost;

  // updating spans
  totalCost.innerHTML = totalCostValue.toFixed(2);
  monthlyInstallment.innerHTML = monthlyCost.toFixed(2);
  downPayment.innerHTML = currentDownPayment.toFixed(2);
};
// function calls
fillLease();
updateInterest();
updatePrice();

// event listeners

//change input number from range input
rangeCar.addEventListener("input", (e) => {
  rangeIntoInput(e, inputCar);
  updatePrice();
});
rangeDownPayment.addEventListener("input", (e) => {
  rangeIntoInput(e, inputPayment);
  updatePrice();
});
//events for inputs when it is off focus
inputCar.addEventListener("blur", (e) => {
  valuesRangesOverBorders(e, rangeCar, true);
  updatePrice();
});
inputPayment.addEventListener("blur", (e) => {
  valuesRangesOverBorders(e, rangeDownPayment, false);
  updatePrice();
});
inputCar.addEventListener("input", (e) => {
  updateRange(e, rangeCar);
  updatePrice();
});
inputPayment.addEventListener("input", (e) => {
  updateRange(e, rangeDownPayment);
  updatePrice();
});
//events for selects when they change
carSelect.addEventListener("change", () => {
  updateInterest();
  updatePrice();
});
leasePeriodSelect.addEventListener("change", () => {
  updatePrice();
});
