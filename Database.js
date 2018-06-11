/*  Aufgabe: Aufgabe 8: ClientServer - StudiVZ
    Name: Sofia Gschwend
    Matrikel: 257664
    Datum: 10.06.18
    
    Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
    Dieser Code wurde zusammen mit Franziska Hei�, Alena Hurst, Sabrina Kerl, Anna Lotz und Tim Lieberherr erarbeitet*/
"use strict";
const Mongo = require("mongodb");
console.log("Database starting");
let databaseURL = "mongodb://localhost:27017";
let databaseName = "Test";
let db;
let students;
// wenn wir auf heroku sind...
if (process.env.NODE_ENV == "production") {
    //    databaseURL = "mongodb://username:password@hostname:port/database";
    databaseURL = "mongodb://Tester:test0815@ds141720.mlab.com:41720/database_mongodb";
    databaseName = "database_mongodb";
}
// handleConnect wird aufgerufen wenn der Versuch, die Connection zur Datenbank herzustellen, erfolgte
Mongo.MongoClient.connect(databaseURL, handleConnect);
function handleConnect(_e, _db) {
    if (_e)
        console.log("Unable to connect to database, error: ", _e);
    else {
        console.log("Connected to database!");
        db = _db.db(databaseName);
        students = db.collection("students");
    }
}
function insert(_doc) {
    students.insertOne(_doc, handleInsert);
}
exports.insert = insert;
function handleInsert(_e) {
    console.log("Database insertion returned -> " + _e);
}
function findAll(_callback) {
    var cursor = students.find();
    cursor.toArray(prepareAnswer);
    function prepareAnswer(_e, studentArray) {
        if (_e) {
            _callback("Error" + _e);
        }
        else {
            let line = "";
            for (let i = 0; i < studentArray.length; i++) {
                line += studentArray[i].matrikel + ": " + studentArray[i].name + ", " + studentArray[i].firstname + ", " + studentArray[i].studyPath + ", " + studentArray[i].age + ", ";
                line += studentArray[i].gender ? "male" : "female";
                line += "\n";
            }
            _callback(line);
        }
    }
}
exports.findAll = findAll;
function findStudent(searchedMatrikel, _callback) {
    var myCursor = students.find({ "matrikel": searchedMatrikel }).limit(1);
    myCursor.next(prepareStudent);
    function prepareStudent(_e, studi) {
        if (_e) {
            _callback("Error" + _e);
        }
        if (studi) {
            let line = studi.matrikel + ": " + studi.name + ", " + studi.firstname + ", " + studi.studyPath + ", " + studi.age + ", ";
            line += studi.gender ? "male" : "female";
            _callback(line);
        }
        else {
            _callback("No Student found");
        }
    }
}
exports.findStudent = findStudent;
//# sourceMappingURL=Database.js.map