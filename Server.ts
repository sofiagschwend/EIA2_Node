import * as Http from "http";
import * as Url from "url";
import * as Database from "./Database";
let port: number = process.env.PORT;
if (port == undefined)
    port = 8200;

let server: Http.Server = Http.createServer();
server.addListener("request", handleRequest);
server.listen(port);

function handleResponse(_response: Http.ServerResponse, _text: string): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.write(_text);
    _response.end();
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Ich höre Stimmen!");
    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query["command"]);
    if (query["command"]) {
        switch (query["command"]) {

            case "insert":
                insert(query, _response);
                break;

            case "refresh":
                refresh(_response);
                break;

            case "search":
                //search(query, _response);
                break;

            default:
                error();
        }
    }
}

function insert(query: AssocStringString, _response: Http.ServerResponse): void {
    let obj: Studi = JSON.parse(query["data"]);
    let _name: string = obj.name;
    let _firstname: string = obj.firstname;
    let matrikel: string = obj.matrikel.toString();
    let _age: number = obj.age;
    let _gender: boolean = obj.gender;
    let _studyPath: string = obj.studyPath;
    let studi: Studi;
    studi = {
        name: _name,
        firstname: _firstname,
        matrikel: parseInt(matrikel),
        age: _age,
        gender: _gender,
        studyPath: _studyPath
    };
    Database.insert(studi);
    handleResponse(_response, "Daten wurden gespeichert");
}

function refresh(_response: Http.ServerResponse): void {
    Database.findAll(function(json: string): void {
        handleResponse(_response, json);
    });
}

function search(query: Object, _response: Http.ServerResponse): void {
// noch nicht umgeschrieben
}

function error(): void {
    alert("Error");
}