/*functions for addition game*/

function generateSignMultiplier() { // returns a 1 or -1 randomly
	var returnPositive = Math.floor(Math.random() * 2)>0;
	return returnPositive ? 1 : -1;
}

function generateExpressionData() {
	var sign1 = generateSignMultiplier();
	var sign2 = generateSignMultiplier();
	/*
	return a random number from 0 to 9 for num1 and num2 and
	multiply by their respective signs
	*/
	var num1 = Math.floor(Math.random() * 10)*sign1; 
	var num2 = Math.floor(Math.random() * 10)*sign2;
	var operand = generateSignMultiplier()>0 ? "+" : "-";
	var sum = operand==="+" ? num1 + num2 : num1 - num2;
	/*
	the string for the expression will have a parentheses around num2 if num2 is neg and operand is "-"
	*/
	return {operand:operand, num1:num1, num2:num2, sum:sum};
}

function parseExpressionObject(expressionData) {
	var operand = expressionData.operand;
	var num1 = expressionData.num1;
	var num2 = expressionData.num2;
	var sum = expressionData.sum;
	var displayedExpression =
		operand==="-" && num2<0 ?
			num1+" "+operand+" ("+num2+")" :
				num1+" "+operand+" "+num2;
	return displayedExpression;
}

function checkYourAnswer() {
	var expressionSum = document.getElementById("dataDiv").getAttribute('sum');
	var submission=document.getElementById("submission").value;
	if (submission==expressionSum) {
		document.getElementById("verdict").innerHTML = "Correct!";
		document.getElementById("consecutiveCorrect").innerHTML = 
			parseInt(document.getElementById("consecutiveCorrect").innerHTML) + 1;
	} else {
		document.getElementById("consecutiveCorrect").innerHTML = 0;
		document.getElementById("verdict").innerHTML = "Wrong, Try Again!";
	}
}

function newExpression() {
	var expressionData = generateExpressionData();
	var expressionText = parseExpressionObject(expressionData);
	var expressionDOM = document.getElementById("expression");
	expressionDOM.innerHTML=expressionText;
	var dataDOM = document.getElementById("dataDiv");
	dataDOM.setAttribute('sum', expressionData.sum);
	document.getElementById("verdict").innerHTML = "";
	document.getElementById("submission").value = "";
}