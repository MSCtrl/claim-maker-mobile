
// NON-FUNCTION CODES

var claimList = [
"1#14#40.00#560.00",
"2#14#25.00#325.00",
"3#Express#30.00#Q1220#Kapit#Ng. Sempileh",
"4#DiGi#019-8390727#GST803211169001#10.00",
"3#Express#30.00#A0045#Ng. Sempileh#Kapit",
"9",
"9"];
var departDate = new Date();
var returnDate = new Date();
var subTotals = [0.00,0.00,0.00, 0.00,0.00,0.00];
// Subsistence	: 1
// Lodging		: 2
// Fares		: 3
// Mobile Reload: 4
// Others		: 5
// Empty		: 9
var currentModal; // Stores the type of claim for chosing modal to be used
var currentIndex; // Stores the index of claimList array to be used
selectionSort();

// Selection Sort Algorithm
function selectionSort() {
	for (var a=0; a<6; a++) {
		var min = a;
		
		for (var b=a+1; b<6; b++) {
			if ( getClaimCode(b)<getClaimCode(min) ) {
				min = b;
			}
		}
			
		if (min != a) {
			var temp;
			temp = claimList[a];
			claimList[a] = claimList[min];
			claimList[min] = temp;
		}
	}
}


// FUNCTION CODES

// Populate the form with default values
function populate(){
	selectionSort();
	var text, subtotal;
	var gtotal = 0.00;
	var rowID = ["row01","row02","row03","row04","row05","row06"];
	for (var i=0; i<6; i++) {
		
		// Get the claim code
		parts = claimList[i].split('#');
		if (getClaimCode(i)==1) {
			// Subsistence Allowance @ RM 40.00 per day
			text = "Subsistence Allowance @ RM" + parts[2] + " per day";
			subtotal = parts[3];
			extra = parts[1] + " days";
		}
		else if (getClaimCode(i)==2) {
			text = "Lodging Allowance @ RM" + parts[2] + " per night";
			subtotal = parts[3];
			extra = parts[1] + " nights";
		}
		else if (getClaimCode(i)==3) {
			text = parts[1] + " fare: " + parts[4] + " - " + parts[5] + " Ticket No: " + parts[3];
			subtotal = parts[2];
		}		
		else if (getClaimCode(i)==4) {
			text = parts[1] + " reload coupon for MARCH 2017 Coupon No: " + parts[3] + " (" + parts[2] + ")";
			subtotal = parts[4];
		}
		else {
			text = " ";
			subtotal = 0.0;
			//console.log("Error: There are no such claim code or claim item!");
		}
		subTotals[i] = parseFloat(subtotal);
		document.getElementById(rowID[i]).childNodes[3].innerHTML = text;
		document.getElementById(rowID[i]).childNodes[5].innerHTML = extra;
		document.getElementById(rowID[i]).childNodes[7].innerHTML = subtotal;
		text = " ";
		extra = " ";
		subtotal = 0.0;
	}
	for(var t in subTotals) { gtotal += subTotals[t]; }
	document.getElementById("clmtotal").innerHTML = "RM" + gtotal;
	buttonStatus();
}


// Function to count duration of travelling.
// Ruling on calculation refer to Documentation.
function getDays() {
	departDate = moment(document.getElementById("idclm_depart").value);
	returnDate = moment(document.getElementById("idclm_return").value);
	
	var difference = returnDate.diff(departDate, 'days');

	// Update the claimList
	for (var i=0; i<claimList.length; i++) {
		if (getClaimCode(i)==1) {
			var temp = claimList[i].split('#');
			claimList[i] = temp[0] + "#" + difference + "#" + temp[2] + "#" + Number(difference*temp[2]).toFixed(2);
		}
		else if (getClaimCode(i)==2) {
			var temp = claimList[i].split('#');
			claimList[i] = temp[0] + "#" + difference + "#" + temp[2] + "#" + Number(difference*temp[2]).toFixed(2);
		}
	}
	populate();
}

// Function to delete a row of claim
function deleteRow(rowIndex,rowId) {
	for (var i=rowIndex; i<6; i++) {
		claimList[i] = claimList[i+1];
	}
	currentModal = "";
	populate();
}

