/* print.js will be responsible for handling the final
** stage of the User actions. Below codes will take all
** required values and process them to their own coordinate
** in a PDF file, either for direct printing or saving
*/

// Required values with default values
var NAME = "MOHAMAD SHAHRIM BIN BUSSMAN";
var REGION = "Kapit Sub-Region";
var POSITION = "Junior Log Inspector"
var DATE = moment().format("DD.MM.YYYY");
var CLAIM = new Array(false, true, false); // Respective order: 'Entertainment', 'Travelling', 'Miscellaneous'
var WO = "KPT/2017";
var DEPARTMENT = "Endorsement & Shipping";


function pehin() {

	var doc = new jsPDF({
		orientation: 'portrait',
		unit: 'in',
		format: [8.27, 11.69] // A4 in Inches W 8.267 H 11.692
	})
	
	
	doc.setFont('Arial');
	doc.setFontSize(9);
	doc.setFontType("bolditalic");

	doc.text(NAME, 5.51, 2.35); // diff: 24
	doc.text(REGION, 5.51, 2.59);
	doc.text(POSITION, 5.51, 2.83);
	doc.text(DATE, 5.51, 3.07);
	doc.text("REFER TO WO:" + WO, 2, 4.56);
	
	// Line to strike type of claim
	// Strike length = 0.75 Inch
	if (!CLAIM[0]) {
		doc.setLineWidth(0.05);
		doc.line(3.25,3.69,4,3.69); 
	}
	if (!CLAIM[1]) {
		doc.setLineWidth(0.05);
		doc.line(4,3.69,4.75,3.69);
	}
	if (!CLAIM[2]) {
		doc.setLineWidth(0.05);
		doc.line(4.75,3.69,5.5,3.69);
	}
	
	
	doc.text(DEPARTMENT, 2.40, 5.80);
	// get String length so we can determine how long the underline would be
	var textLength = DEPARTMENT.length / 15;
	doc.setLineWidth(0.01);
	doc.line(2.40,5.83,(2.40+textLength),5.83); // Very tricky
	
	
	// Depart date and time
	doc.text(document.getElementById("idclm_depart").value,0.86,6.09);
	doc.text(document.getElementById("idclm_detime").value,0.86,6.23);
	
	doc.text("To",1.13,6.63);
	
	// Return date and time
	doc.text(document.getElementById("idclm_return").value,0.86,6.93);
	doc.text(document.getElementById("idclm_retime").value,0.86,7.07);
	
	var table = document.getElementById("clm_table");
	var height = 6.09;
	var distant = [1.83,5.33,6.50];
	for (var i = 0, row; row = table.rows[i]; i++) {
		var item=0;
		for (var j = 1, col; col = row.cells[j]; j++) {
			// Had to adjust the text first before being fit in
			// I know it's not professional doing things this way, but
			// I'm new go easy wif me tis is temporary...
			
			// Check whether the current table innerHTML is a mobile reload
			// description. If yes, trim the string after the 8th spaces
			// and print the first part and second part in a separate line
			var s=String(col.innerHTML);
			if (s.length>50) {
				var q=50;
				var m = s.substring(0,i);
				while ( m.slice(-1) != ' ') {
					q--;
					m = s.substring(0,q);
				}
				doc.text(s.substring(0,q), distant[item],height);
				doc.text(s.substring(q,s.length), distant[item],height+0.15);
			}
			else {
				doc.text(col.innerHTML, distant[item],height);
			}
			item++;
		}
		height += 0.40;
	}
	
	
	doc.save('allright_.pdf');
	
}