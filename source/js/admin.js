var socket = io.connect("http://"+location.hostname+"/admin");

socket.on("checkin", function(data){

console.log("checkin", data);

result = {
  "mensagem": "",
  "socket_id": data.socket_id
}

var value;
var attendee;

if (data.id.indexOf("@") > -1){
  attendee = attendees[data.id];
}else if (data.id.indexOf(":") > -1){
  value = data.id.split(":")[1].toUpperCase();
  attendee = findByCode(value);
}

if (!attendee) {
  result.mensagem = data.id + " NÃO ENCONTRADO!";
} else {
  if (attendee.credenciado) {
    result.mensagem = attendee.nome + " você já foi credenciado.";
  } else {
    attendee.credenciado = new Date().toLocaleString();
    printLabel(attendee.nome, attendee.tipo);
    attendee.etiqueta++;
    update_ui();

    result.mensagem = attendee.nome + "\naguarde ser chamado";
  }
}
socket.emit("checkin result", result);
});

socket.on('print label', function(data){
console.log("recebi printlabel");
printLabel(data[0], data[1]);
})

newAttendee = function(){
name = window.prompt("Digite o nome do participante: ");
if (name != "null"){
  printLabel(name, "StartupVale 2014");
}
};

findByCode = function(code) {
var value = null;

$.each(attendees, function(key, val) {
  if (val.eventick_code == code) {
    value = val;
    return false;
  }
});

return value;
};

function load_file() {

if (!window.fs)
return;

fs.root.getFile("startt.json", { create: false }, function(fileEntry) {

  // Get a File object representing the file,
  // then use FileReader to read its contents.
  fileEntry.file(function(file) {
    var reader = new FileReader();
    reader.onloadend = function(e) {
      window.XXX = this.result;
      console.log("Carregando JSON..."); //, this.result, this.result.length);
      attendees = JSON.parse(this.result);
      console.log("CARREGOU JSON!"); //, this.result, this.result.length);
      update_ui();
    };

    reader.readAsText(file);

  }, errorHandler);

}, errorHandler);
}

function errorHandler(e)
{
console.log("FILESYSTEM Error", e);
}

function update_file() {

console.log("saving file...");

if (!window.fs)
return;

//sobrescrever arquivo ateendees.json
fs.root.getFile("startt.json", {create: true, exclusive: false}, function(fileEntry) {
  console.log("creating writer...");


  // Create a FileWriter object for our FileEntry (log.txt).
  fileEntry.createWriter(function(fileWriter) {
    window.fW = fileWriter;
    fileWriter.onwriteend = function(e) {
      console.log('Write completed.');
    };

    fileWriter.onerror = function(e) {
      console.log('Write failed: ' + e.toString());
    };

    // Create a new Blob and write it to log.txt.

    var blob = new Blob([JSON.stringify(attendees)], {type: 'text/plain'});
    fileWriter.write(blob);
    console.log("SAVED!");


  }, errorHandler);
});
}

function update_planilha() {
for(item_key in attendees_temp) {
  var item = attendees_temp[item_key];
  var email = item_key;
  var nome = item[0];
  var tipo = item[1];
  var id_imasters = item[3];
  var eventick_code = item[4];
  var tamanho_camiseta = item[5];
  var valor_pago = item[6];
  var data_inscricao = item[7];
  var status_inscricao = item[8];


  var attendee = {};

  if (attendees[email]) {
    attendee = attendees[email];
  }

  attendee.email = email;
  attendee.nome = nome;
  attendee.tipo = tipo;
  attendee.eventick_code = eventick_code;
  attendee.id_imasters = id_imasters
  attendee.tamanho_camiseta = tamanho_camiseta;
  attendee.valor_pago = valor_pago;
  attendee.data_inscricao = data_inscricao;
  attendee.status_inscricao = status_inscricao;
  attendee.credenciado = attendee.credenciado ? attendee.credenciado : null;
  attendee.etiqueta = attendee.etiqueta ? attendee.etiqueta : 0;

  attendees[email] = attendee;

}
update_ui();
}

