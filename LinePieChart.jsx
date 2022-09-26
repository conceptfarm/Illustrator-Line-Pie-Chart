// TODO: 
// maintain spacing when lineweight is increased and cap is set to round

///////////////////////
// GENERAL FUNCTIONS //
///////////////////////
function degToRad(degrees)
{
    return degrees * (Math.PI/180);
}

function radToDeg(rads)
{
    return rads * (180.0/Math.PI);
}

function getArraySum(a)
{
    var total=0;
    for(var i in a) { 
        total += a[i];
    }
    return total;
} 

// Colour object from r g b values 0-255
function colorFromRGB (r,g,b)
{
    var result = new RGBColor();
    result.red = r;
    result.green= g;
    result.blue = b;
    return result;
}

///////////////////////////
// GEOMETRY CALCULATIONS //
///////////////////////////

// Polar to Cartesian conversion
// radius: circle radius
// theta: polar coordinate in degrees
// cx: x value of circle centre
// cy: y value of circle centre
// Return an object with x and y members cartesian coordinates
function polarToCart(cx, cy, radius, theta)
{
    theta = degToRad(theta);
    
    var x = cx + (radius * Math.cos(theta));
    var y = cy + (radius * Math.sin(theta));

    return {"x": x, "y": y};    
}

// Finds Circle Line Intersection
// radius: circle radius
// theta: line direction in degrees
// cx: x value of circle centre
// cy: y value of circle centre
// n: y-intercept
// Return an object with x and y members for the intersection
function findCircleLineIntersections( cx, cy, radius, theta, n) 
{
    // circle: (x - cx)^2 + (y - cy)^2 = radius^2
    // line: y = m * x + n
    // m: slope
    var m = Math.tan(degToRad(theta));

    // get a, b, c values
    var a = 1.0 + (m*m);
    var b = -cx * 2.0 + (m * (n - cy)) * 2.0;
    var c = (cx*cx) + ((n - cy)*(n - cy)) - (radius*radius);

    // get discriminant
    var d = (b*b) - 4.0 * a * c;
   
    if (d >= 0) {
        // insert into quadratic formula
        var x1 = (-b + Math.sqrt((b*b) - 4.0 * a * c)) / (2.0 * a);
        var y1 = m*x1 + n;
        var x2 = (-b - Math.sqrt((b*b) - 4.0 * a * c)) / (2.0 * a)
        var y2 = m*x2 + n;
        var intersections = { "x": x1,"y": y1 };
        
        if (theta > 90 && theta < 270)
        {
            intersections = { "x": x2,"y": y2 };
        }
        
        if (d == 0) {
            // only 1 intersection
            return { "x": x1,"y": y1 };
        }

        return intersections;
    }
    // no intersection
    return [];
}


// Finds the intersection point between
// the rectangle with parallel sides to the x and y axes 
// and the half-line pointing towards (x,y)
// originating from the centre of the rectangle

// x:Number x coordinate of point to build the half-line from
// y:Number y coordinate of point to build the half-line from
// cx:Number x coordinate center of the rectangle
// cy:Number y coordinate center of the rectangle
// w:Number the width of the rectangle
// h:Number the height of the rectangle
// Return an object with x and y members for the intersection

// http://stackoverflow.com/a/31254199/253468 source
// http://stackoverflow.com/a/18292964/253468 based on

