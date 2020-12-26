// I've included both the universities full names and their nicknames
// use the nicknames for this assignment.  I've included the full names
// so those who aren't familiar with Bay Area universities will know
// what the names of the universities actually are.

var univArray = new Array(
		{name: "Stanford University", nickname: "Stanford", ownership: "private", SATh: 1570, SATl: 1380, tuition: 44757},
		{name: "University of California, Berkeley", nickname: "UC Berkeley", ownership: "public", SATh: 1500, SATl: 1250, tuition: 13844},
		{name: "University of California, Santa Cruz", nickname: "UC Santa Cruz", ownership: "public", SATh: 1280, SATl: 1000, tuition: 13398},
		{name: "San Francisco State University", nickname: "SFSU", ownership: "public", SATh: 1110, SATl: 880, tuition: 6468},
		{name: "San Jose State University", nickname: "SJSU", ownership: "public", SATh: 1160, SATl: 880, tuition: 9496},
		{name: "Sonoma State University", nickname: "Sonoma State", ownership: "public", SATh: 1090, SATl: 880, tuition: 7276},
		{name: "California State University, East Bay", nickname: "CalState East Bay", ownership: "public", SATh: 1010, SATl: 800, tuition: 6550, room: 6435},
		{name: "University of San Francisco", nickname: "USF", ownership: "private", SATh: 1270, SATl: 1070, tuition: 41450},
		{name: "Santa Clara University", nickname: "SCU", ownership: "private", SATh: 1380, SATl: 1190, tuition: 43812},
		{name: "Mills College", nickname: "Mills College", ownership: "private", SATh: 1250, SATl: 1040, tuition: 42918}
		);

var table = document.getElementById("collegeTable");
var collegeTableHeaders = ["Name", "SAT High", "SAT Low", "Tuition"];

function generateTableHeaders() {
	var tableHeading = table.createTHead();
	var tableRow = tableHeading.insertRow();
	for (var i = 0; i < collegeTableHeaders.length; i++) {
		var th = document.createElement("th");
		var headerText = document.createTextNode(collegeTableHeaders[i]);
		th.appendChild(headerText);
		tableRow.appendChild(th);
	}
}

window.addEventListener('load', generateTableHeaders, false); //generates headers on load

function clearCollegeTable() { //clears the tbody, leaves header
	for (var i = table.rows.length - 1; i > 0; i--) { //i>0 leaves index 0 alone, which is the header
		table.deleteRow(i)
		//console.log("delete" + i)
	}
}

function generateTableBody() {
	//clear tbody
	clearCollegeTable();

	//checks searchtable for values
	var inputtedSchoolType = 0; //placeholder
	if (document.getElementById("public").checked == true) {
        inputtedSchoolType = document.getElementById("public").value
		//console.log(inputtedSchoolType)
    } else if (document.getElementById("private").checked == true) {
		inputtedSchoolType = document.getElementById("private").value
		//console.log(inputtedSchoolType)
    } else if (document.getElementById("neitherSchool").checked == true) {
    	inputtedSchoolType = document.getElementById("neitherSchool").value
		//console.log(typeof inputtedSchoolType)
	}

	var inputtedMaxTuition = parseFloat(document.getElementById("maxTuition").value);
	//console.log(inputtedMaxTuition);
	var inputtedMaxSAT = parseFloat(document.getElementById("maxHighSAT").value);
	//console.log(typeof inputtedMaxSAT);
	var inputtedMinSAT = parseFloat(document.getElementById("minLowSAT").value);
	//console.log(typeof inputtedMinSAT);


	//rebuild tbody with search values
	var rowCounter = 0; //counter for consistent zebrastriping
	for (var i = 0; i < univArray.length; i++) {
		//console.log(i)
		var univArrayObject = univArray[i]; //new variable to acess each element in object by school
		//console.log(univArrayObject);
		var univArrayName = univArrayObject.nickname;
		//console.log(univArrayName);
		var univArraySchoolType = univArrayObject.ownership;
		//console.log(univArraySchoolType);
		var univArraySATHigh = univArrayObject.SATh;
		//console.log(univArraySATHigh);
		var univArraySATLow = univArrayObject.SATl;
		//console.log(univArraySATLow);
		var univArrayTuition = univArrayObject.tuition;
		//console.log(univArrayTuition);
		var univArraySpecific = [univArrayName, univArraySATHigh, univArraySATLow, univArrayTuition, univArraySchoolType]; //new array to store object values in order
		//console.log(univArraySpecific); //could get rid of all the variables and just have the array

		//get values from search and compare to Array, but also check if blank (if 0, then nested ifs; else condition)
		//if schooltype condition & tuition condition & sath condition & satl conndition, then create row
		if (univArraySchoolType == inputtedSchoolType || inputtedSchoolType == "publicPrivate") {
			if (univArrayTuition <= inputtedMaxTuition || isNaN(inputtedMaxTuition) == true) {
				if (univArraySATHigh <= inputtedMaxSAT || isNaN(inputtedMaxSAT) == true) {
					if (univArraySATLow >= inputtedMinSAT || isNaN(inputtedMinSAT) == true) {
						newRow = table.insertRow();
						for (var j = 0; j < 4; j++) {
							newCell = newRow.insertCell();
							newCellText = document.createTextNode(univArraySpecific[j]);
							newCell.appendChild(newCellText);
						}
						if (rowCounter % 2 == 1) { //zebra striping table
							newRow.style.backgroundColor = "#cccccc";
						}
						rowCounter++;
					}
				}
			}
		}
	}
}

window.addEventListener('load', generateTableBody, false) //generates first tablebody on load
document.getElementById("submitButton").addEventListener("click", generateTableBody, false);