// Claim button status modifier. Controlling the state of buttons depending
// on the contents of claimList
function buttonStatus() {
	// Count the number of each claim code
	var subs = lodg = fare = mobi = other = claim = 0;
	var defState = "btn-floating btn-large waves-effect waves-light"; // Default State for buttons
	
	for (var b=0; b<claimList.length; b++) {
		if (getClaimCode(b)==1) {
			subs = subs + 1;
			claim = claim + 1;
		}
		else if (getClaimCode(b)==2) {
			lodg = lodg + 1;
			claim = claim + 1;
		}
		else if (getClaimCode(b)==3) {
			fare = fare + 1;
			claim = claim + 1;
		}
		else if (getClaimCode(b)==4) {
			mobi = mobi + 1;
			claim = claim + 1;
		}
		else if (getClaimCode(b)==5) {
			other = other + 1;
			claim = claim + 1;
		}
	}
	
	// If the claim table is full, disable all
	if (claim==6) {
		//disable ALL
		document.getElementById("btnsubs").className += " disabled";
		document.getElementById("btnlodg").className += " disabled";
		document.getElementById("btnfare").className += " disabled";
		document.getElementById("btnmobi").className += " disabled";
		document.getElementById("btnother").className += " disabled";
	} else {
		// enable all
		document.getElementById("btnsubs").className = defState;
		document.getElementById("btnlodg").className = defState;
		document.getElementById("btnfare").className = defState;
		document.getElementById("btnmobi").className = defState;
		document.getElementById("btnother").className = defState;
		// Determines the status of each button based on counting
		if (subs>0) {
			document.getElementById("btnsubs").className += " disabled";
		}
		
		if (lodg>0) {
			document.getElementById("btnlodg").className += " disabled";
		}
		
		if (mobi>0) {
			document.getElementById("btnmobi").className += " disabled";
		}		
	}
}

// Function to get Claim Code
function getClaimCode(i) {
	claimCode = claimList[i].split('#');
	return claimCode[0];
}

// Function to create a claim
// For Subsistence
function newSubs() {
	departDate = moment(document.getElementById("idclm_depart").value);
	returnDate = moment(document.getElementById("idclm_return").value);
	var difference = returnDate.diff(departDate, 'days');
	
	document.getElementById("subsModal").style.display = "block";
	document.getElementById("clmsubs_rates").value = "40.00";
	document.getElementById("clmsubs_days").value = difference;
	document.getElementById("clmsubs_text").innerHTML = "";
	currentIndex = 5;
	currentModal = "subsModal";
}
// For Lodging
function newLodging() {
	departDate = moment(document.getElementById("idclm_depart").value);
	returnDate = moment(document.getElementById("idclm_return").value);
	var difference = returnDate.diff(departDate, 'days');
	
	document.getElementById("lodgingModal").style.display = "block";
	document.getElementById("clmlodg_rates").value = "25.00";
	document.getElementById("clmlodg_days").value = difference;
	document.getElementById("clmlodg_text").innerHTML = "";
	currentIndex = 5;
	currentModal = "lodgingModal";
}
// For Fares
function newFare() {
	document.getElementById("fareModal").style.display = "block";
	document.getElementById("savefare").className += " disabled";
	document.getElementById("clmfare_mode").value = "";
	document.getElementById("clmfare_price").value = "30.00";
	document.getElementById("clmfare_ticket").value = "";
	document.getElementById("clmfare_from").value = "";
	document.getElementById("clmfare_desti").value = "";
	document.getElementById("clmfare_text").innerHTML = "";
	currentIndex = 5;
	currentModal = "fareModal";	
}
// For Mobile Reload
function newMobile() {
	document.getElementById("reloadModal").style.display = "block";
	document.getElementById("savemobi").className += " disabled";
	document.getElementById("clmreload_telco").value = "";
	document.getElementById("clmreload_no").value = "";
	document.getElementById("clmreload_coupon").value = "";
	document.getElementById("clmreload_price").value = "10.00";
	document.getElementById("clmreload_text").innerHTML = "";
	currentIndex = 5;
	currentModal = "reloadModal";
}

// Function to populate data from array
// For Modal Subsistence
function popSubs(i) {
	subsDetail = claimList[i].split('#');
	document.getElementById("clmsubs_rates").value = subsDetail[2];
	document.getElementById("clmsubs_days").value = subsDetail[1];
	document.getElementById("clmsubs_days").setAttribute("readonly", true);
	document.getElementById("clmsubs_text").innerHTML = textAllowance();
}
// For Modal Lodging
function popLodging(i) {
	subsDetail = claimList[i].split('#');
	document.getElementById("clmlodg_rates").value = subsDetail[2];
	document.getElementById("clmlodg_days").value = subsDetail[1];
	document.getElementById("clmlodg_days").setAttribute("readonly", true);
	document.getElementById("clmlodg_text").innerHTML = textAllowance();	
}
// For Modal Fares
function popFare(i) {
	fareDetail = claimList[i].split('#');
	document.getElementById("clmfare_mode").value = fareDetail[1];
	document.getElementById("clmfare_price").value = fareDetail[2];
	document.getElementById("clmfare_ticket").value = fareDetail[3];
	document.getElementById("clmfare_from").value = fareDetail[4];
	document.getElementById("clmfare_desti").value = fareDetail[5];
	document.getElementById("clmfare_text").innerHTML = textFare();
}
// For Modal Mobile Reload
function popReload(i) {
	// i variable stands for index in claimList array
	reloadDetail = claimList[i].split('#');
	document.getElementById("clmreload_telco").value = reloadDetail[1];
	document.getElementById("clmreload_no").value = reloadDetail[2];
	document.getElementById("clmreload_coupon").value = reloadDetail[3];
	document.getElementById("clmreload_price").value = reloadDetail[4];
	document.getElementById("clmreload_text").innerHTML = textReload();
}
// For Modal Others
function popOther(i) {
	
}


