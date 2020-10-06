var PrisonerPromise = d3.csv("UndeathsRace.csv");


var successFCN = function (inmates)
{
    console.log("inmates",inmates);
    console.log(inmates[0].Year);
    innitGraph(inmates);
   
    
    
    
}
console.log("hello")
var failFCN = function(penguins)
{ 
console.log("try again", penguins);
}


var innitGraph= function(inmates){

    //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:100,right:20,top:20,bottom:100} 

var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }

var xScale = d3.scaleLinear()
                .domain([
                   2007,2016])
                .range([
                   0,graph.width
                ])


var yScale = d3.scaleLinear()
                .domain([0,
                    d3.max(inmates, function(d){return d.White})])
                .range([graph.height,0]);
                
var svg = d3.select("body")
            .append("svg")
            .attr("width", screen.height)
            .attr("height", screen.width)
    drawWhiteLines(xScale,yScale,inmates)
    drawBlackLines(xScale,yScale,inmates)
    drawHisLines(xScale,yScale,inmates)
   
   drawAxes(graph,margins,
                         xScale,yScale)
   
    
    ;


}



//making lines 

  



var drawBlackLines= function(xScale, yScale, inmates){
    var lineBGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return xScale(inmates.Year);}) 
        .y(function(inmates){ return yScale(inmates.Black);})
    console.log("inmates",inmates)
    
var svg = d3.select("svg")
    
svg.append("path")
    .datum(inmates)
    .attr("class", "Blackline")
    .attr("d",lineBGenerator)
    .attr("transfor")
    

}
    


var drawWhiteLines= function(xScale, yScale, inmates){
    var lineWGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return xScale(inmates.Year);}) 
        .y(function(inmates){ return yScale(inmates.White);})
    console.log("inmates",inmates)
    
var svg = d3.select("svg")

svg.append("path")
   .datum(inmates)
  .attr("class", "Whiteline")
.attr("d",lineWGenerator);

}

var drawHisLines= function(xScale, yScale, inmates){
    var lineHGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return xScale(inmates.Year);}) 
        .y(function(inmates){ return yScale(inmates.Hispanic);})
    console.log("inmates",inmates)
    



var svg = d3.select("svg")
    
svg.append("path")
   .datum(inmates)
  .attr("class", "Hispanicline")
.attr("d",lineHGenerator);

}




var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes = function(graphDim,margins,
                         xScale,yScale)
{
      var xAxis= d3.axisBottom(xScale);

    var yAxis= d3.axisLeft(yScale);
    
    var axes = d3.select("svg")
        .append("g")
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top+graphDim.height)+")")
        .call(xAxis)
    
    axes.append("g")
        .attr("transform","translate("+margins.left+","
             +(margins.top)+")")
        .call(yAxis)
 
}




PrisonerPromise.then(successFCN,failFCN);


