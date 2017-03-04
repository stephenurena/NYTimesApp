//Global Variables
//==================================================================================
var numArticle = 0;
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
					console.log(data);
					var response = data.response;

				    for (var i = 0; i < 10; i++){
				    	numArticle++
				    	var articles = $("<div class='panel-body border displayArts'>");
				    	var numberArt = $("<span class='label label-primary'>")
					    	.text(numArticle)
					    	articles.append(numberArt);
				    	var headers = $("<h3>")
					    	.text(response.docs[i].headline.main);
					    	articles.append(headers);
					    var section = $("<h5>")
					    	.text("Section: " + response.docs[i].section_name)
					    	articles.append(section);
					    var author = $("<h5>")
					    	.text(response.docs[i].byline.original)
					    	articles.append(author);
					    var date = $("<h5>")
					    	.text(response.docs[i].pub_date.slice(0,10))
					    	articles.append(date);
				    	var p = $("<p>")
					    	.text(response.docs[i].snippet);
					    	articles.append(p);
				    	var a = $("<a>")
					    	.attr("href", response.docs[i].web_url)
					    	.text(response.docs[i].web_url)
					    	articles.append(a);

				    	$("#TopArticles").append(articles);

					// // console.log(data.response.docs[i].pub_date);
					// console.log(data.response.docs[i].section_name);
					// console.log(data.response.docs[i].web_url);	
				    }
				})

	}

//Event Handlers
//==================================================================================
$("#search").on("click", function(){
if( $("#searchTerm").val() === "") {
	console.log("please enter something to search")
	// add a warning message under search term
}
else{
//input conditionals for query
//----------------------------------------------------------------------------------
	var searchTerm = $("#searchTerm").val();
	var startYear = $("#startYear").val();
	var endYear = $("#endYear").val();

	//regex to validate Start Range format of yyyy if it does not match a digit or is not in the fmt of yyyy will return a range of yyyy-0000 mm-00 and dd-00, will also return the same if ""
	if ( startYear.match(/^\d/) && startYear.match(/^(20[0-2][0-9])$/) || startYear.match(/^\d/) && startYear.match(/^(19[0-9][0-9])$/) ) {
	var startYear = $("#startYear").val() + "0101";
	}
		else {
			startYear = "19700101" //set a start date instead
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
	nyApiQuery(searchTerm, startYear, endYear);
}
//clears top articles and sets input val to ""
$("#clear").on("click", function(){
	$(".displayArts").remove();
	$("#searchTerm").val("");
	$("#startYear").val("");
	$("#endYear").val("");

})

});