// Function to reload text to Modal
// For Subsistence Modal
// This function includes input error detection
function textAllowance() {
	// Shared values
	var idrates, iddays, idsave, text;
	if (currentModal=="subsModal") {
		idrates = "clmsubs_rates";
		iddays = "clmsubs_days";
		idsave = "savesubs";
		text = "Subsistence ";
	}
	else if (currentModal=="lodgingModal") {
		idrates = "clmlodg_rates";
		iddays = "clmlodg_days";
		idsave = "savelodg";
		text = "Lodging ";
	}
	
	var rates, days;
	var defState = "btn waves-effect waves-light modal-save";
	
	// Default condition for the save button
	document.getElementById(idsave).className = defState;
	
	rates = document.getElementById(idrates).value;
	days = document.getElementById(iddays).value;

	// Check for empty input. Would disable save button if error exist
	if (rates==""||days=="") {
		document.getElementById(idsave).className += " disabled";
	}

	var ratesPattern = /[0-9]+.[0-9]{2,2}$/	
	if (ratesPattern.test(rates)==false) {
		document.getElementById(idsave).className += " disabled";
	}
	
	text += " Allowance @ RM" + rates + " per day";
	return text;
}


// For Modal Fare
// This function includes input error detection
function textFare() {
	var mode, price, ticket, depart, desti; // Variable 'depart' is used to mean 'from'
	var defState = "btn waves-effect waves-light modal-save";
	
	// Default condition for the save button
	document.getElementById("savefare").className = defState;
	
	mode = document.getElementById("clmfare_mode").value;
	price = document.getElementById("clmfare_price").value;
	ticket = document.getElementById("clmfare_ticket").value;
	depart = document.getElementById("clmfare_from").value;
	desti = document.getElementById("clmfare_desti").value;
	
	// Check for empty input. Would disable save button if error exist
	if (price==""||ticket==""||depart==""||desti=="") {
		document.getElementById("savefare").className += " disabled";
	}
	
	var pricePattern = /[0-9]+.[0-9]{2,2}$/
	if (pricePattern.test(price)==false) {
		document.getElementById("savefare").className += " disabled";
	}	
	
	var fareText = mode + " fare: " + depart + " - " + desti + " Ticket No: " + ticket;
	
	return fareText;
}
// For Modal Mobile Reload
// This function includes input error detection
function textReload() {
	var telco, phone, coupon;
	var defState = "btn waves-effect waves-light modal-save";
	
	// Default condition for the save button
	document.getElementById("savemobi").className = defState;
	
	telco = document.getElementById("clmreload_telco").value;
	phone = document.getElementById("clmreload_no").value;
	coupon = document.getElementById("clmreload_coupon").value;
	price = document.getElementById("clmreload_price").value;
	
	// Check for empty input. Would disable save button if error exist
	if (phone==""||coupon==""||price=="") {
		document.getElementById("savemobi").className += " disabled";
	}
	
	// Check for discrepancy. Would disable save button if error exist
	var numPattern = /[^-0-9]+/;
	if (numPattern.test(phone)==true) {
		document.getElementById("savemobi").className += " disabled";
	}
	
	var reloadText = telco + " reload coupon for MARCH 2017 Coupon No: " + coupon + " (" + phone + ")";
	// based on format below
	// Celcom reload coupon for MARCH 2017 Coupon No: GST803211169001 (019-8390727)
	return reloadText;
}
// For Modal Other
// This function includes input error detection


