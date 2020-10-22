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

  function rangeList(num1, num2) {
    var higher = (num1>num2)?num1:num2;
    var lower  = (num1<num2)?num1:num2;
    var array  = [];
    for(var i = lower; i<=higher; i++) {
      array.push(i);
    }
    return array;
  }

  var networks = [
    new Network("Visa", [4], [13, 16, 19]),
    new Network("Discover", [6011, 644, rangeList(645, 649), 65].flat(), [16, 19]),
    new Network("Maestro", [5018, 5020, 5038, 6304], rangeList(12,19)),
    new Network("MasterCard", rangeList(51,55),[16]),
    new Network("Diner's Club", [38,39], [14]),
    new Network("American Express", [34, 37], [15]),
    new Network("China UnionPay", [rangeList(622126, 622925), 624, 625, 626, rangeList(6282,6288)].flat(), rangeList(16, 19)),
    new Network("Switch", [4903, 4905, 4911, 4936, 564182, 633110, 6333, 6759], [16,18,19])
  ];

  var cardLength = cardNumber.length;

  // Iterate through all networks
  var chosenNetwork;
  for (var i = 0; i<networks.length; i++) {
    var network = networks[i];
    var longestPrefix = 0;
    //Iterate through each prefix in the current network object
    for (var p = 0; p<network.prefixes.length; p++) {
      var prefixTest = network.prefixes[p];
      if(cardNumber.startsWith(prefixTest)) { //compare the current ,prefix and see if the cardNumber starts with it
        if (network.length.includes(cardLength)) { //if the card length is a valid length for the current Network..
          if(prefixTest.toString().length > longestPrefix) {
            chosenNetwork = network;
            longestPrefix = prefixTest.toString().length;
          }
        }
      }
    }
  }
  if(chosenNetwork !== undefined) { return chosenNetwork.name; }
  console.log("Card Network not Detected");
  // Note: `cardNumber` will always be a string
  // The Diner's Club network always starts with a 38 or 39 and is 14 digits long
  // The American Express network always starts with a 34 or 37 and is 15 digits long

  // Once you've read this, go ahead and try to implement this function, then return to the console.
};



