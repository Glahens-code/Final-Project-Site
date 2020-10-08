var PrisonerPromise3 = d3.csv("Graph3.csv")


var successFCN = function(Prisoners){
    console.log("prisoners",Prisoners)
    innitGraph3(Prisoners)
}

var failFCN = function(Prisoners){
    console.log("error",Prisoners)
}

var innitGraph3= function(Prisoners){

    //size of screen
    var screen = {width:800,height:600}
    //how much space on each side
    var margins = {left:100,right:20,top:20,bottom:100} 

var graph = 
        {
            width:screen.width-margins.left-margins.right,
            height:screen.height - margins.top-margins.bottom
        }

    d3.select("#graph3")
    .attr("width",screen.width)
    .attr("height",screen.height)
    
    var target=  d3.select("#graph3")
    .append("g")
    .attr("id","Bargraph")
    .attr("transform","translate("+margins.left+","+margins.top+")");
  
var xScale = d3.scaleBand()
                .domain(["<60 Months", "60-120months","120months+"
                   ,,])
                .range([
                   0,graph.width
                ])
                .paddingInner(.80)


var yScale = d3.scaleLinear()
                .domain([0,450])
                .range([graph.height,0]);
var colorScale=
    d3.scaleOrdinal()
.range(["red","yellow","green"])

    drawBar(Prisoners,target,graph,xScale,yScale,colorScale)
    drawAxes3(graph,margins,xScale,yScale)
    DrawLegend3(graph,margins)
   drawLabels3(graph,margins) //drawWhiteLines2(xScale,yScale,inmates)

   
  // drawAxes2(graph,margins,xScale,yScale)
  // drawLabels2(graph,margins)
   // drawLegend2(graph,margins)
    }

var drawAxes3= function(graphDim,margings,
                         xScale,yScale){
    console.log("here")
      var xAxis= d3.axisBottom(xScale);

    var yAxis= d3.axisLeft(yScale);
    
    var axes = d3.select("#graph3")
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
 console.log("here again")}


//drawing the bar graph
var drawBar= function(Prisoners,target,graphDim,xScale,yScale,colorScale)
{ console.log(Prisoners)
target.selectAll("rect")
      .data(Prisoners)
       .enter()
       .append("rect")
       .attr("x",function(Prisoners){
    if (Prisoners.SentenceLength == "<60 Months")
    {
           return 0 
    }
    
    if (Prisoners.SentenceLength == "60-120months")
    {
           return 200
    }
    if (Prisoners.SentenceLength == "120months+")
    {
        return 400
        
    }
    
})
 
 .attr("y",function(Prisoners){
    
    return yScale(Prisoners.DeathRate)+10
})
 .attr("width",120)
 .attr("height",function(Prisoners){
    console.log(yScale(Prisoners.DeathRate))
    return Prisoners.DeathRate
//return graphDim.length-yScale(Prisoners.DeathRate)


})
 
 .attr("fill",function(Prisoners){
    console.log(Prisoners.SentenceLength)
    return colorScale("DeathRate")
})
    
}

var makeTranslateString = function(x,y)
{
    return "translate("+x+","+y+")";
}

var drawAxes3= function(graphDim,margins,
                         xScale,yScale)
{
    console.log("here")
      var xAxis= d3.axisBottom(xScale);

    var yAxis= d3.axisLeft(yScale);
    
    var axes = d3.select("#graph3")
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

 var categories = [
       {
           class:"Dead60",
           name:"Less Than 60 Months in Prison"
       },
       {
           class:"DeadMore60",
           name:"60-120 Months in Prison"
       },
      { class: "More120",
        name:"More than 120 Months in Prison"
      
      }
       
    ]



var DrawLegend3 = function(graphDim,margins){

    var legend = d3.select("#graph3")
        .append("g")
        .classed("legend",true)
        .attr("transform","translate("+
              (margins.left+ 10) +","+
             (margins.top+10)+")");
var entries = legend.selectAll("g")
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
var drawLabels3 = function(graphDim,margins)
{
    
    var labels = d3.select("#graph3")
        .append("g")
        .classed("labels",true)
    
     labels.append("text")
        .text("Prisoner Setence Length")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",(graphDim.height + 35)  + margins.top);

    
    labels.append("g")
        .attr("transform","translate(20,"+ 
              (margins.top+(graphDim.height/2))+")")
        .append("text")
        .text("Average Illness Death rate(2001-2014)")
        .classed("label",true)
        .attr("text-anchor","middle")
        .attr("transform","rotate(90)")
      labels.append("text")
        .text("Average Deaths By Illness by Prison Sentence Length")
        .classed("title",true)
        .attr("text-anchor","middle")
        .attr("x",margins.left+(graphDim.width/2))
        .attr("y",margins.top)
}

PrisonerPromise3.then(successFCN,failFCN)