var TITLE_VAR = "&chtt=";
var DATA_VAR = "&chd=t:";
var MS_IN_MONTH = 1000 * 60 * 60 * 24 * 30;
var SLIDER_RANGE = 100;
var SLIDER_VALUES_PER_MONTH = 2;
var MAX_VENNDIAGRAM_WIDTH = 540;
var MAX_VENNDIAGRAM_HEIGHT = 450;

var facebookId1;
var facebookId2;

var sliderElement;
var diagramElement;

var diagramDate;
var startDate;

var sizeCircle1;
var sizeCircle2;
var sizeOverlap;

var person1Obj;
var person2Obj;
var person1Likes;
var person2Likes;

function hideAddressBar() // http://mobile.tutsplus.com/tutorials/mobile-web-apps/remove-address-bar/
{
  if(!window.location.hash)
  {
      if(document.height < window.outerHeight)
      {
          document.body.style.height = (window.outerHeight + 50) + 'px';
      }

      setTimeout( function(){ window.scrollTo(0, 1); }, 50 );
  }
}

if (onMobileDevice()) {
	window.addEventListener("load", function(){ if(!window.pageYOffset){ hideAddressBar(); } } );
	window.addEventListener("orientationchange", hideAddressBar );
}

function chooseImageWidth() {
	if (screen.availWidth > MAX_VENNDIAGRAM_WIDTH) {
		return MAX_VENNDIAGRAM_WIDTH;
	}
	
	return screen.availWidth;
}

function chooseImageHeight() {
	if (screen.availWidth > MAX_VENNDIAGRAM_WIDTH) {
		return MAX_VENNDIAGRAM_HEIGHT;
	}
	
	return Math.round(screen.availWidth * 0.83);
}

function getChartURL() {
	return "http://chart.apis.google.com/chart?chs="+chooseImageWidth()+"x"+chooseImageHeight()+"&cht=v&chco=FFDDAD,A5C9EB&chds=0,294&chma=5|5&chts=000000,35";
}

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

function retrievedPerson1Likes(data) {
	person1Obj = data;
	
	// Now get likes for person 2.
	FB.api("/"+ facebookId2 +"/likes", retrievedPerson2Likes);
}

function retrievedPerson2Likes(data) {
	person2Obj = data;
	
	// Done getting likes so process them now.
	processJSON();
}

function retrievedPerson1Info(data) {
	$("#person1name").text(data.name);
}

function retrievedPerson2Info(data) {
	$("#person2name").text(data.name);
}

function processJSON() {
	person1Likes = person1Obj['data'];
	person2Likes = person2Obj['data'];
	
	updateDiagram();	
	
	$("#visualizationWrapper").show();
}

function onMobileDevice() {
	return navigator.userAgent.match(/Android/i)
	 || navigator.userAgent.match(/webOS/i)
	 || navigator.userAgent.match(/iPhone/i)
	 || navigator.userAgent.match(/iPad/i)
	 || navigator.userAgent.match(/iPod/i)
	 || navigator.userAgent.match(/BlackBerry/i);
}

function hideVisualization() {
	$("#visualizationWrapper").hide();
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
	
	hideVisualization();
	
	// Show friend picker.
	TDFriendSelector.init();
	var selector1 = TDFriendSelector.newInstance({
	    callbackSubmit: function(selectedFriendIds) {
			if (selectedFriendIds.length == 1) { // Compare friend to myself.
				facebookId1 = selectedFriendIds[0];
				facebookId2 = "me";
			} else if (selectedFriendIds.length == 2) { // Compare two friends.
				facebookId1 = selectedFriendIds[0];
				facebookId2 = selectedFriendIds[1];
			} else {
				return;
			}
			
			// Fill in names in parallel.
			FB.api("/" + facebookId1, retrievedPerson1Info);
			FB.api("/" + facebookId2, retrievedPerson2Info);

			// Get likes in serial.
			FB.api("/"+ facebookId1 +"/likes", retrievedPerson1Likes);
	    },
		maxSelection: 2, 
		friendsPerPage: onMobileDevice() ? 6 : 10
	});
    selector1.showFriendSelector();
}

function getUrlDataString() {
	return sizeCircle1 + "," + sizeCircle2 + ",-1," + sizeOverlap + ",-1,-1,-1";
}

function getUrl() {
	return getChartURL() + DATA_VAR + getUrlDataString();
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

function $_GET(q,s) { // http://www.onlineaspect.com/2009/06/10/reading-get-variables-with-javascript/
        s = s ? s : window.location.search; 
        var re = new RegExp('&'+q+'(?:=([^&]*))?(?=&|$)','i'); 
        return (s=s.replace(/^?/,'&').match(re)) ? (typeof s[1] == 'undefined' ? '' : decodeURIComponent(s[1])) : undefined; 
}