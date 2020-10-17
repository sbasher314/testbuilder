// Given a credit card number, this function should return a string with the
// name of a network, like 'MasterCard' or 'American Express'
// Example: detectNetwork('343456789012345') should return 'American Express'

// How can you tell one card network from another? Easy!
// There are two indicators:
//   1. The first few numbers (called the prefix)
//   2. The number of digits in the number (called the length)

var detectNetwork = function(cardNumber) {

  function Network(name, prefixArray, cardLength) {
    this.name = name;
    this.prefixes = prefixArray;
    this.length = cardLength;
    return this;
  }

  var networks = [
    new Network("Visa", [4], [13, 16, 19]),
    new Network("MasterCard", [51,52,53,54,55],[16]),
    new Network("Diner's Club", [38,39], [14]),
    new Network("American Express", [34, 37], [15]),
  ];

  var prefix = cardNumber.substr(0,2);
  var cardLength = cardNumber.length;

  //Special Case for Visa
  var visaIndex = networks.findIndex(function(item) {return item.name === "Visa"});
  if(cardNumber.substr(0,1) === '4' && networks[visaIndex]['length'].includes(cardLength)) {
    return "Visa";
  }

  // Iterate through all networks
  for (var i = 0; i<networks.length; i++) {
    var network = networks[i];
    if(network.prefixes.includes(parseInt(prefix))) {
      if (network.length.includes(cardLength)) {
        return network.name;
      }
    }
  }
  console.log("Card Network not Detected");
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.
};



