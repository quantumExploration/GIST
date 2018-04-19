//used to operate the imagedata database

//obtain the url of image from sequence, 120s per times
//input: 120 globalSequence, output 120 url
function getImageUrl(imageSequence){

	//console.log(imageSequence);
	var imageIDArr = "";
	for(var i = 0;i < imageSequence.length;i++){
        var imageDistribution;
        if(imageSequence[i][5] == 0){
            imageDistribution = 'R';
        }
        else{
            imageDistribution = 'D';
        }
		if(i == imageSequence.length-1){
			imageIDArr = imageIDArr + imageDistribution+imageSequence[i][4].toString()+imageSequence[i][0].toString()+imageSequence[i][1].toString();
//imageSequence[i][0].toString();
		}else{
			imageIDArr = imageIDArr + imageDistribution + imageSequence[i][4].toString()+imageSequence[i][0].toString()+imageSequence[i][1].toString() + ',';
		}
		console.log(imageIDArr);
	}
	
	//search imageURL from database
	var imageIDJSON = {'imageID':imageIDArr};
 	$.ajax({
            type: 'POST',
            data: imageIDJSON,
            url: '/images/getImageUrl',
            dataType: 'JSON'
        }).done(function( data ) {
        	buildUrlObj(data.msg);
        });
}

 
