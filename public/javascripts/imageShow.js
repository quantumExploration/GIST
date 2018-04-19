//show image
//got the url sequence

// Decide the image size:
// -- visual angle
// -- display paper
// -- distance
// -- what is the best size?

function buildUrlObj(imageURL){
	//create the imageURLobj
	var imageURLobj = {};
	for(var i = 0;i < imageURL.length;i++){
		imageURLobj[imageURL[i].imageID] = imageURL[i].url;
	}
	globalImageURLobj = imageURLobj;
	preLoadImage(imageURLobj);
}


//preload image
function preLoadImage(imageURLobj){

	var images = new Array();
	loadedimage = 0;

	//=============check game mode=============
	var imageCount;
	var firstImage;
	var lastImage;
	if(globalWorkerObj.isPracticeMode == 1){
		$('#rightNowLevel').css({'display':'none'});
		imageCount = 28;
		firstImage = 0;
		lastImage = 28;
	}
	else{
	//	var levelnow = parseInt(globalWorkerObj.finishLevel) + 1;
	//	$('#rightNowLevel').css({'display':'block'});
		$('#rightNowLevel').css({'display':'none'});
	//	$('#rightNowLevel').text("Level: "+levelnow + "/17");
		imageCount = 98;
		firstImage = 28;
		lastImage = 126;
		//imageCount = globalSequence[globalWorkerObj.finishLevel].length;
	}

	function imageloadpost(){
		//control the progress bar
		var proportion = ((loadedimage/imageCount).toFixed(2) * 70).toFixed(0);
		$(".block-box").css({'display':'none'});
		$(".warning-box").css({'display':'none'});
		$(".summary-box").css({'display':'none'});
		$(".practice-box").css({'display':'none'});
		$(".game-box").css({'display':'none'});
		$(".loading").css({'display':'block'});
		$('.shader').css({'width':proportion + "%"});
		loadedimage++;
		if(loadedimage == imageCount){
			$('.shader').css({'width':'70%'});
			//initialize the vigilance variable
			globalVigilance.nonRepeatIndex = new Array();
			globalVigilance.cursor = 0;
			getVigilance();//globalWorkerObj.finishLevel);
			//go to ready to page()
			readyGame();
		}
	}

	for(var i = firstImage;i < lastImage;i++){
        var imageDistribution;
        if(globalSequence[i][5] == 0){
            imageDistribution = 'R';
        }
        else{
            imageDistribution = 'D';
        }
		var imageID = imageDistribution + globalSequence[i][4]+globalSequence[i][0]+globalSequence[i][1];
		images[i] = new Image()
		images[i].src = imageURLobj[imageID];
		images[i].onload = function(){
			imageloadpost();
		}
		images[i].onerror = function(){
			//console.log(i);
			//console.log(i,globalSequence[globalWorkerObj.finishLevel][i][0]);
			imageloadpost();
		}
	}


}