function update_ui() {
update_counters();

for(item_key in attendees) {
  var attendee = attendees[item_key];
  //console.log(attendee);

  var itm;

  if (!document.getElementById(item_key)) {
    itm = $("<li></li>").attr("id", item_key);
    $("#inscritos").append(itm);

  } else {

    itm = $(document.getElementById(item_key));
    itm.empty();
  }


  if (!attendee.credenciado && itm.hasClass("confirmado"))
  itm.removeClass("confirmado");

  if (attendee.credenciado)
  itm.addClass("confirmado");

  itm.append($("<span/>").addClass("nome").text(attendee.nome));
  itm.append($("<span/>").addClass("email").text(attendee.email));
  itm.append($("<span/>").addClass("tipo").text(attendee.tipo));
  itm.append($("<span/>").addClass("eventick_code").text(attendee.eventick_code));
  itm.append($("<span/>").addClass("id_imasters").text("["+attendee.id_imasters+"]"));
  itm.append($("<span/>").addClass("status_inscricao").text(attendee.status_inscricao));
  itm.append($("<span/>").addClass("credenciado").text(attendee.credenciado ? attendee.credenciado : "-"));
  itm.append($("<span/>").addClass("etiqueta").text(attendee.etiqueta ? attendee.etiqueta : "-"));
}
//salvar arquivo
update_file();
}


function update_counters() {
total_checked = 0;
for (item_key in attendees) {
  if (attendees[item_key].credenciado)
  total_checked ++;
}
total_attendees = Object.keys(attendees).length;
$("#totalizador span").text(total_checked + "/" + total_attendees);
}


var CLIENT_ID_REMOTE = '4981587102-so66vtulamdvjc8hn4ihv83cnp91pc4v.apps.googleusercontent.com';
var CLIENT_ID_LOCAL = '4981587102-so66vtulamdvjc8hn4ihv83cnp91pc4v@developer.gserviceaccount.com';

var CLIENT_ID = CLIENT_ID_LOCAL;

var SCOPES = [
'https://www.googleapis.com/auth/drive',
'https://www.googleapis.com/auth/drive.file',
'https://spreadsheets.google.com/feeds',
];

// Use your own API developer key.
var AUTH_TOKEN = null;
var AUTH = null;



var attendees = {};
var attendees_temp = {};
var checked_attendees = {};

var arrayList = {};
var currentFile;


var printers = null;
var label_loaded = false;

var tmrCapture = null;
var tmrShowCheckin = null;
var tmrCounter = null;


$(document).ready(function(){
authButton = document.getElementById('authorizeButton');
pickerButton = document.getElementById('pickerButton');

printers = dymo.label.framework.getPrinters();
loadLabelFromWeb();

$("#inscritos").empty();

//tmrCounter = setInterval(update_counters, 5000);
//update_counters();

$(document).on( "click", "li", function(){
  var email = $(this).attr("id");
  if (!attendees[email])
  return;

  var attendee = attendees[email];

  if (attendee.credenciado) {
    if (confirm("O participante selecionado já está credenciado\n\n" + attendee.nome + "\n\n\nDeseja reimprimir etiqueta?")) {
      printLabel(attendee.nome, attendee.tipo);
      attendee.etiqueta++;
      update_ui();
    }
    return;
  }

  if (!confirm("Deseja credenciar " + attendee.email + "\n\n" + attendee.nome + "\n" + attendee.eventick_code))
  return;


  attendee.credenciado = new Date().toLocaleString();
  attendee.etiqueta++;
  printLabel(attendee.nome, attendee.tipo);

  update_ui();

});

//FILESYSTEM
// Note: The file system has been prefixed as of Google Chrome 12:
window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
//window.requestFileSystem(type, size, successCallback, opt_errorCallback)

function onInitFs(fs) {
  console.log('Opened file system: ' + fs.name);
  window.fs = fs;

  load_file(fs);

}

navigator.webkitPersistentStorage.requestQuota(10*1024*1024, function(grantedBytes) {
  window.requestFileSystem(PERSISTENT, grantedBytes, onInitFs, errorHandler);
}, function(e) {
  console.log('Error', e);
});

});

function printLabel(nome, tipo) {
if (printers.length == 0 || !label) return;
if (!tipo) tipo = "";
label.setObjectText("nome", nome);
label.setObjectText("tipo", tipo);
label.print(printers[0].name);
}

function loadLabelFromWeb() {
// use jQuery API to load label
$.get("/labels/devfest.label", function(labelXml) {
  label = dymo.label.framework.openLabelXml(labelXml);
  label_loaded = true;
  // check that label has an address object
}, "text");
}

