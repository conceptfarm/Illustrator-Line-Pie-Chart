// GENERAL FUNCTIONS
function degToRad(degrees)
{
    return degrees * (Math.PI/180);
}

function colorFromRGB (r,g,b)
{
    var result = new RGBColor();
    result.red = r;
    result.green= g;
    result.blue = b;
    return result
}

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
    //return [px0,py0,px1,py1,px2,py2,px3,py3];
    // reverse the points
    return [px3,py3,px2,py2,px1,py1,px0,py0];
}

function weldArcSections(listOfArcPoints)
{
    //p1Ax, p1Ay, p1CLx, p1CLy, p2CLx, p2CLy, p2Ax, p2Ay, p2CRx, p2CRy ,      p3CLx, p3CLy , p3Ax, p3Ay, p      .....
    // encoding 10, 6, 6, 6, 6
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




function drawArc(doc, cx, cy,  startA, radius, theta)
{
    // split angles into sections of no more than 90 degrees
    var angles = splitAngle(theta, startA);
    $.writeln(angles);
    
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


// Takes list of values of each pie and a spacer angle
// Returns list of start angle and theta for each pie value
function getPieAngles(vals, spacer)
{
    function getArraySum(a)
    {
        var total=0;
        for(var i in a) { 
            total += a[i];
        }
        return total;
    } 

    var result = []
    var sum = getArraySum(vals);

     var prevStartAngle = 0;
    for (var i = 0; i < vals.length; i++)
    {
        var theta = (360*vals[i]/sum) - spacer/2.0;
        var startAngle = prevStartAngle + spacer/2.0;
        prevStartAngle = startAngle +  theta;
        result.push([startAngle, theta]);
    }
    return result;
}

// Splits arc angle into sections  of no more then 90 degrees
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

if (app.documents.length > 0) {
    
    var vals = [5, 25, 15, 8];
    
    var spacer = 5.0; // space between pie peices in degrees
    var cx = 0.0;
    var cy = 0.0;
    var radius = 150.0;
    var noColor = new NoColor();

    var doc = app.activeDocument;
    //var ellipse = doc.pathItems.ellipse(cy + radius, cx - radius, radius*2.0, radius*2.0);    
    //ellipse.strokeColor = colorFromRGB(0,0,255);
    
    var pieAngles = getPieAngles(vals, spacer);
    
    for ( var i=0; i<pieAngles.length; i++)
    {
        var arc = drawArc (doc, cx, cy,  pieAngles[i][0], radius, pieAngles[i][1]);
        arc.fillColor = noColor; 
        arc.strokeColor = colorFromRGB(Math.random()*256,Math.random()*256,Math.random()*256);
    }
}