//before game
function readyGame() {

    $(".loading").css({'display': 'none'});
    $(".game-box").css({'display': 'block'});
    $(".imageContainer").css({'display': 'none'});
    $(".header-instructions").text("Instructions");

    //before instruction set up
    var practiceInstruction;
    var realInstruction;
    var time = "5 seconds";
    var space = "space";
    var X = "X";
    var encode;
    var ENCODE;
    var encodeInstructions;
    var encodeImage1 = "/images/4color.png";
    var encodeImage2 = "/images/7texture.png";



    if (globalEncodeIndex == 1) {
        encode = "colors of cylinders";
        encodeInstructions = "For example, there are 4 and 7 different colors in the following two images.";
		encodeImage1 = "/images/4color.png";
		encodeImage2 = "/images/7color.png";
    }
    else if (globalEncodeIndex == 2) {
        encode = "textures of cylinders";
        encodeInstructions = "\"Texture\" in the game means the percentage of black color on the side surface of a cylinder. " +
			"For example, there are 4 and 7 different textures in the following two images.";
		encodeImage1 = "/images/4texture.png";
		encodeImage2 = "/images/7texture.png";
    }
    else {
        encode = "outside cylinders";
        encodeInstructions = "In the two co-centric cylinders, only the length of the outside one is relevant to this game. " +
			"For example, there are 4 and 7 different outside cylinders in the following two images.";
		encodeImage1 = "/images/4splitvectors.png";
		encodeImage2 = "/images/7splitvectors.png";
    }


    var practiceInstruction1 = "Dear participant, welcome to our practice test! \n" +
        "<br>" +
        "<br>" +
        "In this section, a stream of images (28 images totally) will be presented on the screen for " + time.bold() + " each. \n" +
        "<br>" +
        "<br>" +
        "Press the " + space.bold() + " bar anytime you see an image has the " + X.bold() + " (X will be given in each image) different " + encode.bold() +
        ". " + 
		encodeInstructions +
		" In this practice, each image will have around 450 cylinders. "

	var practiceInstruction2 = "<br>" +
		"You may exit the practice at any time. Note: when you log back in, you need to retake the test. " +
		"You must pass the test in order to continue the real game, you will have up to three chances to take the practice. \n" +
    	"<br>" +
   	 	"<br>" +
		"Whenever you press the " + space.bold() + " bar, you will get feedback:"
	console.log(encodeImage1);

    realInstruction="Great job! Now you will start the real game. The game will be just like the practice you just played," +
        " except longer and a bit more difficult (<span class=\"boldspan\">98</span> images for <span class=\"boldspan\">1 second</span>  each)." +
        " So, pay attention! " +
		"<br>" +
		"<br>" +
        " You will be paid <span class=\"boldspan\">$0.8</span> in total, which lasts about <span class=\"boldspan\">5</span> minutes." +
		"<br>" +
		"<br>" +
        " Once you finish the game, you will find the reward code that can be used on Amazon Mechanical Turk. " +
        "<br>" +
		"<br>" +
        "<span class=\"boldspan\">Note: </span> " +
        "If you opt out midway through this game, you will need to replay this game when you log in again.\n" +
        "<br>" +
		"<br>" +
        "Press the " + space.bold() + " bar anytime you see an image has the " + X.bold() + " (X will be given in each image) different " + encode.bold() +
        ". " +
        "<br>" +
		"<br>" +
        "Whenever you press the <span class=\"boldspan\">\"space\"</span> bar, you will get <span class=\"boldspan\">feedback</span>:"

	if(globalWorkerObj.isPracticeMode == 1){
		$(".realgame-instructions").css({'display':'none'});
		$(".practice-instructions1").css({'display':'block'});
		$(".practice-instructions1").html(practiceInstruction1);
        $(".practice-instructions2").css({'display':'block'});
        $(".practice-instructions2").html(practiceInstruction2);
        $(".encode-box").css({'display':'block'});
        $('.encodeImage1').attr("src",encodeImage1);
        $('.encodeImage2').attr("src",encodeImage2);
       // $('.enocdeImage1').css({'display':'block'});
       // $('.enocdeImage2').css({'display':'block'});
        $(".encode-box").css({'top':'10%'})
		$(".icon-box").css({'display':'block'});
		$('.icon-box').css({'top':'8%'})
		$('#begingame-button').css({'top':'10%'})
	}
	else{
		//real game instruction
		$(".realgame-instructions").css({'display':'block'});
		$(".realgame-instructions").html(realInstruction);
		var rightnowLevel = parseInt(globalWorkerObj.finishLevel)+1;
		$("#rightNowLevel2").text("(Level "+rightnowLevel+")");
		$(".icon-box").css({'display':'block'});
		$('.icon-box').css({'top':'10%'})
		$(".practice-instructions1").css({'display':'none'});
        $(".practice-instructions2").css({'display':'none'});
		$('#begingame-button').css({'top':'15%'})
		
	}
	$("#begingame-button").css({ 'display': 'block' });
	//register click event to show image
	$('#begingame-button').unbind('click').click(function() {});
	$("#begingame-button").click(function(){
        var instructionString;

        if (globalEncodeIndex == 1) {
            instructionString = "Press the 'Space' bar any time you see an image has 3 different colors";
        }
        else if (globalEncodeIndex == 2) {
            instructionString = "Press the 'Space' bar any time you see an image has 3 different textures";
        }
        else if (globalEncodeIndex == 3) {
            instructionString = "Press the 'Space' bar any time you see an image has 3 different outside cylinders";
        }
        $(".header-instructions").text(instructionString);
		imageShow();
	})
}

