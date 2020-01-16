const csv = require('csv');
const process = require('process');
const Table = require('cli-table');
const obj = csv();


let table = new Table({
   head: ['Train No.', 'train Name', 'islno,station Code', 'Station Name', 'Arrival time', 'Departure time', 'Distance', 'Source Station Code', 'source Station Name', 'Destination station Code', 'Destination Station Name']
   , colWidths: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
});

let MyData = [],finalDitance = [], distance = [],  trainStop = [], stopLength = [], findTrain = [];

function MyCSV(data0, data1, data2, data3, data4, data5, data6, data7, data8, data9, data10, data11) {
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

function Display(array) {
   for (let i = 0; i < array.length; i++) {
      table.push(Object.values(array[i]));
   }
}

function getUnique(array) {
   let uniqueArray = [];
   for (let value of array) {
      if (uniqueArray.indexOf(value) === -1) {
         uniqueArray.push(value);
      }
   }
   return uniqueArray;
}

let groupBy = function (xs, key) {
   return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
   }, {});
};

let TraingroupBy = function (xs, key) {
   return trainStop.push(xs.reduce(function (rv, x) {
      let cnt = 0;
      (rv[x[key]] = rv[x[key]] || []).push(cnt = cnt + 1);
      return rv;
   }, {}));
};

function Distance(arrayDistance) {
   arrayDistance.forEach((items) => {
      distance.push(items.distance);
   });
   finalDistance = distance.slice(1).map(function (x) {
      return parseInt(x, 10);
   });
}

function maxDistance(arrMaxDistance) {
   console.log(JSON.stringify(arrMaxDistance));
}

function minDistance(arrMinDistance) {
   console.log(JSON.stringify(arrMinDistance));
}

function trainData() {
   obj.from.path('isl_wise_train_detail_03082015_v1.csv').to.array(function (data) {

      for (let index = 0; index < data.length; index++) {
         MyData.push(new MyCSV(data[index][0], data[index][1], data[index][2],
            data[index][3], data[index][4], data[index][5],
            data[index][6], data[index][7], data[index][8],
            data[index][9], data[index][10], data[index][11]));
      }
      if (process.argv[2] === '1') {
         MyData.forEach(items => {
            findTrain.push(items.trainname);
         });         
         console.log("Total number of Trains : " + getUnique(findTrain));
         Display(MyData);
         console.log(table.toString());
      }
      else if (process.argv[2] === '2') {
         Distance(MyData);
         console.log('Maximum Distance Is : ' + Math.max.apply(Math, finalDistance)) 
      }
      else if (process.argv[2] === '3') {
         Distance(MyData);
         console.log('Minimum Distance Is : ' + Math.min.apply(Math, finalDistance))
      }
      else if (process.argv[2] === '4') {
         for (let i = 1; i <= 8; i++) {
            console.log(groupBy(MyData, 'islno')[i]);
         }
      }
      else if (process.argv[2] === '5') {
         TraingroupBy(MyData, 'trainname');
         Object.keys(trainStop[0]).forEach(ele => {
            stopLength.push(trainStop[0][ele].length);
         });
         console.log(MyData[stopLength.indexOf(Math.max.apply(Math, stopLength))], "Maximum Stops:" + Math.max.apply(Math, stopLength));
      }
      else if (process.argv[2] === '6') {
         TraingroupBy(MyData, 'trainname');
         Object.keys(trainStop[0]).forEach(ele => {
            stopLength.push(trainStop[0][ele].length);
         });
         console.log(MyData[stopLength.indexOf(Math.min.apply(Math, stopLength))], "Minimum Stops:" + Math.min.apply(Math, stopLength));
      }
      else {
         console.log("Please Enter a Valid Number Of Choice...!");
      }
   });
}
trainData();