var diagramElement;
var currentCount;
var CHART_URL = "http://chart.apis.google.com/chart?chs=540x540&cht=v&chco=00B1F077,E69ED374&chds=0,294&chdl=Seth|Victoria&chma=5|5&chts=000000,35";
var TITLE_VAR = "&chtt=";
var DATA_VAR = "&chd=t:";

function init() {
	diagramElement = null;
	currentCount = 0;
}

function getUrl(title, data) {
	return CHART_URL + TITLE_VAR + title + DATA_VAR + data;
}

function updateDiagram(title, data) {
	var im = new Image();
	im.src = getUrl(title, data);
	diagramElement.src = im.src;
}

function checkInit() {
	if (!diagramElement) {
		diagramElement = document.getElementById("vennDiagram");
	}
}

function goBack() {
	checkInit();
	
	updateDiagram(--currentCount,"294,114,-1,41,-1,-1,-1");	
}

function goForward() {
	checkInit();
	
	updateDiagram(++currentCount,"294,114,-1,41,-1,-1,-1");
}

init();