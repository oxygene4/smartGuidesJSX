/* ========================================================= */
// smartGuides.jsx
// Written by Eugene Govorun
//
// This script creates guides relatively to document's size
/* ========================================================= */

// make sure active document exists
if (!app.activeDocument) return;

// save settings and customize environment 
var startRulerUnits = app.preferences.rulerUnits,
		startTypeUnits = app.preferences.typeUnits,
		startDisplayDialogs = app.displayDialogs;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;


//////////////////////////////////////////////////////////////////////
// SETUP
var d = app.activeDocument,
	w = parseInt(d.width),
	h = parseInt(d.height),
	x = Direction.HORIZONTAL,
	y = Direction.VERTICAL,
	g = d.guides,
	i = false,
	_ = 0,
	a = w == h ? [{ w: 330, h: 330, v1: 11, v2: 319, v3: 165, h1: 11, h2: 319, h3: 165 },
		{ w: 600, h: 600, v1: 20, v2: 580, v3: 300, h1: 20, h2: 580, h3: 300 },
		{ w: 800, h: 800, v1: 28, v2: 772, v3: 400, h1: 28, h2: 772, h3: 400 },
		{ w: 1000, h: 1000, v1: 35, v2: 965, v3: 500, h1: 35, h2: 965, h3: 500 },
		{ w: 1500, h: 1500, v1: 50, v2: 1450, v3: 750, h1: 50, h2: 1450, h3: 750 },
		{ w: 3000, h: 3000, v1: 100, v2: 2900, v3: 1500, h1: 100, h2: 2900, h3: 1500 }]
	: [{ w: 600, h: 400, v1: 20, v2: 580, v3: 300, h1: 20, h2: 380, h3: 200 },
		{ w: 800, h: 530, v1: 28, v2: 400, v3: 772, h1: 28, h2: 256, h3: 502 },
		{ w: 1000, h: 670, v1: 35, v2: 500, v3: 956, h1: 35, h2: 335, h3: 635 },
		{ w: 1500, h: 1000, v1: 50, v2: 750, v3: 1450, h1: 50, h2: 500, h3: 950 },
		{ w: 3000, h: 2000, v1: 100, v2: 1500, v3: 2900, h1: 100, h2: 1000, h3: 1900}];
//////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////
// WORKING CODE
function main() {
	for (; a[_]; _++) if (a[_].w == w && a[_].h == h) i = a[_];
	
	if (i) {
		g.add(y, i.v1);
		g.add(y, i.v2);
		g.add(y, i.v3);
		g.add(x, i.h1);
		g.add(x, i.h2);
		g.add(x, i.h3);
		return;
	}
	
	var m1 = "Нестандартный размер:",
		m2 = w + " x " + h,
		m3 = "Показать центральные направляющие?";
	if (confirm(m1 + "\r" + m2 + "\r\r" + m3)) {
		g.add(y, w / 2);
		g.add(x, h / 2);
	}
}

main();
//////////////////////////////////////////////////////////////////////

// restore settings 
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;
