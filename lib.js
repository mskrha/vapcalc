/*
	Prevent concurrent calculations
*/
var running = false;

/*
	Startup initialisations
*/
function init() {
	document.getElementById('in_p').addEventListener("keyup", watchKeys);
	document.getElementById('in_l').addEventListener("keyup", watchKeys);
	document.getElementById('in_s').addEventListener("keyup", watchKeys);
	document.getElementById('in_d').addEventListener("keyup", watchKeys);
	document.getElementById('in_b').addEventListener("keyup", watchKeys);
	document.getElementById('in_n').addEventListener("keyup", watchKeys);
}

/*
	Watch for pressed keys in the input text fields
*/
function watchKeys(x) {
	switch (x.keyCode) {
		case 13:	// Enter
			start();
			break;
		case 27:	// Escape
			clearInput();
			clearTables();
			break;
	}
}

/*
	Prepare and start the calculation
*/
function start() {
	if (running) {
		alert('Another calculation in progress!');
		return;
	}

	var p = parseFloat(document.getElementById('in_p').value);
	var l = parseFloat(document.getElementById('in_l').value);
	var s = parseFloat(document.getElementById('in_s').value);
	var d = parseFloat(document.getElementById('in_d').value);
	var b = parseFloat(document.getElementById('in_b').value);
	var n = parseFloat(document.getElementById('in_n').value);

	disableButton();
	clearTables();
	var data = calc(p, l, s, d, b, n);
	printTable(data);
	enableButton();
}

/*
	(b * n * s * (l - p)) / (d * l) - b

	p	flavour volume
	l	flavour bottle capacity
	s	liquid consumed per day
	d	required nicotine per day
	b	booster volume
	n	booster concentration
*/
function calc(p, l, s, d, b, n) {
	return {
		// concentration of final liquid
		'c': d / s,
		// how much booster+base to add
		'a': l - p,
		// concentration of booster+base
		'k': (d * l) / (s * (l - p)),
		// base volume to mix with booster
		'x': (b * n * s * (l - p)) / (d * l) - b
	};
}

/*
	Clear the tables with previous result
*/
function clearTables() {
	document.getElementById('clear').disabled = true;
	var p = document.getElementById('output');
	while (p.firstChild) {
		p.removeChild(p.firstChild);
	}
	document.getElementById('clear').disabled = false;
}

/*
	Clear all input fields
*/
function clearInput() {
	document.getElementById('in_p').value = '';
	document.getElementById('in_l').value = '';
	document.getElementById('in_s').value = '';
	document.getElementById('in_d').value = '';
	document.getElementById('in_b').value = '';
	document.getElementById('in_n').value = '';
}

/*
	Create the results table
*/
function printTable(d) {
	var p = document.getElementById('output');

	var table = document.createElement('table');
	table.border = "0";
	table.cellSpacing = "2";
	table.cellPadding = "5";
	p.appendChild(table);



	var tr3 = document.createElement('tr');
	table.appendChild(tr3);

	var td3a = document.createElement('td');
	td3a.innerHTML = 'Koncentrace nikotinu v báze+booster';
	td3a.align = 'right';
	tr3.appendChild(td3a);

	var td3b = document.createElement('td');
	td3b.innerHTML = '<b>' + d.k.toLocaleString() + '</b> mg/ml';
	tr3.appendChild(td3b);



	var tr1 = document.createElement('tr');
	table.appendChild(tr1);

	var td1a = document.createElement('td');
	td1a.innerHTML = 'Koncentrace nikotinu v liquidu';
	td1a.align = 'right';
	tr1.appendChild(td1a);

	var td1b = document.createElement('td');
	td1b.innerHTML = '<b>' + d.c.toLocaleString() + '</b> mg/ml';
	tr1.appendChild(td1b);



	var tr2 = document.createElement('tr');
	table.appendChild(tr2);

	var td2a = document.createElement('td');
	td2a.innerHTML = 'Do příchutě přidat';
	td2a.align = 'right';
	tr2.appendChild(td2a);

	var td2b = document.createElement('td');
	td2b.innerHTML = '<b>' + d.a.toLocaleString() + '</b> ml báze+booster';
	tr2.appendChild(td2b);



	var tr5 = document.createElement('tr');
	table.appendChild(tr5);
	tr5.appendChild(document.createElement('td'));
	tr5.appendChild(document.createElement('td'));



	var tr4 = document.createElement('tr');
	table.appendChild(tr4);

	var td4a = document.createElement('td');
	td4a.innerHTML = 'K boosteru přidat';
	td4a.align = 'right';
	tr4.appendChild(td4a);

	var td4b = document.createElement('td');
	td4b.innerHTML = '<b>' + d.x.toLocaleString() + '</b> ml báze';
	tr4.appendChild(td4b);
}

/*
	Enable the calculate button
*/
function enableButton() {
	document.getElementById('run').disabled = false;
	running = false;
}

/*
	Disable the calculate button
*/
function disableButton() {
	document.getElementById('run').disabled = true;
	running = true;
}
