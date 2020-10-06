var PrisonerPromise = d3.csv("UndeathsRace.csv");


var successFCN = function (inmates)
{
    console.log("inmates",inmates);
    console.log(inmates[0].Year);
    innitGraph1(inmates);
   
    
    
    
}
console.log("hello")
var failFCN = function(inmates)
{ 
console.log("try again", inmates);
}


var innitGraph1= function(inmates){

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
                
var svg1 = d3.select("#UnDeaths")
            .attr("width", screen.height)
            .attr("height", screen.width)
    drawWhiteLines1(xScale,yScale,inmates)
    drawBlackLines1(xScale,yScale,inmates)
    drawHisLines1(xScale,yScale,inmates)
   
   drawAxes1(graph,margins,
                         xScale,yScale)
   drawLabels1(graph,margins)
    
    ;


}



//making lines 

  



var drawBlackLines1= function(xScale, yScale, inmates){
    var lineBGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return xScale(inmates.Year);}) 
        .y(function(inmates){ return yScale(inmates.Black);})
    console.log("inmates",inmates)
    
var svg1 = d3.select("svg1")
    
svg1.append("path")
    .datum(inmates)
    .attr("class", "Blackline1")
    .attr("d",lineBGenerator)
    
    

}
    


var drawWhiteLines1= function(xScale, yScale, inmates){
    var lineWGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return xScale(inmates.Year);}) 
        .y(function(inmates){ return yScale(inmates.White);})
    console.log("inmates",inmates)
    
var svg1 = d3.select("svg1")

svg1.append("path")
   .datum(inmates)
  .attr("class", "Whiteline1")
.attr("d",lineWGenerator);

}

var drawHisLines1= function(xScale, yScale, inmates){
    var lineHGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return xScale(inmates.Year);}) 
        .y(function(inmates){ return yScale(inmates.Hispanic);})
    console.log("inmates",inmates)
    



var svg1 = d3.select("svg1")
    
svg1.append("path")
   .datum(inmates)
  .attr("class", "Hispanicline1")
.attr("d",lineHGenerator);

}




var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes1 = function(graphDim,margins,
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
       // .attr("tranlate("+5","+6")
        .call(yAxis)
    
 
}

var drawLabels1 = function(graphDim,margins)
{
    
    var labels = d3.select("svg")
        .append("g")
        .classed("labels",true)
    
     labels.append("text")
        .text("Years")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",(graphDim.height + 35)  + margins.top);

    
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graphDim.height/2))+")")
        .append("text")
        .text(" Unconditional Deaths Per 100,000")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
      labels.append("text")
        .text("Unconditional Death rates Over the years ")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",margins.top)
}



PrisonerPromise.then(successFCN,failFCN);


