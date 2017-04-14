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
var DEPARTDATE, DEPARTTIME, RETURNDATE, RETURNTIME;


function pehin() {

	var doc = new jsPDF({
		orientation: 'portrait',
		unit: 'in',
		format: [8.27, 11.69] // A4 in Inches W 8.267 H 11.692
	})
	
	
	doc.setFont('Arial');
	doc.setFontSize(8);
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
	
	
	doc.text(DEPARTMENT, 2.40, 5.80);//how do I make it underlined?
	// get String length
	var textLength = DEPARTMENT.length / 16;
	doc.setLineWidth(0.01);
	doc.line(2.40,5.83,(2.40+textLength),5.83); // Very tricky
	
	doc.save('allright_.pdf');
	
}