// Function to synchronise footer text with the input from modal upon onkeyup event.
function mirror(textID) {
	
	if (textID=="clmsubs_text") {
		document.getElementById(textID).innerHTML = textAllowance();
	}
	else if (textID=="clmlodg_text") {
		document.getElementById(textID).innerHTML = textAllowance();
	}
	else if (textID=="clmfare_text") {
		document.getElementById(textID).innerHTML = textFare();
	}
	else if (textID=="clmreload_text") {
		document.getElementById(textID).innerHTML = textReload();
	}
	else if (textID=="clmother_text") {
		document.getElementById(textID).innerHTML = textOther();
	}
	else {
		console.log("Error: There are no such text to be synchronized!");
	}
}

// Function to save input from modal
// For Modal Subsistence
function saveSubs() {
	var days, rates, subtotal;
	
	days = document.getElementById("clmsubs_days").value;
	rates = document.getElementById("clmsubs_rates").value;
	subtotal = Number(days * rates).toFixed(2);
	
	var newInfo = "1#" + days + "#" + rates + "#" + subtotal;
	
	claimList[currentIndex] = newInfo;
	closeModal();
	populate();
}
// For Modal Lodging
function saveLodging() {
	var days, rates, subtotal;
	
	days = document.getElementById("clmlodg_days").value;
	rates = document.getElementById("clmlodg_rates").value;
	subtotal = Number(days * rates).toFixed(2);
	
	var newInfo = "2#" + days + "#" + rates + "#" + subtotal;
		
	claimList[currentIndex] = newInfo;
	closeModal();
	populate();	
}
// For Modal Fare
function saveFare() {
	var mode, price, ticket, depart, desti;

	mode = document.getElementById("clmfare_mode").value;
	price = document.getElementById("clmfare_price").value;
	ticket = document.getElementById("clmfare_ticket").value;
	depart = document.getElementById("clmfare_from").value;
	desti = document.getElementById("clmfare_desti").value;
	
	var newInfo = "3#" + mode + "#" + price + "#" + ticket + "#" + depart + "#" + desti;
	
	claimList[currentIndex] = newInfo;
	closeModal();
	populate();
}
// For Modal Mobile Reload
function saveReload() {
	var telco, phone, coupon, price;
	
	telco = document.getElementById("clmreload_telco").value;
	phone = document.getElementById("clmreload_no").value;
	coupon = document.getElementById("clmreload_coupon").value;	
	price = document.getElementById("clmreload_price").value;
	
	var newInfo = "4#" + telco + "#" + phone + "#" + coupon + "#" + price;
	
	claimList[currentIndex] = newInfo;
	closeModal();
	populate();
}
// For Modal Other
function saveOther() {
	claimList[currentIndex] = newInfo;
	closeModal();
	populate();	
}


// Temporary: function to show summary of data
function showAll() {
	var allinfo;
	
	allinfo = '\n' + document.getElementById("idclm_name").value;
	allinfo += '\n' + document.getElementById("idclm_region").value;
	allinfo += '\n' + document.getElementById("idclm_department").value;
	allinfo += '\n' + document.getElementById("idclm_date").value;
	
	alert(allinfo);
	
	var doc = new jsPDF();

	doc.text(allinfo, 10, 10);
	
	doc.save('a4.pdf')
}






/* The Modals interactivity */

// When the User clicks the button, open the modal
function openModal(ci) {

	currentIndex = ci;

	// Determines the type of Modal Form to be opened
	if ( getClaimCode(currentIndex)==1 ) {
		currentModal = "subsModal";
		modalForm = document.getElementById("subsModal");
		popSubs(currentIndex);
	}
	else if ( getClaimCode(currentIndex)==2 ) {
		currentModal = "lodgingModal";
		modalForm = document.getElementById("lodgingModal");
		popLodging(currentIndex);
	}
	else if ( getClaimCode(currentIndex)==3 ) {
		currentModal = "fareModal";
		modalForm = document.getElementById("fareModal");
		popFare(currentIndex);
	}
	else if ( getClaimCode(currentIndex)==4 ) {
		currentModal = "reloadModal";
		modalForm = document.getElementById("reloadModal");
		popReload(currentIndex);
	}
	else if ( getClaimCode(currentIndex)==5 ) {
		currentModal = "otherModal";
		modalForm = document.getElementById("otherModal");
		popOther(currentIndex);
	}
	else {
		console.log("Error: There is no such modal type!")
		currentModal = "";
	}
	
	// Quick fix to prevent the summoning of modal unintentionally
	if (currentModal != "") {
		modalForm.style.display = "block";
	}
}

// When the User clicks on "X", close the modal
function closeModal() {
	modalForm = document.getElementById(currentModal);
	modalForm.style.display = "none";
}

// When the User clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	modalForm = document.getElementById(currentModal);
    if (event.target == modalForm) {
        modalForm.style.display = "none";
    }
}