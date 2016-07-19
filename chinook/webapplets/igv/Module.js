//----------------------------------------------------------------------------------------------------
var igvModule = (function () {

  var datasetName = null;
  var thisModulesName = "igv";
  var thisModulesOutermostDiv = "igvDiv";

  var contentDiv, controlsDiv;

//--------------------------------------------------------------------------------------------
function initializeUI()
{
  contentDiv = $("#igvContentDiv")
  controlsDiv = $("#igvControlsDiv");

  $(window).resize(handleWindowResize);
  handleWindowResize();


}  // initializeUI
//----------------------------------------------------------------------------------------------------
function handleWindowResize ()
{
  contentDiv.width(0.95 * $(window).width());
  contentDiv.height(0.80 * $(window).height());

} // handleWindowResize
//--------------------------------------------------------------------------------
function datasetSpecified(msg)
{
  console.log("--- Module.cleveland: datasetSpecified: " + msg.payload);
  hub.enableTab(thisModulesOutermostDiv)
    
  datasetName = msg.payload;

  console.log("igvModule, datasetSpecified, name: " + datasetName);
  console.log(JSON.stringify(msg));

  var newMsg = {cmd: "getDatasetItemNames", callback: "igvDisplayDatasetItemNames",
                status: "request", payload: {dataset: datasetName}};

  hub.send(JSON.stringify(newMsg)); 

  //var payload={datasetName: datasetName, items: itemsRequested}
  //var newMsg={cmd: cmd, callback: callback, status:"request", payload:payload};
  //hub.send(JSON.stringify(newMsg)); 

} // datasetSpecified
//--------------------------------------------------------------------------------
function displayIgv(msg)
{
  console.log("displayIgv");

  hub.raiseTab(thisModulesOutermostDiv);
  console.log(JSON.stringify(msg));
  var itemNames = msg.payload

  contentDiv.append("<ol>");

  for(var i=0; i < itemNames.length; i++){
     contentDiv.append("<li> " + itemNames[i]);
     } // for i

  contentDiv.append("</ol>");


  console.log(JSON.stringify(msg));
 	
} // displayigv
//--------------------------------------------------------------------------------
function initializeModule()
{
  hub.addOnDocumentReadyFunction(initializeUI);
  hub.addMessageHandler("datasetSpecified", datasetSpecified);
  hub.addMessageHandler("igvDisplayDatasetItemNames", displayIgv); 

} // initializeModule
//----------------------------------------------------------------------------------------------------
return{

  init: initializeModule

};
//----------------------------------------------------------------------------------------------------
}); // igvModule

igvModule = igvModule();
igvModule.init();
