
//#target Illustrator;
#targetengine main;
/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"activeId":8,"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":false,"minimizeButton":false,"independent":false,"closeButton":true,"borderless":false,"resizeable":false},"text":"Line Pie Chart Maker","preferredSize":[0,0],"margins":16,"orientation":"row","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-2":{"id":2,"type":"Panel","parentId":1,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Pie Chart Props","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-3":{"id":3,"type":"StaticText","parentId":2,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Chart Data (Comma Separated)","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":"Comma separated values, decimals allowed - no negative numbers or letter."}},"item-4":{"id":4,"type":"EditText","parentId":2,"style":{"enabled":true,"varName":"pieData_edit","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"5, 10 , 30, 40, 80.5","justify":"left","preferredSize":[255,0],"alignment":null,"helpTip":"Comma separated values, decimals allowed - no negative numbers or letter."}},"item-5":{"id":5,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"column","spacing":14,"alignChildren":["left","center"],"alignment":null}},"item-7":{"id":7,"type":"StaticText","parentId":2,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Chart Centre","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"EditText","parentId":10,"style":{"enabled":true,"varName":"pieX_edit","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"0","justify":"left","preferredSize":[64,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"EditText","parentId":10,"style":{"enabled":true,"varName":"pieY_edit","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"0","justify":"left","preferredSize":[64,0],"alignment":null,"helpTip":null}},"item-10":{"id":10,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":7,"alignChildren":["left","center"],"alignment":null}},"item-11":{"id":11,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"X:","justify":"left","preferredSize":[10,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Y:","justify":"left","preferredSize":[10,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Divider","parentId":2,"style":{"enabled":true,"varName":null}},"item-14":{"id":14,"type":"StaticText","parentId":16,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Chart Radius: ","justify":"left","preferredSize":[128,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"Divider","parentId":2,"style":{"enabled":true,"varName":null}},"item-16":{"id":16,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-17":{"id":17,"type":"EditText","parentId":16,"style":{"enabled":true,"varName":"pieRadius_edit","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"300","justify":"left","preferredSize":[64,0],"alignment":null,"helpTip":null}},"item-18":{"id":18,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-19":{"id":19,"type":"StaticText","parentId":18,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Data Units","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":"Add name of the units to display beside each number in the pie chart."}},"item-20":{"id":20,"type":"EditText","parentId":18,"style":{"enabled":true,"varName":"pieDataUnits_edit","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"apples , oranges, etc.","justify":"left","preferredSize":[0,0],"alignment":null,"helpTip":"Add name of the units to display beside each number in the pie chart."}},"item-21":{"id":21,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":0,"alignChildren":["left","center"],"alignment":null}},"item-22":{"id":22,"type":"StaticText","parentId":21,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"Pie Piece Spacing:","justify":"left","preferredSize":[128,0],"alignment":null,"helpTip":"Space between pie slices in degrees"}},"item-23":{"id":23,"type":"EditText","parentId":21,"style":{"enabled":true,"varName":"pieSpacer_edit","creationProps":{"noecho":false,"readonly":false,"multiline":false,"scrollable":false,"borderless":false,"enterKeySignalsOnChange":false},"softWrap":false,"text":"3","justify":"left","preferredSize":[64,0],"alignment":null,"helpTip":"Space between pie slices in degrees"}},"item-24":{"id":24,"type":"StaticText","parentId":16,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"px","justify":"right","preferredSize":[20,0],"alignment":null,"helpTip":null}},"item-25":{"id":25,"type":"StaticText","parentId":21,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"°","justify":"center","preferredSize":[20,0],"alignment":null,"helpTip":null}},"item-26":{"id":26,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"ok_button","text":"OK","justify":"center","preferredSize":[64,0],"alignment":null,"helpTip":null}},"item-27":{"id":27,"type":"Button","parentId":5,"style":{"enabled":true,"varName":"cancel_button","text":"Cancel","justify":"center","preferredSize":[64,0],"alignment":null,"helpTip":null}},"item-28":{"id":28,"type":"StaticText","parentId":10,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":"px","justify":"left","preferredSize":[16,0],"alignment":null,"helpTip":null}},"item-29":{"id":29,"type":"Group","parentId":2,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-30":{"id":30,"type":"Checkbox","parentId":29,"style":{"enabled":true,"varName":null,"text":"Display percentages","preferredSize":[140,0],"alignment":null,"helpTip":"When checked pie chart will show percentage instead of data values."}}},"order":[0,1,2,3,4,18,19,20,29,30,13,7,10,11,8,12,9,28,15,16,14,17,24,21,22,23,25,5,26,27],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"}}
*/ 


(function()
{
    // Pie chart functions
    #include "LinePieChart.jsx"; 
    
    // vars for input validation
    var pieData = true;
    var pieRadius = true;
    var pieX = true;
    var pieY = true;
    var pieSpacer = true;

    var pieDataList = [5, 10 , 30, 40, 80.5];


// DIALOG
// ======
var dialog = new Window("dialog", "Line Pie Chart Maker", undefined); 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "column"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = 0; 

// PIE DATA
// ======
var panel1 = group1.add("panel", undefined, undefined, {name: "panel1"}); 
    panel1.text = "Pie Chart Props"; 
    panel1.orientation = "column"; 
    panel1.alignChildren = ["left","top"]; 
    panel1.spacing = 10; 
    panel1.margins = 10; 

var statictext1 = panel1.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.helpTip = "Comma separated values, decimals allowed - no negative numbers or letters."; 
    statictext1.text = "Chart Data (Comma Separated)"; 

var firstRunPieData = true;
var pieData_edit = panel1.add('edittext {properties: {name: "pieData_edit"}}'); 
    pieData_edit.helpTip = "Comma separated values, decimals allowed - no negative numbers or letters."; 
    pieData_edit.text = "5, 10 , 30, 40, 80.5"; 
    pieData_edit.preferredSize.width = 255; 
    pieData_edit.onActivate = function()
    {
        if (firstRunPieData)
        {
            this.text = "";
            pieOK_button.enabled = false;
            pieData = false;
            firstRunPieData = false;
        }
    };
    pieData_edit.addEventListener ('keydown', keyboardPositiveFloatList, false);
    pieData_edit.onChange = function() 
    {
        var stringList = this.text.split(",");
        var floatList = [];
        for (var i = 0; i < stringList.length; i++)
        {
            var number = parseFloat(stringList[i]);
            if (number !== NaN)
            {
                floatList.push(number);
            }
            else
            {
                alert(stringList[i] + " is not a valid number.");
                break;
            }
        }
        
        if (this.text != "") {pieData = true;}
        pieDataList = floatList;
        validateInputs(pieOK_button);
    };

// PIE UNITS
// ======
var group2 = panel1.add("group", undefined, {name: "group2"}); 
    group2.orientation = "row"; 
    group2.alignChildren = ["left","center"]; 
    group2.spacing = 10; 
    group2.margins = 0; 

var pieDataUnits_txt = group2.add("statictext", undefined, undefined, {name: "pieDataUnits_txt"}); 
    pieDataUnits_txt.helpTip = "Add name of the units to display beside each number in the pie chart."; 
    pieDataUnits_txt.text = "Data Units"; 

var firstRunPieDataUnits = true;
var pieDataUnits_edit = group2.add('edittext {properties: {name: "pieDataUnits_edit"}}'); 
    pieDataUnits_edit.helpTip = "Add name of the units to display beside each number in the pie chart."; 
    pieDataUnits_edit.text = "apples , oranges, etc."; 
    pieDataUnits_edit.onActivate = function()
    {
        if (firstRunPieDataUnits)
        {
            this.text = "";
            firstRunPieDataUnits = false;
        }
    };
    pieDataUnits_edit.onChange = function()
    {
        validateInputs(pieOK_button);
    }

// PIE PERCENT DISPLAY
// ======
var group3 = panel1.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var pieDisplayPercent_chbx = group3.add("checkbox", undefined, undefined, {name: "pieDisplayPercent_chbx"}); 
    pieDisplayPercent_chbx.helpTip = "When checked pie chart will show percentage instead of data values."; 
    pieDisplayPercent_chbx.text = "Display percentages"; 
    pieDisplayPercent_chbx.preferredSize.width = 140; 
    pieDisplayPercent_chbx.onClick = function()
    {
        pieDataUnits_edit.enabled = !this.value;
        pieDataUnits_txt.enabled = !this.value;
        validateInputs(pieOK_button);
    };

// PANEL1
// ======
var divider1 = panel1.add("panel", undefined, undefined, {name: "divider1"}); 
    divider1.alignment = "fill"; 

var statictext3 = panel1.add("statictext", undefined, undefined, {name: "statictext3"}); 
    statictext3.text = "Chart Centre"; 

// PIE X/Y COORDINATES
// ======
var group4 = panel1.add("group", undefined, {name: "group4"}); 
    group4.orientation = "row"; 
    group4.alignChildren = ["left","center"]; 
    group4.spacing = 7; 
    group4.margins = 0; 

var statictext4 = group4.add("statictext", undefined, undefined, {name: "statictext4"}); 
    statictext4.text = "X:"; 
    statictext4.preferredSize.width = 10; 

var pieX_edit = group4.add('edittext {properties: {name: "pieX_edit"}}'); 
    pieX_edit.text = "0"; 
    pieX_edit.preferredSize.width = 64; 
    pieX_edit.addEventListener ('keydown', keyboardFloat, false);
    pieX_edit.onChange = function()
    {
        if (this.text == "") {this.text = "0"}
        if (parseFloat(this.text) !== NaN)
        {
            pieX = true;
        }
        else
        {
            alert(this.text + " is not a valid number.");
            pieX = false;
        }
    
        validateInputs(pieOK_button);
    }

var statictext5 = group4.add("statictext", undefined, undefined, {name: "statictext5"}); 
    statictext5.text = "Y:"; 
    statictext5.preferredSize.width = 10; 

var pieY_edit = group4.add('edittext {properties: {name: "pieY_edit"}}'); 
    pieY_edit.text = "0"; 
    pieY_edit.preferredSize.width = 64; 
    pieY_edit.addEventListener ('keydown', keyboardFloat, false);
    pieY_edit.onChange = function()
    {
        if (this.text == "") {this.text = "0"}
        if (parseFloat(this.text) !== NaN)
        {
            pieY = true;
        }
        else
        {
            alert(this.text + " is not a valid number.");
            pieY = false;
        }
    
        validateInputs(pieOK_button);
    }

var statictext6 = group4.add("statictext", undefined, undefined, {name: "statictext6"}); 
    statictext6.text = "px"; 
    statictext6.preferredSize.width = 16; 

// PANEL1
// ======
var divider2 = panel1.add("panel", undefined, undefined, {name: "divider2"}); 
    divider2.alignment = "fill"; 

// PIE RADIUS
// ======
var group5 = panel1.add("group", undefined, {name: "group5"}); 
    group5.orientation = "row"; 
    group5.alignChildren = ["left","center"]; 
    group5.spacing = 0; 
    group5.margins = 0; 

var statictext7 = group5.add("statictext", undefined, undefined, {name: "statictext7"}); 
    statictext7.text = "Chart Radius: "; 
    statictext7.preferredSize.width = 128; 

var pieRadius_edit = group5.add('edittext {properties: {name: "pieRadius_edit"}}'); 
    pieRadius_edit.text = "300"; 
    pieRadius_edit.preferredSize.width = 64;
    pieRadius_edit.addEventListener ('keydown', keyboardPositiveFloat, false);
    pieRadius_edit.onChange = function()
    {
        if (this.text == "") {this.text = "300"}
        if (parseFloat(this.text) !== NaN)
        {
            pieRadius = true;
        }
        else
        {
            alert(this.text + " is not a valid number.");
            pieRadius = false;
        }
    
        validateInputs(pieOK_button);
    }
    

var statictext8 = group5.add("statictext", undefined, undefined, {name: "statictext8"}); 
    statictext8.text = "px"; 
    statictext8.preferredSize.width = 20; 
    statictext8.justify = "right"; 

// PIE SPACING
// ======
var group6 = panel1.add("group", undefined, {name: "group6"}); 
    group6.orientation = "row"; 
    group6.alignChildren = ["left","center"]; 
    group6.spacing = 0; 
    group6.margins = 0; 
 
var statictext9 = group6.add("statictext", undefined, undefined, {name: "statictext9"}); 
    statictext9.helpTip = "Space between pie slices in degrees"; 
    statictext9.text = "Pie Piece Spacing:"; 
    statictext9.preferredSize.width = 128; 

var pieSpacer_edit = group6.add('edittext {properties: {name: "pieSpacer_edit"}}'); 
    pieSpacer_edit.helpTip = "Space between pie slices in degrees"; 
    pieSpacer_edit.text = "3"; 
    pieSpacer_edit.preferredSize.width = 64; 
    pieSpacer_edit.addEventListener ('keydown', keyboardPositiveFloat, false);
    pieSpacer_edit.onChange = function()
    {
        if (this.text == "") {this.text = "3"}
        if (parseFloat(this.text) !== NaN)
        {
            pieSpacer = true;
        }
        else
        {
            alert(this.text + " is not a valid number.");
            pieSpacer = false;
        }
    
       validateInputs(pieOK_button);
    }

var statictext10 = group6.add("statictext", undefined, undefined, {name: "statictext10"}); 
    statictext10.text = "°"; 
    statictext10.preferredSize.width = 20; 
    statictext10.justify = "center"; 

// OK / Canel Buttons
// ======
var group7 = dialog.add("group", undefined, {name: "group7"}); 
    group7.orientation = "row"; 
    group7.alignChildren = ["left","center"]; 
    group7.spacing = 14; 
    group7.margins = 0; 

var pieOK_button = group7.add("button", undefined, undefined, {name: "ok_button"}); 
    pieOK_button.text = "OK"; 
    pieOK_button.preferredSize.width = 64;
    pieOK_button.onClick = function()
    {
        var doc = app.activeDocument;
        var spacer = parseFloat(pieSpacer_edit.text);
        var radius = parseFloat(pieRadius_edit.text);
        var cx = parseFloat(pieX_edit.text);
        var cy = parseFloat(pieY_edit.text);
        var pieUnits = pieDataUnits_edit.text;
        var piePercent = pieDisplayPercent_chbx.value;

        createPieChart(doc, pieDataList, spacer, cx, cy, radius, pieUnits, piePercent);
        dialog.close();
    }

var pieCancel_button = group7.add("button", undefined, undefined, {name: "cancel_button"}); 
    pieCancel_button.text = "Cancel"; 
    pieCancel_button.preferredSize.width = 64; 
    pieCancel_button.onClick = function()
    {
        dialog.close();
    }

dialog.show();
validateInputs(pieOK_button);


///////////////////////
// KEYBOARD FILTERS //
//////////////////////

// keyboard handler for filtering float positive number list
function keyboardPositiveFloatList (event)
{
    if ( (event.keyName >= '0'  &&  event.keyName <= '9' && event.shiftKey != true) || 
    event.keyName == "Backspace" || event.keyName == "Right" || event.keyName == "Left" || 
    event.keyName == "Delete" || event.keyName == "Comma" || event.keyName == "Space" || 
    event.keyName == "End" || event.keyName == "Home") {}
    else if (event.keyName == "Period" || event.keyName == "Decimal")
    {
        var pattern = /[\.+\,+]/g;
        var result = this.text.match(pattern);
        if (result)
        {
            if (result[result.length-1] == ".")
            {
                event.preventDefault();
            }
        }
    }
    else 
    {
        event.preventDefault();
    }
}

// keyboard handler for filtering float positive numbers
function keyboardPositiveFloat (event)
{
    if ( (event.keyName >= '0'  &&  event.keyName <= '9' && event.shiftKey != true) || 
    event.keyName == "Backspace" || event.keyName == "Right" || event.keyName == "Left" || 
    event.keyName == "Delete" || event.keyName == "End" || event.keyName == "Home") {}
    else if (event.keyName == "Period" || event.keyName == "Decimal")
    {
        var pattern = /[\.+]/g;
        var result = this.text.match(pattern);
        if (result)
        {
            if (result[result.length-1] == ".")
            {
                event.preventDefault();
            }
        }
    }
    else 
    {
        event.preventDefault();
    }
}

// keyboard handler for filtering float numbers
function keyboardFloat (event)
{
    if ( (event.keyName >= '0'  &&  event.keyName <= '9' && event.shiftKey != true) || 
    event.keyName == "Backspace" || event.keyName == "Right" || event.keyName == "Left" || 
    event.keyName == "Delete" || event.keyName == "End" || event.keyName == "Home") {}
    else if (event.keyName == "Period" || event.keyName == "Decimal")
    {
        var pattern = /[\.+]/g;
        var result = this.text.match(pattern);
        if (result)
        {
            if (result[result.length-1] == ".")
            {
                event.preventDefault();
            }
        }
    }
    else if (event.keyName == "Minus")
    {
        if (this.text[0] == "-") { event.preventDefault();}
    }
    else 
    {
        event.preventDefault();
    }
}

// check if inputs are valid
function validateInputs( button )
{
    if (pieData == true && pieRadius == true && pieX == true && pieY == true && pieSpacer == true && app.documents.length > 0) {button.enabled = true;}
    else {button.enabled = false;}
}

})();