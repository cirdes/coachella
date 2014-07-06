(function () {
   'use strict';

  SelfCheckin.Services.
    factory('dymoprinter',['$http',function($http) {
      var labelXml, printerName, label;
      $http.get('/labels/default.label').success(function(data, status, headers, config) {
        labelXml = data;
        label = dymo.label.framework.openLabelXml(labelXml);
        console.log('Label loaded');
      });
      
    // select printer to print on
    // for simplicity sake just use the first LabelWriter printer
    var printers = dymo.label.framework.getPrinters();
    if(printers.length == 0){
      console.log("No DYMO printers are installed. Install DYMO printers.");
    }

    for (var i = 0; i < printers.length; ++i){
        var printer = printers[i];
        if (printer.printerType == "LabelWriterPrinter")
        {
            printerName = printer.name;
            break;
        }
    }
    if(printerName == ""){
      console.log("No LabelWriter printers found. Install LabelWriter printer");
    }else{
      console.log("Impressora encontrada: " + printerName);
    }

    var dymoprinter = {
      print: function(name){
        // set label text
        label.setObjectText("TEXT", name);
        label.print(printerName);
      }
    };

  return dymoprinter;

  }]);
}());
