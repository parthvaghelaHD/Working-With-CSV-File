const csv = require('csv');
const process = require('process');
const Table = require('cli-table');
const Obj = csv();
const fun = require('./modules/functions')
/*  Task :
	
	Q1 : - Find total number of train from datasets
	Q2 : - find a train with longest distance
	Q3 : - find a train with smallest distance
	Q4 : - Group dataset by isl number
	Q5 : - Find a train by maximum no of stop.
	Q6 : - Find a train with minimum no of stop.
	Q7 : - Find minimal route for station1 to station2 by minimum distance?

*/


// To creating table with Header & its Column Width
const table = new Table({
   head: ['Train No.', 'train Name', 'islno,station Code', 'Station Name', 'Arrival time', 
   'Departure time', 'Distance', 'Source Station Code', 'source Station Name', 'Destination station Code', 
   'Destination Station Name']
   , colWidths: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
});

const myData = [],finalDitance = [], distance = [],  trainStop = [], stopLength = [], findTrain = [];
// using MyCSV function to every data convert into array
function MyCSV(data0, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11) 
{
  this.trainno = data0,
  this.trainname = data1,
  this.islno = data2,
  this.stationCode = data3,
  this.stationName = data4,
  this.arrivaltime = data5,
  this.departureTime = data6,
  this.distance = data7,
  this.sourceStationCode = data8,
  this.sourceStationName = data9,
  this.destinationStationCode = data10,
  this.destinationStationName = data11
}
// for Push all of the data into cli-table
function Display(array) {
  for (let i = 0; i < array.length; i++) {
    table.push(Object.values(array[i]));
  }
}
//Remove dulpicate values from array
function getUnique(array) {
  const uniqueArray = [];
  for(let value of array) {
    if(uniqueArray.indexOf(value) === -1) {
      uniqueArray.push(value);
    }
  }
  return uniqueArray;
}
// groupBy Data with isl no,
const groupBy = function (xs, key) {
   return xs.reduce(function (rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
   }, {});
};
// Group by train_name & 
const TraingroupBy = function (xs, key) {
  return trainStop.push(xs.reduce(function (rv, x) {
    let cnt = 0;
    (rv[x[key]] = rv[x[key]] || []).push(cnt = cnt + 1);
    return rv;
   	}, {}));
};
// To find a distance 
function Distance(arrayDistance) {
  arrayDistance.forEach((items) => {
    distance.push(items.distance);
  });
  finalDistance = distance.slice(1).map(function (x) {
    return parseInt(x, 10);
  });
}
// convert into Stringify
function maxDistance(arrMaxDistance) {
  console.log(JSON.stringify(arrMaxDistance));
}
// convert into Stringify
function minDistance(arrMinDistance) {
  console.log(JSON.stringify(arrMinDistance));
}

function findRoute (station1, station2){
	for (let i=0; i< myData.length; i++){
		if (myData.sourceStationName === myData.destinationStationName){
			console.log("SAME DESTINASION")
		} else {
			console.log('enter valid Data')
		}
	}	
}

function trainData() {
  Obj.from.path('isl_wise_train_detail_03082015_v1.csv').to.array(function (data) {
		for (let index = 0; index < data.length; index++) {
      myData.push(new MyCSV(data[index][0], data[index][1], data[index][2],
        data[index][3], data[index][4], data[index][5],
        data[index][6], data[index][7], data[index][8],
        data[index][9], data[index][10], data[index][11]));
			}
			switch(Number(process.argv[2])){
				case 1:
					myData.forEach(items => {
						 findTrain.push(items.trainname);
					});         
					console.log("Total number of Trains : " + getUnique(findTrain));
					Display(myData);
					console.log(table.toString());
					break;
				case 2:
					Distance(myData);
					console.log('Maximum Distance Is : ' + Math.max.apply(Math, finalDistance)) 
					break;
				case 3:
					Distance(myData);
					console.log('Minimum Distance Is : ' + Math.min.apply(Math, finalDistance))
				case 4:
					for (let i = 1; i <= 8; i++) {
						console.log(groupBy(myData, 'islno')[i]);
				 	}
				 	break;
				case 5:
					TraingroupBy(myData, 'trainname');
					Object.keys(trainStop[0]).forEach(ele => 
						{
							stopLength.push(trainStop[0][ele].length);
						});
					console.log(myData[stopLength.indexOf(Math.max.apply(Math, stopLength))],
            "Maximum Stops:" + Math.max.apply(Math, stopLength));
					break;
				case 6:
					TraingroupBy(myData, 'trainname');
					Object.keys(trainStop[0]).forEach(ele => {
						stopLength.push(trainStop[0][ele].length);
					});
          console.log(myData[stopLength.indexOf(Math.min.apply(Math, stopLength))],
            	"Minimum Stops:" + Math.min.apply(Math, stopLength));
					break;
					
				case 7:
					findRoute(process.argv[2], process.argv[3])
					break;
				default:
					console.log("Please Enter a Valid Number Of Choice...!");
	 }
	})
}
trainData();