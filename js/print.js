/* print.js will be responsible for handling the final
** stage of the User actions. Below codes will take all
** required values and process them to their own coordinate
** in a PDF file, either for direct printing or saving
*/
function tehee() {
	alert(DATE);
}
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
	var doc = new jsPDF();

	doc.setFont('Arial');
	doc.setFontSize(8);
	doc.setFontType("bolditalic");
	
	doc.text(NAME, 10, 10);
	doc.text(REGION, 10, 30);
	
	doc.save('allright_.pdf');
	
}