function findRectLineIntersection(cx, cy, w, h, x, y) 
{
    var minX = cx - w/2.0; // left
    var maxX = cx + w/2.0; // right
    var minY = cy - h/2.0; // top
    var maxY = cy + h/2.0; // bottom

	var midX = (minX + maxX) / 2.0;
	var midY = (minY + maxY) / 2.0;
	// if (midX - x == 0) -> m == ±Inf -> minYx/maxYx == x (because value / ±Inf = ±0)
	var m = (midY - y) / (midX - x);

	if (x <= midX) 
    { // check "left" side
		var minXy = m * (minX - x) + y;
		if (minY <= minXy && minXy <= maxY)
			return {"x": minX, "y": minXy};
	}

	if (x >= midX) 
    { // check "right" side
		var maxXy = m * (maxX - x) + y;
		if (minY <= maxXy && maxXy <= maxY)
			return {"x": maxX, "y": maxXy};
	}

	if (y <= midY) 
    { // check "top" side
		var minYx = (minY - y) / m + x;
		if (minX <= minYx && minYx <= maxX)
			return {"x": minYx, "y": minY};
	}

	if (y >= midY) 
    { // check "bottom" side
		var maxYx = (maxY - y) / m + x;
		if (minX <= maxYx && maxYx <= maxX)
			return {"x": maxYx, "y": maxY};
	}

	// edge case when finding midpoint intersection: m = 0/0 = NaN
	if (x === midX && y === midY) return {"x": x, "y": y};

	// Should never happen :) If it does, please tell me!
	throw "Cannot find intersection for " + [x,y]
	    + " inside rectangle " + [minX, minY] + " - " + [maxX, maxY] + ".";
}

// Finds the intersection point between
// the rounded rectangle with parallel sides to the x and y axes 
// and the half-line pointing towards (x,y)
// originating from the centre of the rectangle

// x:Number x coordinate of point to build the half-line from
// y:Number y coordinate of point to build the half-line from
// cx:Number x coordinate center of the rectangle
// cy:Number y coordinate center of the rectangle
// radius: radius of the rounded corners
// theta: direction of line pointing from the centre out in degrees
// w:Number the width of the flat sections of rectangle
// h:Number the height of the flat sections of rectangle
// w, h are inner box dimesions
// the overall dimension is r + w + r / r + h + r
// Return an object with x and y members for the intersection

function findRoundedBoxLineIntersection (cx, cy, w, h, radius, theta, debug)
{
    var intersectionPoints;

    // get angle at which the side becomes flat
    var flatAngle = radToDeg(Math.atan(w/2.0)/(w/2.0+radius));
       
    // arbitrary length line to calculate intersection
    var lineEndPoint = polarToCart(0, 0, (radius*1.5), theta); 

    switch(true) 
    {
        // flat sides
        case ((theta > 0 && theta < flatAngle) || 
        (theta > 360-flatAngle && theta < 360) || 
        (theta > 90-flatAngle && theta < 90+flatAngle) || 
        (theta > 180-flatAngle && theta < 180+flatAngle) ||
        (theta > 270-flatAngle && theta < 270+flatAngle)) : 
        {
            var tempIntersectionPoints = findRectLineIntersection(0, 0, (w+2*radius), (w+2*radius), lineEndPoint['x'], lineEndPoint['y']) 
            intersectionPoints = {"x": tempIntersectionPoints["x"] + cx , "y": tempIntersectionPoints["y"] + cy };
            break;
        }
       
        // upper right
        case (theta > flatAngle && theta < 90-flatAngle) : 
        {
            var tempIntersectionPoints = findCircleLineIntersections( w/2.0, w/2.0, radius, theta, 0.0)
            intersectionPoints = {"x": tempIntersectionPoints["x"] + cx , "y": tempIntersectionPoints["y"] + cy };
            break;
        }
        
        // upper left
        case (theta > 90+flatAngle && theta < 180-flatAngle) :         
        {
            var tempIntersectionPoints = findCircleLineIntersections( -w/2.0, w/2.0, radius, theta, 0.0)
            intersectionPoints = {"x": tempIntersectionPoints["x"] + cx , "y": tempIntersectionPoints["y"] + cy };
            break;
        }
       
        // lower left
        case (theta > 180+flatAngle && theta < 270-flatAngle) :         
        {
            var tempIntersectionPoints = findCircleLineIntersections( -w/2.0, -w/2.0, radius, theta, 0.0)
            intersectionPoints = {"x": tempIntersectionPoints["x"] + cx , "y": tempIntersectionPoints["y"] + cy };
            break;
        }
       
        // lower right
        case (theta > 270+flatAngle && theta < 360-flatAngle) :         
        {
            var tempIntersectionPoints = findCircleLineIntersections( w/2.0, -w/2.0, radius, theta, 0.0)
            intersectionPoints = {"x": tempIntersectionPoints["x"] + cx , "y": tempIntersectionPoints["y"] + cy };
            break;
        }
    }
    if (debug)
    {
        var doc = app.activeDocument;
        var noColor = new NoColor();
        var lineObj = doc.pathItems.add(); 

        newPoint = lineObj.pathPoints.add();              
        newPoint.leftDirection = [ cx, cy ]; 
        newPoint.anchor = [cx, cy ];
        newPoint.rightDirection = [ cx, cy ];

        newPoint = lineObj.pathPoints.add();
        newPoint.leftDirection = [ lineEndPoint['x'] + cx, lineEndPoint['y'] + cy ];
        newPoint.anchor = [ lineEndPoint['x'] + cx, lineEndPoint['y'] + cy ];
        newPoint.rightDirection = [ lineEndPoint['x'] + cx, lineEndPoint['y'] + cy ];
        
        var roundBox = doc.pathItems.roundedRectangle(cy + (radius*2+w)/2, cx - (radius*2+w)/2, radius*2.0+w, radius*2.0+h, radius, radius);    
        roundBox.strokeColor = colorFromRGB(0,0,255);
        roundBox.fillColor = noColor; 
        
        x = intersectionPoints["x"];
        y = intersectionPoints["y"];
        $.writeln(x);
        $.writeln(y);
        var testEllipse = doc.pathItems.ellipse( (y + .5), (x - .5), (2*.5), (2*.5));    
    }
    return intersectionPoints;
}

