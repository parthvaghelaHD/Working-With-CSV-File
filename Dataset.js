const csv = require('csv');
const fs = require('fs');
const obj = csv();

var myData = [];
let distance = [];
let distance2 = [];
let GroupByData = [];
let totalTrain = [];
let myDataUnique = [];
let findTrain = [];

function MyCSV(Fone, Ftwo, Fthree, Ffour, Ffive, Fsix, Fseven, Feight, Fnine, Ften, Feleven)

            {
                this.FieldOne = Fone;
                this.FieldTwo = Ftwo;
                this.FieldThree = Fthree;
                this.FieldFour = Ffour;
                this.FieldFive = Ffive;
                this.FieldSix = Fsix;
                this.FieldSeven = Fseven;
                this.FieldEight = Feight;
                this.FieldNine = Fnine;
                this.FieldTen = Ften;
                this.FieldEleven = Feleven;
            }


// fs.readFile('./isl_wise_train_detail_03082015_v1.csv', (err, data)=>{

//     // Find a total number Of Trains
//     console.log(data.toString().length);

obj.from.path('./isl_wise_train_detail_03082015_v1.csv').to.array(function (data) {

    for (var index = 0; index < data.length; index++) {
        myData.push(new MyCSV(data[index][0], data[index][1], data[index][2], data[index][3], data[index][4], data[index][5], data[index][6], data[index][7], data[index][8], data[index][9], data[index][10], data[index][11]
        ))
    };

    myData.forEach((items) => {
        distance.push(items.FieldEight)
    })

    myData.forEach((items) => {
        findTrain.push(items.FieldOne)
    })
    // console.log(myData)
//start Distance

    // myData.forEach((items) => {
    //     distance2.push(items.FieldOne)
    // })
// Distance 2 over 


    let final = distance.slice(1).map(function (x) {
        return parseInt(x, 10)
    });

    console.log('Maximum Distance Is : ' + Math.max.apply(Math, final))
    console.log('Minimum Distance Is : ' +  Math.min.apply(Math, final) + '000')

    //GroupBy DataSet Question : 3
    
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
            // console.log('----',rv,x);
          (rv[x[key]] = rv[x[key]] || []).push(x);
        //   console.log('+++++++',rv);
          return rv;
        }, {});
      };

    //   for(let i=0 ; i<= 13, i++)
    // const arr = [
    //     {
    //         a:'x1',
    //         b:'y1',
    //     },
    //     {
    //         a:'x2',
    //         b:'y2',
    //     },
    //     {
    //         a:'x2',
    //         b:'y3',
    //     },
    //     {
    //         a:'x4',
    //         b:'y4',
    //     },
    // ]
    // for(let j=1;j<=7;j++){
         console.log(groupBy(myData,'FieldThree')[1],groupBy(myData,'FieldThree')[2],groupBy(myData,'FieldThree')[3],
         groupBy(myData,'FieldThree')[4],groupBy(myData,'FieldThree')[5],groupBy(myData,'FieldThree')[6]),
         groupBy(myData,'FieldThree')[7]
    // }
     // var yy = GroupByData.push(groupBy(myData,'FieldThree')[3]);
      



    // myData.forEach((items) => {
    //     console.log(items.FieldOne);
    // })
    





// Romove Duplication Of array !! Qustn: 1


    function getUnique(array){
        let uniqueArray = [];
        // Loop through array values

        for(let value of array){

            if(uniqueArray.indexOf(value) === -1){

                uniqueArray.push(value);       
                // console.log(uniqueArray)
            
            }
        }

        return uniqueArray;
        // console.log(uniqueArray)



    }

    var uniqueNames = getUnique(findTrain);
    console.log(uniqueNames)
    console.log(uniqueNames.length);

   
//    var uniqueArray = removeDuplicates(myData, "Train No.");
//    console.log("uniqueArray is: " + JSON.stringify(uniqueArray));


    
    

});
