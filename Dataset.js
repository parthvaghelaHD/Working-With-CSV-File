const Table = require('cli-table')
const process = require('process')
const fs = require('fs');
const csv = require('csv');
const obj = csv();

let myData = [], distance = [], GroupByData = [], totalTrain = [], findTrain = [], trainStop = [], stopLength = [];


// var table = new Table({
//     head: ['Train Number', 'Train name', 'islno', 'station Code', 'Station Name', 'Arrival time', 'Departure time', 'Distance', 'Source Station Code', 'source Station Name', 'Destination station Code', 'Destination Station Name']
//     , colWidths: [10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10]
// });

function MyCSV(Fone, Ftwo, Fthree, Ffour, Ffive, Fsix, Fseven, Feight, Fnine, Ften, Feleven) {
    this.Train_No = Fone;
    this.Train_name = Ftwo;
    this.islno = Fthree;
    this.station_code = Ffour;
    this.station_Name = Ffive;
    this.Arrival_time = Fsix;
    this.Deprature_time = Fseven;
    this.Distanceoftrain = Feight;
    this.Source_station_code = Fnine;
    this.Destination_station_code = Ften;
    this.Destination_station_name = Feleven;
    // table.push([Fone, Ftwo, Fthree, Ffour, Ffive, Fsix, Fseven, Feight, Fnine, Ften, Feleven])
}

// Find Min Max Length of Distance

obj.from.path('./isl_wise_train_detail_03082015_v1.csv').to.array(function (data) {

    for (var index = 0; index < data.length; index++) {
        myData.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], data[index][10], data[index][11]
        ))
    };
    // console.log(table.toString());   

    myData.forEach((items) => {
        distance.push(items.Distanceoftrain)
    })

    myData.forEach((items) => {
        findTrain.push(items.Train_No)
    })

    function DisplayData(array) {
        for(let i=0;i<array.length;i++){
            Table.push(Object.values(array[i]))
        }
    }


    let final = distance.slice(1).map(function (x) {
        return parseInt(x, 10)
    });


    console.log('Maximum Distance Is : ' + Math.max.apply(Math, final))
    console.log('Minimum Distance Is : ' + Math.min.apply(Math, final) + '000')

    // Romove Duplication Of array !! Qustn: 1

    function getUnique(array) {
        let uniqueArray = [];
        // Loop through array values

        for (let value of array) {

            if (uniqueArray.indexOf(value) === -1) {
                uniqueArray.push(value);
                // console.log(uniqueArray)   
            }
        }
        return uniqueArray;
        // console.log(uniqueArray)
    }


    let uniqueNames = getUnique(findTrain);
    // console.log(uniqueNames)

    console.log("Total number of Trains : " + uniqueNames.length);



    //GroupBy DataSet Question : 3
    let groupBy = function (xs, key) {
        return xs.reduce(function (rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    for (let j = 1; j <= 8; j++) {
        console.log(groupBy(myData, 'islno')[j]);
    }


    var groupByTrain = function (xs, key) {
        return trainStop.push(xs.reduce(function (rv, x) {
            let cnt = 0;
            (rv[x[key]] = rv[x[key]] || []).push(cnt = cnt + 1);
            return rv;
        }, {}));
    };

    groupByTrain(myData, 'Train_name');
    Object.keys(trainStop[0]).forEach(items => {
        stopLength.push(trainStop[0][items].length);
    });

    console.log(myData[stopLength.indexOf(Math.max.apply(Math, stopLength))], "       Maximum Stops:" + Math.max.apply(Math, stopLength));

    console.log('\n');

    console.log(myData[stopLength.indexOf(Math.min.apply(Math, stopLength))], "       Minimum Stops:" + Math.min.apply(Math, stopLength));
});
