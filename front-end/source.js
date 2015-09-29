var BASE_URL = "http://websvc1.connectomes.utah.edu/";
var INTRO = "http://";
var DOMAIN = ".connectomes.utah.edu/";

function onReportTypeChanged() {
  var reportTypeSelect = document.getElementById("reportTypeSelect");

  for (var i = 0; i < reportTypeSelect.length; ++i) {
    // Hide every report type example image that wasn't just selected
    var reportTypeImage = document.getElementById(
        reportTypeSelect.options[i].value + "Img");
    
    reportTypeImage.style.display = "none";

    // Hide the controls for every report type that wasn't just selected
    var reportTypeControls = document.getElementById(
        reportTypeSelect.options[i].value + "Params");

    reportTypeControls.style.display = "none";
  }

  var selectedReportTypeImage = document.getElementById(
      reportTypeSelect.value + "Img");

  var selectedReportTypeControls = document.getElementById(
      reportTypeSelect.value + "Params");

  selectedReportTypeImage.style.display = "inline";
  selectedReportTypeControls.style.display = "inline";

  var reportType = reportTypeSelect.value;
  var dotOption = document.getElementById("fileFormat");
  if (reportType == "morphology") {
    // You can't choose this for Morphology export
    dotOption.style.display = "none";
    var formatSelect = document.getElementById("formatSelect");
  } else {
    // You can for everything else!
    dotOption.style.display = "inline";
  }
}

function onNetworkCellIDsChanged() {
  var networkCellIdBox = document.getElementById("networkCellId");
  var hopsP = document.getElementById("hopsP");

  var idString = networkCellIdBox.value;

  console.log(idString);

  if (idString == "") {
    hopsP.style.display = "none"
  } else
  {
    hopsP.style.display = "inline"
  }
}

function onSubmitClicked() {
  var reportTypeInput = document.getElementById("reportTypeSelect");
  var reportType = reportTypeInput.options[reportTypeInput.selectedIndex].value;

  var volumeSelect = document.getElementById("volumeSelect");
  var selectedVolume = volumeSelect.options[volumeSelect.selectedIndex].value;

  var query = "";
  if (selectedVolume.indexOf("_") != -1) {
    // special case alternate subdomain
    var divIndex = selectedVolume.indexOf("_");

    var subdomain = selectedVolume.substring(0, divIndex);
    console.log(subdomain);

    selectedVolume = selectedVolume.substring(divIndex + 1);
    console.log(selectedVolume);

    query = INTRO + subdomain + DOMAIN + selectedVolume + "/export/" + reportType;
  }

  else {
    query = BASE_URL + selectedVolume + "/export/" + reportType;
  }

  // TODO select the volume

  if (reportType == "network") {
    var formatSelect = document.getElementById("formatSelect");
    var formatType = formatSelect.options[formatSelect.selectedIndex].value;

    var cellIDs = document.getElementById("networkCellId").value;
    var hops = document.getElementById("networkHops").value;

    while (cellIDs.indexOf(" ") != -1) {
      cellIDs = cellIDs.replace(" ", "");
    }

    query += "/" + formatType;

    if (cellIDs.length > 0) {
      query += "?id=" + cellIDs;

      query += "&hops=" + hops;
    }
  }

  else if (reportType == "motif") {
    var formatSelect = document.getElementById("formatSelect");
    var formatType = formatSelect.options[formatSelect.selectedIndex].value;

    query += "s/";
    query += formatType;
  }

  else if (reportType == "morphology") {
    var formatType = "tlp";
    var cellIDs = document.getElementById("morphoCellId").value;
    while (cellIDs.indexOf(" ") != -1) {
      cellIDs = cellIDs.replace(" ", "");
    }

    query += "/" + formatType;
    query += "?id=" + cellIDs;
  }

  console.log(query);
  window.open(query);
}