function imageShow(){

	//vis107
	//vis881  //extreme image test picture
	$(".realgame-instructions").css({'display':'none'});
	$(".practice-instructions1").css({'display':'none'});
    $(".practice-instructions2").css({'display':'none'});
	$(".icon-box").css({'display':'none'});
    $('.encode-box').css({'display':'none'});
	$("#begingame-button").css({ 'display': 'none' });
	$(".imageContainer").css({'display':'block'});
	$('.shader').css({'width':'0%'});    //reset the progress bar
	$('.progress-bar').css({ 'display': 'block' });
	//$('.header-instructions').text("Press the 'Space' bar any time you see an image you saw before");
	
	//param set-up
	var showTime = 1000;
	var pauseTime = 1400;
	var XTime = 1000;
	var group;
	var index = -1;
	var indexShift = 0;
	var showFeedThread;  //the showFeed time function
	var showImageThread;
	var showXThread;
	var isKeydown = 0;  //if user press the key, then change to 1;
	var isWarning = 0;  //if user failed in vigilance task, then change to 1;
	var lastPage = 0;

	//=============check game mode=============
	var imageCount;
	if(globalWorkerObj.isPracticeMode == 1){
		imageCount = 28;
		indexShift = 0;
		showTime =  5000;
		pauseTime = 1000;
		group = 4;
	}
	else{
		group = 14;
		imageCount = 98;
		indexShift = 28;
		showTime =  2000;
		pauseTime = 1000;
		//imageCount = globalSequence[globalWorkerObj.finishLevel].length;
	}

	//console.log(index);
	//show images
	var _showImage = function() {

		index++;
		
		console.log(index);
        showTime = 5000;

            /*var X;
            if (globalWorkerObj.isPracticeMode == 1) {
                X = Math.floor(index / 4) + 3;
            }
            else {
                X = Math.floor(index / 14) + 3;
            }*/
            if (index >= imageCount - 1) {// - 1){
                //stop show images
                //lastPage = 1;
                clearInterval(showImageThread);
            }
            isKeydown = 0;
			var imageDistribution;
			if(globalSequence[index + indexShift][5] == 0){
				imageDistribution = 'R';
			}
			else{
				imageDistribution = 'D';
			}
            var imageID = imageDistribution + globalSequence[index + indexShift][4].toString() + globalSequence[index + indexShift][0].toString() + globalSequence[index + indexShift][1].toString();
            var src = globalImageURLobj[imageID];
            //console.log(imageID);


            //register the keyboard event
            $(document).on("keydown", function (e) {
                if (e.keyCode == '32') {
                    //record repeat state
                    isKeydown = 1;
                    //we only use warning when we take real game
                    isWarning = recordRepeat(index + indexShift);//,globalWorkerObj.finishLevel);
                    //globalSequence[index][3] = 1;

                }
            })
            //change image
            $('.visImage').attr("src", src);
            //$('.feedbackImage').attr("src",'/images/defult_feedback.png');
            $(".feedbackImage").css({'display': 'none'});
            $(".visImage").css({'display': 'block'});
        /*    var instructionString;

            if (globalEncodeIndex == 1) {
                instructionString = "Press the 'Space' bar any time you see an image has " + X + " different colors";
            }
            else if (globalEncodeIndex == 2) {
                instructionString = "Press the 'Space' bar any time you see an image has " + X + " different textures";
            }
            else if (globalEncodeIndex == 3) {
                instructionString = "Press the 'Space' bar any time you see an image has " + X + " different outside cylinders";
            }

            //index++;
            $('.header-instructions').text(instructionString);//"Press the 'Space' bar any time you see an image has ");
		*/
            //change progress bar
            var proportion = (((index + 1) / imageCount).toFixed(2) * 70).toFixed(0);
            $('.shader').css({'width': proportion + "%"});

	}

	var _showX = function(){
        $(".visImage").css({'display':'none'});
        $(".feedbackImage").css({'display':'none'});

        var X;
        if (globalWorkerObj.isPracticeMode == 1) {
            X = Math.floor((index+1) / 4) + 3;
        }
        else {
            X = Math.floor((index+1) / 14) + 3;
        }
        var instructionString;
        var XString = "<font color=\"red\">"+X+"</font>";

        if (globalEncodeIndex == 1) {
            instructionString = "Press the 'Space' bar any time you see an image has " + XString + " different colors";
        }
        else if (globalEncodeIndex == 2) {
            instructionString = "Press the 'Space' bar any time you see an image has " + XString + " different textures";
        }
        else if (globalEncodeIndex == 3) {
            instructionString = "Press the 'Space' bar any time you see an image has " + XString + " different outside cylinders";
        }

        //index++;
        $('.header-instructions').html(instructionString);//"Press the 'Space' bar any time you see an image has ");
        if (index+1 == imageCount - 1) {// - 1){
            clearInterval(showXThread);
        }
		//$(".task-instructions").css({'display': 'block'});
	}

	//show feedback
	var _showFeedback = function(){	
		//abandon keyboard event.
        console.log(index);
        console.log(imageCount);
		$(document).off("keydown");
		//record non-repeat state
		if(isKeydown == 0){
			//Only use warning when we take real game
			if(index==imageCount)
				isWarning = recordState(index + indexShift-1);
			else
				isWarning = recordState(index + indexShift);//,globalWorkerObj.finishLevel);
		}	
		//change to feedback image
		$(".visImage").css({'display':'none'});
        //$(".task-instructions").css({'display': 'none'});
		$(".feedbackImage").css({'display':'block'});

		if(index == imageCount-1){
			index++;
		}
		else if(index==imageCount){//lastPage == 1){//index == imageCount-1){
			$('.feedbackImage').attr("src",'');  //delete the visImage
			console.log("feedback");
			//if real game
			if(globalWorkerObj.isPracticeMode == 0){
				//update user log
				var userlog = "";
				for(var i = indexShift;i < globalSequence.length; i++){
					console.log(i);
					userlog = userlog + globalSequence[i][0] + ',' + globalSequence[i][1] + ','+globalSequence[i][2]+','+globalSequence[i][3]+','+globalSequence[i][4]+';\n';
// globalSequence[globalWorkerObj.finishLevel][i][3] + ';';
				}
				var performance = computeData(imageCount);//globalWorkerObj.finishLevel,imageCount);
				console.log(performance);
				var historyPerformance = performance.hitRate.toFixed(2);
				//if(parseInt(globalWorkerObj.finishLevel) > 0){
				//	historyPerformance = globalWorkerObj.performance + ',' + historyPerformance;
				//}
				updateUser(globalWorkerObj.WorkerID,userlog,historyPerformance);//globalWorkerObj.finishLevel,historyPerformance);
			}
			else{
				//practice
				var performance = computeData(imageCount);//globalWorkerObj.finishLevel,imageCount);
				//if(performance.hitRate > 0.5 && performance.faRate < 0.3){
				console.log(performance);
				if(performance.hitRate > 0.5 && performance.faRate < 0.3){ //4 targets + 26
						showPractice(1);
                    	globalWorkerObj.practiceTimes = parseInt(globalWorkerObj.practiceTimes)+1;
                    	updateUserPractice(globalWorkerObj.WorkerID,globalWorkerObj.practiceTimes,1);
				}
				else{
					globalWorkerObj.practiceTimes = parseInt(globalWorkerObj.practiceTimes)+1;
					if(globalWorkerObj.practiceTimes < 3){
						//redo
						showPractice(2);
                        updateUserPractice(globalWorkerObj.WorkerID,globalWorkerObj.practiceTimes,0);
					}
					else{
						//block
						updateUserPractice(globalWorkerObj.WorkerID,3,0);
					}

				}
				// passPractice 
				// if(parseInt(globalWorkerObj.passPractice) == 1){
				// 	var performance = computeData(globalWorkerObj.finishLevel,imageCount);
				// 	if(performance.hitRate > 0.5 && performance.faRate < 0.3){
				// 		showPractice(1);
				// 	}
				// 	else{
				// 		showPractice(2);					
				// 	}
				// }
				// else{
				// 	var performance = computeData(globalWorkerObj.finishLevel,imageCount);
				// 	if(performance.hitRate > 0.5 && performance.faRate < 0.3){
				// 		//console.log("pass");
				// 		globalWorkerObj.passPractice = 1;
				// 	}
				// 	else{
				// 		globalWorkerObj.practiceTimes = parseInt(globalWorkerObj.practiceTimes) + 1;					
				// 	}
				// 	updateUserPractice(globalWorkerObj.WorkerID,globalWorkerObj.practiceTimes,globalWorkerObj.passPractice);
				// }												
			}			
			//stop show feedback
			clearInterval(showFeedThread);
		}	
	}

	//show add1s and add2s
	var showXThread = setInterval(_showX, showTime+XTime+pauseTime);

    var _add1s = function(){
        showFeedThread = setInterval(_showFeedback,showTime+XTime+pauseTime);
    }

	var _add2s = function() {
        showImageThread = setInterval(_showImage, showTime + XTime + pauseTime);
    }

    setTimeout(_add2s, XTime);
	setTimeout(_add1s, showTime+XTime);
}