// Computes an approximation of an arc as bezier curve
// Returns an array of 4 points (8 values)
function computeArc(cx, cy,  startA, radius, theta)
{
    // clockwise arc
    // http://www.flong.com/blog/2009/bezier-approximation-of-a-circular-arc-in-processing/
    // Establish arc parameters.
    // (Note: assert theta != TWO_PI)
    var theta = degToRad(theta); // spread of the arc.
    var startAngle = degToRad(startA); // as in arc()
    var endAngle = startAngle + theta;    // as in arc()

    // Compute raw Bezier coordinates.
    var x0 = Math.cos(theta/2.0);
    var y0 = Math.sin(theta/2.0);
    var x3 = x0;
    var y3 = 0-y0;
    var x1 = (4.0-x0)/3.0;
    var y1 = ((1.0-x0)*(3.0-x0))/(3.0*y0); // y0 != 0...
    var x2 = x1;
    var y2 = 0-y1;

    // Compute rotationally-offset Bezier coordinates, using:
    // x' = cos(angle) * x - sin(angle) * y;
    // y' = sin(angle) * x + cos(angle) * y;
    var bezAng = startAngle + theta/2.0;
    var cBezAng = Math.cos(bezAng);
    var sBezAng = Math.sin(bezAng);
    var rx0 = cBezAng * x0 - sBezAng * y0;
    var ry0 = sBezAng * x0 + cBezAng * y0;
    var rx1 = cBezAng * x1 - sBezAng * y1;
    var ry1 = sBezAng * x1 + cBezAng * y1;
    var rx2 = cBezAng * x2 - sBezAng * y2;
    var ry2 = sBezAng * x2 + cBezAng * y2;
    var rx3 = cBezAng * x3 - sBezAng * y3;
    var ry3 = sBezAng * x3 + cBezAng * y3;

    // Compute scaled and translated Bezier coordinates.
    px0 = cx + radius*rx0;
    py0 = cy + radius*ry0;

    px1 = cx + radius*rx1;
    py1 = cy + radius*ry1;

    px2 = cx + radius*rx2;
    py2 = cy + radius*ry2;

    px3 = cx + radius*rx3;
    py3 = cy + radius*ry3;
        
    // p1Ax, p1Ay, p1Cx , p1Cy, p2Cx, p2Cy, p2Ax, p2Ay    
    // return [px0,py0,px1,py1,px2,py2,px3,py3];
    // reverse the points
    return [px3,py3,px2,py2,px1,py1,px0,py0];
}

