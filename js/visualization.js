var CHART_URL = "http://chart.apis.google.com/chart?chs=540x450&cht=v&chco=00B1F077,E69ED374&chds=0,294&chma=5|5&chts=000000,35";
var TITLE_VAR = "&chtt=";
var DATA_VAR = "&chd=t:";
var MS_IN_MONTH = 1000 * 60 * 60 * 24 * 30;
var SLIDER_RANGE = 100;
var SLIDER_VALUES_PER_MONTH = 2;

var sliderElement;
var diagramElement;

var diagramDate;
var startDate;

var sizeCircle1;
var sizeCircle2;
var sizeOverlap;

var person1Obj;
var person1Likes;
var person2Obj;
var person2Likes;

function getLikesCount(likes, beforeDate) {
	var count = 0;
	for (var i = 0;i<likes.length;i++)
	{
		if (Date.parse(likes[i]["created_time"]) < beforeDate.getTime()) {
	  		count++;
		}
	}
	
	return count;
}

function getCommonLikesCount(likes1, likes2, beforeDate) {
	var seenLikes = new Object();
	
	// Initialize seen counts for each like.
	for (var i = 0;i<likes1.length;i++)
	{
	  	seenLikes[(likes1[i]["id"])] = 0;
	}
	for (var i = 0;i<likes2.length;i++)
	{
	  	seenLikes[(likes2[i]["id"])] = 0;
	}
	
	// Sum number of times seen for each like.
	for (var i = 0;i<likes1.length;i++)
	{
		if (Date.parse(likes1[i]["created_time"]) < beforeDate.getTime()) {
			seenLikes[(likes1[i]["id"])]++;
		}
	}
	for (var i = 0;i<likes2.length;i++)
	{
	  	if (Date.parse(likes2[i]["created_time"]) < beforeDate.getTime()) {
			seenLikes[(likes2[i]["id"])]++;
		}
	}
	
	// Count likes that have been seen more than once.
	var commonCount = 0;
	for (var i in seenLikes)
	{
	  	if (seenLikes[i] > 1) {
			commonCount++;
		}
	}
	
	return commonCount;
}

function retrievedPerson1JSON(data) {
	person1Obj = data;
	
	jQuery.getJSON("likes/victoria.json", retrievedPerson2JSON);
}

function retrievedPerson2JSON(data) {
	person2Obj = data;
	
	processJSON();
}

function processJSON() {
	person1Likes = person1Obj['data']
	person2Likes = person2Obj['data'];
	
	updateDiagram();	
}

function init() {
	sliderElement = null;
	diagramElement = null;
	diagramDate = new Date();
	startDate = new Date();
	endDate = new Date();
	endDate.setTime(startDate - SLIDER_RANGE * MS_IN_MONTH / SLIDER_VALUES_PER_MONTH);
	
	sizeCircle1 = 0;
	sizeCircle2 = 0;
	sizeOverlap = 0;
	
	jQuery.getJSON("likes/seth.json", retrievedPerson1JSON);
}

function getUrlDataString() {
	return sizeCircle1 + "," + sizeCircle2 + ",-1," + sizeOverlap + ",-1,-1,-1";
}

function getUrl() {
	return CHART_URL + DATA_VAR + getUrlDataString();
}

function updateDiagram() {
	if (!diagramElement) {
		diagramElement = document.getElementById("vennDiagram");
	}
	
	sizeCircle1 = getLikesCount(person1Likes, diagramDate);
	sizeCircle2 = getLikesCount(person2Likes, diagramDate);
	sizeOverlap = getCommonLikesCount(person1Likes, person2Likes, diagramDate);
	
	document.getElementById("sharedCount").innerText = sizeOverlap;
	document.getElementById("dateText").innerText = $.datepicker.formatDate("MM yy", diagramDate);
	
	updateImage();
}

function updateImage() {
	var im = new Image();
	im.src = getUrl();
	diagramElement.src = im.src;
}

function rangeUpdated(newValue) {
	diagramDate.setTime(startDate.getTime() - (SLIDER_RANGE-newValue) * MS_IN_MONTH / SLIDER_VALUES_PER_MONTH);
	
	updateDiagram();
}

init();