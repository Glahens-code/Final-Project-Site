var PrisonerPromise = d3.csv("IllDeathsRace.csv");


var successFCN = function (inmates)
{
    console.log("inmates",inmates);
    console.log(inmates[0].Year);
    innitGraph(inmates);
   
    
    
    
}
console.log("hello")
var failFCN = function(inmates)
{ 
console.log("try again", inmates);
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
                
        d3.select("#PrisIll")
            .attr("width", screen.height)
            .attr("height", screen.width)
   
    
    drawWhiteLines2(xScale,yScale,inmates)
    drawBlackLines2(xScale,yScale,inmates)
    drawHisLines2(xScale,yScale,inmates)
   
   drawAxes2(graph,margins,xScale,yScale)
   drawLabels2(graph,margins)
    drawLegend2(graph,margins)
    ;


}



//making lines 

  



var drawBlackLines2= function(xScale, yScale, inmates){
    var lineBGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return (xScale(inmates.Year)+100);}) 
        .y(function(inmates){ return yScale(inmates.Black);})
    console.log("inmates",inmates)
    
var svg2 = d3.select("#PrisIll")
    
svg2.append("path")
    .datum(inmates)
    .attr("class", "Blackline2")
    .attr("d",lineBGenerator)
    
    

}
    


var drawWhiteLines2= function(xScale, yScale, inmates){
    var lineWGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return (xScale(inmates.Year)+100);}) 
        .y(function(inmates){ return yScale(inmates.White);})
    console.log("inmates",inmates)
    
var svg2 = d3.select("#PrisIll")

svg2.append("path")
   .datum(inmates)
  .attr("class", "Whiteline2")
.attr("d",lineWGenerator);

}

var drawHisLines2= function(xScale, yScale, inmates){
    var lineHGenerator = d3.line()
        .x(function(inmates){ 
            console.log( xScale(inmates.Year))
            return (xScale(inmates.Year) +100);}) 
        .y(function(inmates){ return yScale(inmates.Hispanic);})
    console.log("inmates",inmates)
    



var svg2 = d3.select("#PrisIll")
    
svg2.append("path")
   .datum(inmates)
  .attr("class", "Hispanicline2")
.attr("d",lineHGenerator);

}




var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes2 = function(graphDim,margins,
                         xScale,yScale)
{
    console.log("here")
      var xAxis= d3.axisBottom(xScale);

    var yAxis= d3.axisLeft(yScale);
    
    var axes = d3.select("#PrisIll")
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
 console.log("here again")
}

var drawLabels2 = function(graphDim,margins)
{
    
    var labels = d3.select("#PrisIll")
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
        .text("Deaths By Illness")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
      labels.append("text")
        .text("Deaths Per Year")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",margins.top)
}

var drawLegend2 = function(graphDim,margins)
{
    
 
   var categories = [
       {
           class:"BlackPrisoners",
           name:"Black Prisoners"
       },
       {
           class:"WhitePrisoners",
           name:"White Prisoners"
       },
      { class: "HispanicPrisoners",
        name:   "Hispanics Prisoners"
      
      }
       
    ]
var legend2 = d3.select("#PrisIll")
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+
              (margins.left+ 10) +","+
             (margins.top+10)+")");
var entries = legend2.selectAll("g")
            .data(categories)
            .enter()
            .append("g")
            .classed("legendEntry", true)
.attr("class",function(categories){
    return categories.class
})
.attr("transform",function(categories,index)
              {
                return "translate(0,"+index*20+")";
              })
          

entries.append("rect")
        .attr("width", 10)
        .attr("height", 10)
    
entries.append("text")
                .text(function(category){return category.name;})
                .attr("x",15)
                .attr("y",10)
    
    
}
PrisonerPromise.then(successFCN,failFCN);