// Welds arc sections
// Returns a stream of bezier points
// p1Ax, p1Ay, p1CLx, p1CLy, p2CLx, p2CLy, p2Ax, p2Ay, p2CRx, p2CRy ,      p3CLx, p3CLy , p3Ax, p3Ay, p      .....
// encoding 10, 6, 6, 6, 6
function weldArcSections(listOfArcPoints)
{
    var result = [];
    for (var i=0; i< listOfArcPoints.length; i++)
    {
        var arc = listOfArcPoints[i];

        var nextControlPoint = [null, null];
       
        if (i+ 1 != listOfArcPoints.length)
        {
            nextControlPoint = [listOfArcPoints[i+1][2], listOfArcPoints[i+1][3]]; // next point's control points
        }
        
        if (i == 0)
        {
            result=result.concat( [ arc[0],arc[1], arc[2],arc[3], arc[4],arc[5], arc[6],arc[7] ] );
        }
        else
        {
           result= result.concat( [ arc[4], arc[5], arc[6],arc[7] ] ); // next arc's p2 control point and p2 anchor point
        }
        
        result = result.concat(nextControlPoint);
    }
    return result;
}

// Draw the actual arc using parameters
// Returns the arc object
function drawArc(doc, cx, cy, startA, radius, theta)
{
    // split angles into sections of no more than 90 degrees
    var angles = splitAngle(theta, startA);
    
    // calculate each individual arc section
    var listOfArcPoints = [];    
    for (var i = 0; i < angles.length; i++)
    {
        if (i > 0)
        {
            startA = angles[i-1];
            theta =  angles[i] - angles[i-1];
        }
        else
        {
            theta = angles[0] - startA;
        }
        var points = computeArc(cx, cy,  startA, radius, theta);
        listOfArcPoints.push(points);
    }
    
    // weld arc sections to one stream of bezier points
    var pointStream = weldArcSections(listOfArcPoints);
    
    // Start drawing the arc
    var arcObj = doc.pathItems.add(); 

    newPoint = arcObj.pathPoints.add();              
    newPoint.leftDirection = [ pointStream[0],pointStream[1] ]; // could be ignored but just set it to the same pos as anchor for prettiness
    newPoint.anchor = [ pointStream[0],pointStream[1] ];
    newPoint.rightDirection = [ pointStream[2], pointStream[3] ];

    newPoint = arcObj.pathPoints.add();
    newPoint.leftDirection = [ pointStream[4], pointStream[5] ];
    newPoint.anchor = [ pointStream[6], pointStream[7]] ;
    
    if (pointStream[8] != null)
    {
        newPoint.rightDirection = [ pointStream[8],pointStream[9] ];
    }
    else
    {
        // could be ignored but just set it to the same pos as anchor for prettiness            
        newPoint.rightDirection = [ pointStream[6], pointStream[7]] ;
    }
   
    for (var i = 10; i < pointStream.length; i= i+6)
    {
        newPoint = arcObj.pathPoints.add();              
        //newPoint.leftDirection = [px1,py1]; // ignore for the first point
        newPoint.leftDirection = [ pointStream[i], pointStream[i + 1] ];        
        newPoint.anchor = [ pointStream[i+2],pointStream[i + 3] ];

        if (pointStream[i + 4] != null)
        {
            newPoint.rightDirection = [ pointStream[i + 4], pointStream[i + 5] ];
        }
        else
        {
            // could be ignored but just set it to the same pos as anchor for prettiness            
            newPoint.rightDirection =  [ pointStream[i+2],pointStream[i + 3] ];
        }
    }

    return arcObj;
}

