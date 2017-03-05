//Global Variables
//==================================================================================
var numArticle = 0;
var limit = 0;
//Functions
//==================================================================================
function nyApiQuery(numLimit, searchTerm, startYear, endYear) {

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
					console.log(data);
					var response = data.response;
					var convertedDate;
					//assuming the average reading time is ~275wpm.
					var avgWpm = 275;
				
				    for (var i = 0; i < numLimit; i++){
				    	convertedDate = moment(new Date(response.docs[i].pub_date));
				    	var wordCount = response.docs[i].word_count;
				    	var wpmRead = Math.ceil( (wordCount/avgWpm) * 10);
				    	numArticle++;
				    	var articles = $("<div class='panel-body border displayArts'>")
				    		.append( $("<i class='label label-primary divNum'>").text(numArticle) )
				    		.append( $("<p class='wpm'>").text( wpmRead + " min read") )
							.append( $("<h3 class='headline'>").text(response.docs[i].headline.main) )
				   			.append( $("<h6>").text("Section: " + response.docs[i].section_name) )
					  		.append( $("<h6>").text(response.docs[i].byline.original))
					   		.append( $("<h6>").text( convertedDate.format("MMMM DD, YYYY") ) )
							.append( $("<p>").text(response.docs[i].snippet) )
				    		.append( $("<a>").attr("href", response.docs[i].web_url).text(response.docs[i].web_url) )
				    	$("#TopArticles").append(articles);

					// // console.log(data.response.docs[i].pub_date);
					// console.log(data.response.docs[i].section_name);
					// console.log(data.response.docs[i].web_url);	
				    }
				})

	}

//Event Handlers
//==================================================================================
$("#search").on("click", function(event){
	event.preventDefault();
if( $("#searchTerm").val() === "") {
	console.log("please enter something to search")
	// add a warning message under search term
}
else{
//input conditionals for query
//----------------------------------------------------------------------------------
	var searchTerm = $("#searchTerm").val().trim();
	var startYear = $("#startYear").val().trim();
	var endYear = $("#endYear").val().trim();
	limit = $("#limit").val();

	//regex to validate Start Range format of yyyy if it does not match a digit or is not in the fmt of yyyy will return a range of yyyy-0000 mm-00 and dd-00, will also return the same if ""
	if ( startYear.match(/^\d/) && startYear.match(/^(20[0-2][0-9])$/) || startYear.match(/^\d/) && startYear.match(/^(19[0-9][0-9])$/) ) {
	var startYear = $("#startYear").val() + "0101";
	}
		else {
			startYear = "19700101" //set a default start date of Jan 01 1970
		}

	//regex to validate End Range format of yyyy if it does not match a digit or is not in the fmt of yyyy will return a non-ranged yyyy-0000 mm-00 and dd-00, will also return the same if ""
	if ( endYear.match(/^\d/) && endYear.match(/^(20[0-2][0-9])$/) || endYear.match(/^\d/) && endYear.match(/^(19[0-9][0-9])$/) ) {
	var endYear = $("#endYear").val() + "0101"; 
	}
		else {
		// creates current date as an end date yyyymmdd
		  now = new Date();
		  year = "" + now.getFullYear();
		  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
		  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
		  endYear = year + month + day; //end it on todays date instead
		}
	if (startYear > endYear) {
		console.log("starYear has to be before end date")
}
	//remove id created on if statement<----needs to be created
//nyApiQuery & passing the values of userinput values of searchTerm, startYear, & endYear
//----------------------------------------------------------------------------------
	nyApiQuery(limit, searchTerm, startYear, endYear);
}
});
//clears top articles and sets input val to ""
$("#clear").on("click", function(){
	numArticle = 0;
	$(".displayArts").remove();
	$("#searchTerm").val("");
	$("#startYear").val("");
	$("#endYear").val("");

});

// });