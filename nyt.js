//Global Variables
//==================================================================================

//Functions
//==================================================================================
function nyApiQuery(searchTerm, startYear, endYear) {

//ajax and div creation
//----------------------------------------------------------------------------------

			var queryObj = $.param({
				'q': searchTerm,
				'begin_date' : startYear,
				'end_date': endYear,
				'api-key': "b9f91d369ff59547cd47b931d8cbc56b:0:74623931"
			})
			var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + queryObj;
				
			$.ajax({
			    url: queryURL,
			    method: 'GET',
			})

				.done(function(data) {
					console.log(data)
					// var response = data.response;

				 //    for (var i = 0; i < 10; i++){
				 //    	var articles = $("<div class='panel-body border' id=''>");
				 //    	$("#TopArticles").append(articles);

					// // console.log(data.response.docs[i].pub_date);
					// console.log(data.response.docs[i].section_name);
					// console.log(data.response.docs[i].web_url);	
				 //    }
				})

	}

//Event Handlers
//==================================================================================
$("#search").on("click", function(){
if( $("#searchTerm").val() === "") {
	console.log("please enter something to search")
	// add a warning message under search term
}else{
//input conditionals for query
//----------------------------------------------------------------------------------
	var searchTerm = $("#searchTerm").val();
	//regex to validate Start Range format of yyyy if it does not match a digit or is not in the fmt of yyyy will return a range of yyyy-0000 mm-00 and dd-00, will also return the same if ""
	if ( $("#startYear").val().match(/^\d/) && $("#startYear").val().match(/^(20[1-2][0-9])$/) ) {
	var startYear = $("#startYear").val() + "0000";
	}
		else {
			startYear = "00000000"
		}
	//regex to validate End Range format of yyyy if it does not match a digit or is not in the fmt of yyyy will return a non-ranged yyyy-0000 mm-00 and dd-00, will also return the same if ""
	if ( $("#endYear").val().match(/^\d/) && $("#endYear").val().match(/^(20[1-2][0-9])$/) ) {
	var endYear = $("#endYear").val() + "0000";
	}
		else {
			endYear = "00000000"
		}
	if (startYear > endYear) {
		console.log("starYear has to be before end date")
	}
	//remove id created on if statement<----needs to be created
//nyApiQuery & passing the values of userinput values of searchTerm, startYear, & endYear
//----------------------------------------------------------------------------------
	nyApiQuery(searchTerm, startYear, endYear);
}

});