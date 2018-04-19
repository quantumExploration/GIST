//used to take data analysis
function computeData(imageCount){//level,imageCount){
	
	var performance = new Object();
	var hitCount = 0; //hit count
	var missCount = 0;   //miss count
	var faCount = 0;  //false alarm count 
	var crCount = 0;  //correct rejection count
	var totalRepeat = 0;
	var totalNonRepeat = 0;
	//count performance data.
	for(var i = 0; i < imageCount; i++){
		if(globalSequence[i][3] == 1){
			/*totalNonRepeat++;
			if(globalSequence[i][0] != globalSequence[i][2]
                        && globalSequence[i][3] == 0){
// || globalSequence[level][i][3] == 8){
				crCount++;
			}
			if(globalSequence[i][0] != globalSequence[i][2]
                        && globalSequence[i][3] == 1){
	//		if(globalSequence[level][i][3] == 3 || globalSequence[level][i][3] == 7){
				faCount++;
			}*/
			if(globalSequence[i][0] == globalSequence[i][2]){
				hitCount++;//crCount++;
			}
			else{
				missCount++;//faCount++;
			}
		}
		else{
			/*
			totalRepeat++;
			if(globalSequence[i][0] == globalSequence[i][2]
                        && globalSequence[i][3] == 0){
			//if(globalSequence[level][i][3] == 2 || globalSequence[level][i][3] == 6){
				missCount++;
			}
			if(globalSequence[i][0] == globalSequence[i][2]
                        && globalSequence[i][3] == 1){
		//	if(globalSequence[level][i][3] == 1 || globalSequence[level][i][3] == 5){
				hitCount++;
			}
			*/
			if(globalSequence[i][0] == globalSequence[i][2]){
				faCount++;//crCount++;
			}
			else{
				crCount++;//faCount++;
			}
		}
	}

	performance.hitCount = hitCount;
	performance.missCount = missCount;
	performance.faCount = faCount;
	performance.crCount = crCount;
	//performance.totalRepeat = totalRepeat;
	//performance.totalNonRepeat = totalNonRepeat;
	performance.hitRate = hitCount/(hitCount+missCount);
	performance.faRate = faCount/(faCount+crCount);

	return performance;
}


