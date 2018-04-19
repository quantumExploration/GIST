// used to generate the image sequence
// Regular study: 
// 7 * 4 (practice) + 7 * 14(real game)
// The first images are for practice
// The second images are for real game

// Experiment Study Setup
//  Increase the difficulties
//  The equality of each power

function generateGamesquence(){
	//define experiment parameter
    var powerGroup = 7;
    var powerPerGroup = 40;
    var totalCount = powerGroup * powerPerGroup;

    var practicePerGroup = 4;
    var practicePerPower = 4;
    var practiceCount = powerGroup * practicePerGroup;

    var realPerGroup = 14;
    var realPerPower = 14;
    var realPowerPerGroup = 2;
    var realCount = powerGroup * realPerGroup;

    var minPower = 3;

    var orderPerPower = new Array();
    for(var i=0;i<powerGroup;i++){
        var orderArr = getRandomSequence(powerPerGroup, practicePerPower+realPerPower);
        orderPerPower.push(orderArr);
    }
    //console.log(orderPerPower);

    var realOrderPerGroup = new Array();
    for(var i=0;i<powerGroup;i++){
        var orderArr = getRandomSequence(realPerGroup, realPerGroup);
        realOrderPerGroup.push(orderArr);
    }
    //console.log(realOrderPerGroup);

    //[group, index]
    var practiceOrderPerGroup = [
        //[ [0,0], [0,1], [1, 2], [2, 3]],
        //[ [1,0], [1,1], [2, 2], [3, 3]],
        //[ [2,0], [2,1], [3, 2], [4, 3]],
        //[ [3,0], [3,1], [4, 2], [5, 3]],
        //[ [4,0], [4,1], [5, 2], [6, 3]],
        //[ [5,0], [5,1], [6, 2], [0, 3]],
        //[ [6,0], [6,1], [0, 2], [1, 3]]
        [ [0,0], [0,1], [1, 2], [2, 3]],
        [ [1,1], [1,3], [2, 1], [3, 0]],
        [ [2,2], [2,0], [3, 1], [4, 2]],
        [ [3,3], [3,2], [4, 3], [5, 0]],
        [ [4,0], [4,1], [5, 2], [6, 3]],
        [ [5,1], [5,3], [6, 1], [0, 3]],
        [ [6,2], [6,0], [0, 2], [1, 0]]
    ];

    var imageInfoArr = new Array();
    //1 : color; 2: texture; 3: splitvectors
    var encodeIndex = Math.floor(Math.random()*3) + 1;
    var distributionIndex = Math.floor(Math.floor(Math.random()*5) % 2);


    for(var i=0;i<powerGroup;i++) {
        for (var j = 0; j < practicePerPower + realPerPower; j++) {
            imageInfoArr.push([0,0,0,0,0,0]);
        }
    }
    for(var i=0;i<powerGroup;i++){
        for(var j=0;j<practicePerPower;j++){
            var imageIndex = orderPerPower[i][j];
            var arrayIndex = practiceOrderPerGroup[i][j];
            var index = arrayIndex[0] * practicePerGroup + arrayIndex[1];
            imageInfoArr[index][0] = i + minPower;
            imageInfoArr[index][1] = imageIndex + 1;
            imageInfoArr[index][2] = arrayIndex[0] + minPower;
            imageInfoArr[index][4] = encodeIndex;
            imageInfoArr[index][5] = distributionIndex;
        }
        for(var j=0;j<realPerPower;j++){
            var imageIndex = orderPerPower[i][j+practicePerPower];
            var groupIndex = Math.floor(j/realPowerPerGroup);
            var arrayIndex = Math.floor(j%realPowerPerGroup) + realPowerPerGroup * i;
            var tmpIndex = realOrderPerGroup[groupIndex][arrayIndex];
            var index = practiceCount + (groupIndex * realPerGroup + tmpIndex);
            //console.log(imageIndex);
            //console.log(groupIndex);
            //console.log(arrayIndex);
            //console.log(tmpIndex);
            //console.log(index);
            imageInfoArr[index][0] = i + minPower;
            imageInfoArr[index][1] = imageIndex + 1;
            imageInfoArr[index][2] = groupIndex + minPower;
            imageInfoArr[index][4] = encodeIndex;
            imageInfoArr[index][5] = distributionIndex;
        }
    }

    //console.log(imageInfoArr);
    return imageInfoArr;
    /*

    var practiceCount = 21;
    var particeFillerCount = 14;
    var practiceTargetCount = 7;
    var realCount = 98;
    var realFillerCount = 14;
    var realPowerCount = 14;
    var practicePowerCount = 3;
    var realTargetCount = 84;
	var totalImageCount = 280;
	var encodeIndex = 1;//1:color; 2:texture; 3:splitvector
    var powerCount = 7;

    var imageInfoArr = new Array();
    for(var i=0;i<selectImageCount;i++){
        var levelArr = new Array(0, 0, 0, 0, 0);
        imageInfoArr.push(levelArr);
    }
    var index = 0;
    //practice image
    for(var i=0;i<powerCount;i++){
        var numCount = 40;
        var imageArr = getRandom(numCount, 0, practiceLevelCount);
        var targetArr = getRandom(practiceLevelCount, 0, 1);
        for(var j=0;j<levelCount;j++){
            imageInfoArr[index]b
        }
    }

	//generate non-repeating random number, the range is the number of all images
	var imageArr = getRandom(fillerCount + targetCount, 0, totalImageCount-1);
	console.log(imageArr);
	//var encodeIndex = Math.floor(Math.random() * 3)+1;
    var imageInfoArr = new Array();
    for(var i=0;i<selectImageCount;i++){
           var power = imageArr[i]/40;
           var digitIndex = imageArr[i]%40+1;
           var powerIndex = 3+Math.floor(imageArr[i]/40);

//power, digit, X, answer, encode
            var levelArr = new Array(powerIndex, digitIndex, 0, 0, encodeIndex);
           imageInfoArr.push(levelArr);
    }
      
    var targetArr = getRandom(practiceCount, 0, practiceCount-1);
    for(var i=0;i<practiceTargetCount;i++) {
        imageInfoArr[targetArr[i]][2] = imageInfoArr[targetArr[i]][0];
    }
    var targetArr2 = getRandom(realCount,0,realCount-1);
    for(var i=0;i<realTargetCount;i++){
        var index = targetArr2[i] + practiceCount;
        imageInfoArr[index][2] =  imageInfoArr[index][1];
    }
    for(var i=0;i<selectImageCount;i++){
           if(imageInfoArr[i][2]==0){
               var X = Math.floor(Math.random() * 7) + 3;
               if(X == imageInfoArr[i][0]){
                   if(X>3) imageInfoArr[i][2] = X - 1;
                   else imageInfoArr[i][2] = X + 1;
               }
               else{
                   imageInfoArr[i][2] = X;
               }
           }
    }
	return imageInfoArr;
    */
}
