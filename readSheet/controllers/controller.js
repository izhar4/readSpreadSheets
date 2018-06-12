var { google }     = require("googleapis");

let authentication = require("../authentication");

var constantInfo   = require('../config/constants');

exports.getSheetData = function(req, res){
	authentication.authenticate().then((auth)=>{
        if(auth){
        	getData(auth, req, res)
        }
	});
}

exports.updateSheetData = function(req, res){
	authentication.authenticate().then((auth)=>{
        if(auth){
        	appendData(auth, req, res)
        }
	});
	
}

var authUser;

function getData(auth, req, res) {
    var sheets = google.sheets('v4');
    let sheetId = req.params.sheetId || '';
    let range = req.params.range || '';
    sheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: sheetId, //'11q7RWcztWpQBCKpkOJmRSYcV0wMhfx8xvqAdrNJjnHI',
        range: range           //'sheet1'
       /* range:''*/ //'sheet1!A2:C', //Change Sheet1 if your worksheet's name is something else
    }, (err, response) => {
        if (err) {
            console.log(err)
          console.log('The API returned an error: ' + err);
          res.status(400).json("Something Wrong")
        }else{
            res.status(200).json(response.data)
        }
    });
}

function appendData(auth, req, res) {
    let sheets = google.sheets('v4');
    let sheetId;
    let sheetRange;
    let data;
    if(req.body){
        sheetId = req.body.sheetId || '';
        sheetRange = req.body.range || '';
        data = req.body.values || '';
        if(req.route && req.route.path.indexOf('saveData') > 0){
            sheets.spreadsheets.values.append({
                auth: auth,
                spreadsheetId: sheetId ,
                range: sheetRange , //Change Sheet1 if your worksheet's name is something else
                valueInputOption: "USER_ENTERED",
                resource: {
                  values: data
                }
            }, (err, response) => {
                if (err) {
                  console.log('The API returned an error: ' + err);
                  res.status(400).json("Something Wrong")
                } else {
                    res.status(200).json(response.data)
                }
            }); 
        }else if(req.route && req.route.path.indexOf('updateData') > 0){
            sheets.spreadsheets.values.update({
            auth: auth,
            spreadsheetId: sheetId ,
            range: sheetRange ,       //'Sheet1!A3:C', //Change Sheet1 if your worksheet's name is something else
            valueInputOption: "USER_ENTERED",
            resource: {
            values: data
            }
            }, (err, response) => {
                if (err) {
                  console.log('The API returned an error: ' + err);
                  res.status(400).json("Something Wrong")
                } else {
                    res.status(200).json(response.data)
                }
            });
        }
        
    }
    
}