/**
* Called when the client library is loaded to start the auth flow.
*/
function handleClientLoad() {
//window.setTimeout(checkAuth, 1);
gapi.client.load('drive', 'v2', function() {
  console.log("loaded");
  checkAuth();
});
}

/**
* Check if the current user has authorized the application.
*/
function checkAuth() {
gapi.auth.authorize(
  {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': true},
  handleAuthResult);
}



/**
* Called when authorization server replies.
*
* @param {Object} authResult Authorization result.
*/
function handleAuthResult(authResult) {

  setTimeout(function(){
    $("#begin").hide();
  }, 5000);



  authButton.style.display = 'none';
  pickerButton.style.display = 'none';

  //var filePicker = document.getElementById('filePicker');
  //filePicker.style.display = 'none';

  if (authResult && !authResult.error) {
    AUTH_TOKEN = authResult.access_token;

    pickerButton.style.display = 'block';
    pickerButton.onclick = function(){
      createPicker();
    };

  } else {
    // No access token could be retrieved, show the button to start the authorization flow.
    authButton.style.display = 'block';
    authButton.onclick = function() {
      gapi.auth.authorize(
        {'client_id': CLIENT_ID, 'scope': SCOPES, 'immediate': false},
        handleAuthResult);
      };
    }
  }



  // Use the Google API Loader script to load the google.picker script.
  function loadPicker() {
    //gapi.load('picker', {'callback': createPicker});
    gapi.load('picker');
  }



  // Create and render a Picker object for searching images.
  function createPicker() {
    var view = new google.picker.View(google.picker.ViewId.SPREADSHEETS);
    //view.setMimeTypes("application/vnd.google-apps.spreadsheet");

    var picker = new google.picker.PickerBuilder()
    .enableFeature(google.picker.Feature.NAV_HIDDEN)
    //.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    .setAppId(CLIENT_ID)
    .setOAuthToken(gapi.auth.getToken().access_token) //Optional: The auth token used in the current Drive API session.
    .addView(view)
    .addView(new google.picker.DocsUploadView())
    .setCallback(pickerCallback)
    .setTitle("Open attendees list")
    .build();

    picker.setVisible(true);
  }

  // A simple callback implementation.
  function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {

      pickerButton.style.display = 'none';

      var fileId = data.docs[0].id;
      currentFile = fileId;

      var request = gapi.client.drive.files.get({
        'fileId': fileId
      });
      request.execute(function(resp) {
        var token = gapi.auth.getToken().access_token;

        var urlWorkseets = 'https://spreadsheets.google.com/feeds/worksheets/' + resp.id + '/private/basic?alt=json-in-script&access_token=' + token + '&callback=?';
        $.getJSON(urlWorkseets, function(data) {
          window.worksheets = data;

          var urlCells = data.feed.entry[0].link[1].href + '?alt=json-in-script&access_token=' + token + '&callback=?';
          $("#planilha").empty().text("worksheet: '" + data.feed.entry[0].title.$t + "'");

          $.getJSON(urlCells, function(data) {
            window.listCells = data;
            var patt=/([A-Z]{1,})(\d{1,})/;
            for (index in listCells.feed.entry) {
              var cell_data = listCells.feed.entry[index];
              if (cell_data.title) {
                var celula = cell_data.title.$t;
                var cell = patt.exec(String(celula));

                var col = cell[1];
                var row = cell[2];
                if (!arrayList[row]) {
                  arrayList[row] = {};
                }
                arrayList[row][col] = cell_data.content.$t;
              }
            }

            attendees_temp = {};
            var arrayListKeys;
            for (index in arrayList) {
              if (index == "1") {
                item_keys = Object.keys(arrayList[index]);
              } else {
                item = arrayList[index];
                if (item[item_keys[0]]) {
                  var attendee = {};
                  for(var i=1,j=0; i<item_keys.length-1; i++, j++) {
                    attendee[j] = item[item_keys[i]];
                  }
                  attendees_temp[item[item_keys[0]].toLowerCase()] = attendee;
                }
              }
            }


            console.log("attendee list completed!");
            $("#begin").fadeOut();

            update_planilha();
          });
        });
      });
    }
  }