// Takes center of the pie, radius, angle and text string and colour
// Draws the text based on angle polar position
// Returns text box object
function drawText(doc, cx, cy, radius, theta, textString, textColour)
{
    // Additional text padding away from the pie
    // chart in percent of radius 
    var textOffset = 1.03;
    var textBox = doc.textFrames.add();
    textBox.contents  = textString;
    applyCharSize(textBox, (0.1*radius));
    applyCharColour(textBox, textColour);
    
    // Get textbox inscribe radius after text sizing
    var textInscribeRadius = Math.sqrt(Math.pow(textBox.width/2.0, 2) + Math.pow(textBox.height/2.0, 2))
        
    // Assign paragraph style before the final position
    // Paragraph style changes the anchor point of the text box
    var justificationStyle = getAnchor (theta, textBox);
    applyParaStyle(textBox, justificationStyle["style"]);
    
    // To calculate a touching rectangle centre against a circle we calculate
    // the rounded box with flats the width of the rectange and radius corners
    // the size of the circle we try to touch
    var textBoxPos = findRoundedBoxLineIntersection (cx, cy, textBox.height, textBox.height, radius*textOffset, theta, false);
       
    textBox.left = textBoxPos["x"]- justificationStyle["x"]; 
    textBox.top = textBoxPos["y"] + justificationStyle["y"]; 

    return textBox;
}

// Takes text box and justification paragraph style
// No return, just assigns the style
function applyParaStyle(textBox, style)
{
    var iCount = textBox.paragraphs.length;
    for (var i = 0; i < iCount; i++) 
    {
        textBox.paragraphs[i].paragraphAttributes.justification = style;
    }
}

// Takes text box and rgb colour object 
// No return, just assigns the colour to the text
function applyCharColour(textBox, colour)
{
    var iCount = textBox.textRange.characters.length;
    for (var i = 0; i < iCount; i++) 
    {
        textBox.textRange.characters[i].characterAttributes.fillColor = colour;
    }
}

// Takes text box and size in points
// No return, just assigns the size to the text
function applyCharSize(textBox, size)
{
    var iCount = textBox.textRange.characters.length;
    for (var i = 0; i < iCount; i++) 
    {
        textBox.textRange.characters[i].characterAttributes.size = size;
    }
}

// Tekes an angle of the position of the text box and text box itself
// Returns text box offset based and text justification
// Makes sure text is always pointing away from the center of the pie circle
function getAnchor(theta, textBox) 
{
    var justificationStyle;

    switch(true) 
    {
        case ((theta >= 0 && theta <= 90) || (theta >= 270 && theta <= 360)) : justificationStyle =  {"style": Justification.LEFT, "x": textBox.height/2.0, "y": textBox.height/2.0 }; break;

        case (theta > 90 && theta < 270) : justificationStyle =  {"style": Justification.RIGHT, "x": textBox.width - textBox.height/2.0, "y": textBox.height/2.0 } ; break;
    }

    return justificationStyle;
}
/*
function getAnchor_old(theta, textBox) 
{
    var justificationStyle;

    // +/- off axial angles in degrees where the text alignment is centred
    var angleVar = 2.5; 
    switch(true) 
    {
        case ((theta > 0 && theta < angleVar) || (theta > 360-angleVar && theta < 360)) : justificationStyle =  Justification.LEFT ; break;

        case (theta > angleVar && theta < 90-angleVar) : justificationStyle = Justification.LEFT ; break;

        case (theta > 90-angleVar && theta < 90+angleVar) : justificationStyle =  Justification.CENTER ; break;

        case (theta > 90+angleVar && theta < 180-angleVar) : justificationStyle = Justification.RIGHT ; break;

        case (theta > 180-angleVar && theta < 180+angleVar) : justificationStyle = Justification.RIGHT ; break;

        case (theta > 180+angleVar && theta < 270-angleVar) : justificationStyle = Justification.RIGHT ; break;

        case (theta > 270-angleVar && theta < 270+angleVar) : justificationStyle = Justification.CENTER ; break;

        case (theta > 270+angleVar && theta < 360-angleVar) : justificationStyle = Justification.LEFT ; break;
    }

    return justificationStyle;
}
*/