//state: 1: filler hits, 2: filler miss 3. filler false alarm 4. filler correct rejection
//state: 5: target hits, 6: target miss 7. target false alarm 8. target correct rejection
//record the user repeat action
function recordRepeat(index){
	//,level){

	var isWarning = 0;
	
    globalSequence[index][3] = 1;
	//console.log(index);
	
	if(globalSequence[index][0] == globalSequence[index][2]){
		$('.feedbackImage').attr("src",'/images/correct.png');
	}
	else {
		$('.feedbackImage').attr("src",'/images/false.png');
	}
/*

	//if participant see this image for first time
	if(globalSequence[index][2] == 0){
                globalSequence[index][3] = 1;
		//check vigilance
	//	globalVigilance.cursor++;
	//	if(globalVigilance.cursor >= 30){
	//		isWarning = checkWarning(globalVigilance.cursor,globalWorkerObj.finishLevel);
		}
	}
	else{
		$('.feedbackImage').attr("src",'/images/correct.png');
		//if participant see this image for second time
		if(globalSequence[level][index][2] == 0){
			//filler hits
			globalSequence[level][index][3] = 1;
		}
		else{
			//target hits
			globalSequence[level][index][3] = 5;
		}
	}
*/
	return isWarning;
}

//record the user other state
function recordState(index){//,level){

	var isWarning = 0;
    //    globalSequence[index][3] = 1;
	if(globalSequence[index][0] == globalSequence[index][2]){
		$('.feedbackImage').attr("src",'/images/false.png');
	}
	else {
		$('.feedbackImage').attr("src",'/images/correct.png');
	}
/*	
	//if participant see this image for first time
	if(globalSequence[level][index][1] == 0){
		//whether this image is a target image
		if(globalSequence[level][index][2] == 0){
			//filler correct rejection
			globalSequence[level][index][3] = 4;
		}
		else{
			//target correct rejection
			globalSequence[level][index][3] = 8;
		}
		//check vigilance
		globalVigilance.cursor++;
		if(globalVigilance.cursor >= 30){
			isWarning = checkWarning(globalVigilance.cursor,globalWorkerObj.finishLevel);
		}
	}
	else{
		//if participant see this image for second time
		if(globalSequence[level][index][2] == 0){
			//filler miss
			globalSequence[level][index][3] = 2;
		}
		else{
			//target miss
			globalSequence[level][index][3] = 6;
		}
	}
**/
	return isWarning;
}

function getVigilance(){//level){
	//list all repeat fillers
	for(var i = 0; i < globalSequence.length; i++){
		//vigilance task: filler repeat
		// if(globalSequence[level][i][1] == 1 && globalSequence[level][i][2] == 0){
		// 	globalVigilance.vigilanceIndex.push(globalSequence[level][i][0]);
		// }
		if(globalSequence[i][0] != globalSequence[i][2]){
			globalVigilance.nonRepeatIndex.push(i);
		}
	}
}


function checkWarning(cursor){//,level){
	var isWarning = 0;

	var start = cursor - 30;
	var faCount = 0;
	for(var i = start; i < cursor; i++){
		var imageID = globalVigilance.nonRepeatIndex[i];
		if(globalSequence[level][imageID][3] == 3 || globalSequence[level][imageID][3] == 7){
			faCount++;
		}
	}
	if((faCount / 30).toFixed(2) > 0.5){
		//showWarning();
		isWarning = 1;
	}
	return isWarning;
}























