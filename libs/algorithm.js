////////////////////////////////////////////////////////////////////////
//                             Functions                              //
////////////////////////////////////////////////////////////////////////

function makeLotteryBalls(restaurant){
  return Math.floor( Math.pow(restaurant.review_count, (restaurant.rating - 1) / 3 ) );
}

function giveMeTen(apiCall){
  var lotteryballs = [];
  var numOfBalls = 0;
  var tenRestaurants = [];

  // Fills an array of ball amounts for later verification
  for(var i = 0; i < apiCall.length; i++){
    numOfBalls += makeLotteryBalls(apiCall[i])
    lotteryballs.push( numOfBalls )
  }

  // Works until there's ten restaurants
  while(tenRestaurants.length < 10){
    var randNumber = Math.floor(Math.random() * numOfBalls);

    // Matches the randNumber with the appropriate restaurant and skips
    // that restaurant if it has already been choosen
    for(var i = 0; i < apiCall.length; i ++){
      if(lotteryballs[i] > randNumber){
        // Could be replaced with a contains method
        var inArray = false
        if(tenRestaurants.length > 0){
          for(var j = 0; j < tenRestaurants.length; j++){
            if(tenRestaurants[j] == apiCall[i].name) inArray = true;
          }
        }
        // If its a good one, push to the array of ten and break to
        // restart the while loop
        if(!inArray){
          tenRestaurants.push(apiCall[i]);
          apiCall[i].testCount ++;
        }
        break;
      }
    }

  }
  return tenRestaurants
}

module.exports = { pickOptions: giveMeTen }

////////////////////////////////////////////////////////////////////////
//                             Test Data                              //
////////////////////////////////////////////////////////////////////////

var sampleSetRestaurants50 = [
  {
    name: "one",
    rating: 5,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "two",
    rating: 4.5,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "three",
    rating: 4,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "four",
    rating: 3.5,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "five",
    rating: 3,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
//////////////////////
  {
    name: "six",
    rating: 2.5,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "seven",
    rating: 2,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "eight",
    rating: 1.5,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "nine",
    rating: 1,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "ten",
    rating: 1,
    review_count: 5,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
////////////////////////////////////////////
  {
    name: "eleven",
    rating: 5,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twelve",
    rating: 4.5,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirteen",
    rating: 4,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "fourteen",
    rating: 3.5,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "fifteen",
    rating: 3,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
//////////////////////
  {
    name: "sixteen",
    rating: 2.5,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "seventeen",
    rating: 2,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "eighteen",
    rating: 1.5,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "nineteen",
    rating: 1,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty",
    rating: 2,
    review_count: 35,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
////////////////////////////////////////////
  {
    name: "twenty one",
    rating: 5,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty two",
    rating: 4.5,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty three",
    rating: 4,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty four",
    rating: 3.5,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty five",
    rating: 3,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
//////////////////////
  {
    name: "twenty six",
    rating: 2.5,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty seven",
    rating: 2,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty eight",
    rating: 1.5,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "twenty nine",
    rating: 1,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty",
    rating: 1,
    review_count: 105,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
////////////////////////////////////////////
  {
    name: "thirty one",
    rating: 5,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty two",
    rating: 4.5,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty three",
    rating: 4,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty four",
    rating: 3.5,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty five",
    rating: 3,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
//////////////////////
  {
    name: "thirty six",
    rating: 2.5,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty seven",
    rating: 2,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty eight",
    rating: 1.5,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "thirty nine",
    rating: 1,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty",
    rating: 1,
    review_count: 255,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
////////////////////////////////////////////
  {
    name: "forty one",
    rating: 5,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty two",
    rating: 4.5,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty three",
    rating: 4,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty four",
    rating: 3.5,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty five",
    rating: 3,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
//////////////////////
  {
    name: "forty six",
    rating: 2.5,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty seven",
    rating: 2,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty eight",
    rating: 1.5,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "forty nine",
    rating: 1,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  },
  {
    name: "fifty",
    rating: 1,
    review_count: 505,
    previousHits: 0,
    sponsered: false,
    testCount: 0
  }
////////////////////////////////////////////
]

////////////////////////////////////////////////////////////////////////
//                              Testing                               //
////////////////////////////////////////////////////////////////////////

function run100000Times(){
  for(var i = 0; i < 100000; i++){
    giveMeTen(sampleSetRestaurants50);
  }

  sampleSetRestaurants50.sort(function(a,b){
    return b.testCount - a.testCount;
  })

  for(var i = 0; i < sampleSetRestaurants50.length; i++){
    console.log("(rating: " + sampleSetRestaurants50[i].rating + ", num of reviews: " + sampleSetRestaurants50[i].review_count + "): " + sampleSetRestaurants50[i].testCount / 1000 + "% of events");
  }
}

// console.log(giveMeTen(sampleSetRestaurants50));
// run100000Times();
