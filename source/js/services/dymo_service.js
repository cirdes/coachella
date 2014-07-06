(function () {
   'use strict';

  SelfCheckin.Services.
    factory('dymoprinter',[function() {
    var labelXml = '<?xml version="1.0" encoding="utf-8"?>\
        <DieCutLabel Version="8.0" Units="twips">\
          <PaperOrientation>Landscape</PaperOrientation>\
          <Id>LargeAddress</Id>\
          <PaperName>30321 Large Address</PaperName>\
          <DrawCommands>\
            <RoundRectangle X="0" Y="0" Width="2025" Height="5020" Rx="270" Ry="270"/>\
          </DrawCommands>\
          <ObjectInfo>\
            <TextObject>\
              <Name>Text</Name>\
              <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
              <BackColor Alpha="0" Red="255" Green="255" Blue="255"/>\
              <LinkedObjectName></LinkedObjectName>\
              <Rotation>Rotation0</Rotation>\
              <IsMirrored>False</IsMirrored>\
              <IsVariable>False</IsVariable>\
              <HorizontalAlignment>Left</HorizontalAlignment>\
              <VerticalAlignment>Middle</VerticalAlignment>\
              <TextFitMode>AlwaysFit</TextFitMode>\
              <UseFullFontHeight>True</UseFullFontHeight>\
              <Verticalized>False</Verticalized>\
              <StyledText>\
                <Element>\
                  <String>C</String>\
                  <Attributes>\
                    <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
                  </Attributes>\
                </Element>\
                <Element>\
                  <String>irdes henrique</String>\
                  <Attributes>\
                    <Font Family="Lucida Grande" Size="13" Bold="False" Italic="False" Underline="False" Strikeout="False"/>\
                    <ForeColor Alpha="255" Red="0" Green="0" Blue="0"/>\
                  </Attributes>\
                </Element>\
              </StyledText>\
            </TextObject>\
            <Bounds X="321.5997" Y="57.59995" Width="4612.8" Height="1881.6"/>\
          </ObjectInfo>\
        </DieCutLabel>';

    var printerName = "";
    var label = dymo.label.framework.openLabelXml(labelXml);


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
        label.setObjectText("Text", name);
        label.print(printerName);
      }
    };

  return dymoprinter;

  }]);
}());