// Takes list of values of each pie and a spacer angle
// Returns list of start angle and theta for each pie value
function getPieAngles(vals, sum, spacer)
{ 
    var result = [];
    var prevStartAngle = 0;
    for (var i = 0; i < vals.length; i++)
    {
        var theta = ((360.0-vals.length*spacer)*vals[i]/sum);
        var startAngle = prevStartAngle + spacer/2.0; 
        prevStartAngle = startAngle +  theta + spacer/2.0;
        result.push([startAngle, theta]);
    }
    return result;
}

// Splits arc angle into sections of no more then 90 degrees
// Returns list of end angles of each section
function splitAngle(angle, startAngle)
{
    var result = [];    
    var angle90s = Math.floor(angle/90.0);
   
    for (var i = 0; i < angle90s; i++)
    {
        result.push(((i+1)*90)+startAngle);
    }
    result.push(angle+startAngle);
    
    return result
}

// Main function
// doc: document object to draw on
// vals: list of float values of the pie chart
// spacer: float in degrees of the space between the pie pieces
// cx: float pie centre x position
// cy: float pie centre y position
// radius: float radius of the pie chart
// pieDataUnitList: list of strings representing units of each pie value
// piePercent: boolean if true represent each value as a percent 
// pieStrokeWeight: float the thickness of the line of the pie chart
// pieCapType: cap type object - sets the cap of the line of the pie chart
// pieSwatchList: list of swatch objects containing the swatch colours to use for pie pieces
function createPieChart(doc, vals, spacer, cx, cy, radius, pieDataUnitList, piePercent , pieStrokeWeight, pieCapType, pieSwatchList)
{
    if (app.documents.length > 0) 
    {
        var noColor = new NoColor();
        //var doc = app.activeDocument;
        //var ellipse = doc.pathItems.ellipse(cy + radius, cx - radius, radius*2.0, radius*2.0);    
        //ellipse.strokeColor = colorFromRGB(0,0,255);
        

        var valSum = getArraySum(vals);
        var pieAngles = getPieAngles(vals, valSum, spacer);
        var pieGroup = doc.groupItems.add();
        
        for ( var i = 0; i < pieAngles.length; i++)
        {
            var arc = drawArc (doc, cx, cy,  pieAngles[i][0], radius, pieAngles[i][1]);
            
            arc.fillColor = noColor; 
            var arcColour;
            if (pieSwatchList === null)
            {
                arcColour = colorFromRGB(Math.random()*255,Math.random()*255,Math.random()*255);
            }
            else
            {
                var _index = i % pieSwatchList.length;
                arcColour = pieSwatchList[_index].color;
            }

            arc.strokeColor = arcColour;
            arc.strokeCap = pieCapType;
            arc.strokeWidth = pieStrokeWeight;
            arc.moveToEnd(pieGroup);
            
            
            var pieText = vals[i];
            if ( pieDataUnitList !== "" )
            {
                if (pieDataUnitList[i] !== "")
                {
                    pieText = pieText + "\n" + pieDataUnitList[i];
                }
            }

            if (piePercent)
            {
                pieText = Math.floor(vals[i]/valSum * 100) + "%";
            }
            var nt = drawText(doc, cx, cy, (radius + pieStrokeWeight/2.0), (pieAngles[i][0] + pieAngles[i][1]/2.0), pieText, arcColour); 
            nt.moveToEnd(pieGroup);       
        }
    }
    else
    {
        alert("No active document found.");

    }
}