
function doGet() {
  return HtmlService.createHtmlOutputFromFile('form')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function demoHtmlServices() {
  var ss = SpreadsheetApp.getActiveSpreadsheet(),
      html = HtmlService.createHtmlOutputFromFile('index');
  ss.show(html);
}



function writeSomething(m) {
 var spreadsheet = SpreadsheetApp.getActive();
  var sheet =  spreadsheet.getSheetByName('master');
  var numRows = sheet.getLastRow();
  data = sheet.getRange(1,4,numRows,4).getValues();
  var result;
  for(nn=0;nn<data.length;++nn){
    if(data[nn][0]==m){
    return "Yes";
    }
  }
  return "No";
}



function trackExamination(x){
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet =  spreadsheet.getSheetByName('master');
  var numRows = sheet.getLastRow();
  data = sheet.getRange(1,4,numRows,4).getValues();
  var result;
  for(nn=0;nn<data.length;++nn){
    if(data[nn][0]==x){
      result = "Yes";
     break;
    }
  }
  if(result == "Yes"){
    return "Yes";
  }
  return "No";
}


function uploadFileToDrive(base64Data, fileName, name, number, index, rollno) {
  try{
    var rollno = rollno;
    var splitBase = base64Data.split(','),
        type = splitBase[0].split(';')[0].replace('data:','');

    var byteCharacters = Utilities.base64Decode(splitBase[1]);
    var ss = Utilities.newBlob(byteCharacters, type);
    //ss.setName(fileName);
    ss.setName('AIOC'+'-'+name+'-'+'-'+rollno+'-'+number+'-'+index);
    var dropbox = 'All India Open Challenge Tier-3 Recieved Sheets';
    var folder, folders = DriveApp.getFoldersByName(dropbox);

    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(dropbox);
    }
    var file = folder.createFile(ss);

    return file.getName();
  }catch(e){
    return 'Error: ' + e.toString();
  }
}


function getValues(name,rollno,number,nuFiles,mobile){
  var s = Utilities.formatDate(new Date(), "IST", "MM-dd-yyyy HH:mm:ss");
  var x= "";
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([s,name,rollno,number,nuFiles,mobile]);
}


//getValuesFromForm
/*
function getValuesFromForm(form){
 
  var name = form.name,
      rollno = form.rollno,
      allFiles = document.getElementById('myFile').files.length,
      //total = form.myFile.length,
      Number = form.Number,
      time = new Date(),
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([name, rollno, Number ,time,allFiles ]);
}
*/