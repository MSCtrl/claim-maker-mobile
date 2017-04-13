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
	doc.setLineWidth(0.01);
	doc.line(1,2,3,4);

	
	doc.save('allright_.pdf');
	
}