import * as Http from "http";
import * as Url from "url";

namespace Server {
    interface AssocStringString {
        [key: string]: string;
    }
    
    // Struktur des heterogenen assoziativen Arrays als Datensatz für eine studierende Person
    interface Studi {
        name: string;
        firstname: string;
        studyPath: string;          //studyPath
        matrikel: number;
        age: number;
        gender: boolean;
    }
    
    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
    interface Studis { // homogenes assoziatives Array
         [matrikel: string]: Studi; 
    }

    // Simples Array zum Speichern der Studi-Datens�tze -> wird jetzt ersetzt durch SERVER!!!!!!!!!!!!!
    // export let studiSimpleArray: Studi[] = [];
    
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer -> wird jetzt ersetzt durch SERVER!!!!!!!!!!!!!
    let studiHomoAssoc: Studis = {};

    


    let port: number = process.env.PORT; // Environment f�r Port erstellen
    if (port == undefined) // wenn Port undefined dann
        port = 8100;        // setze ihn auf port 8100 -> �berschreibe Aufg4_Code1

    let server: Http.Server = Http.createServer((_request: Http.IncomingMessage, _response: Http.ServerResponse) => {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
    });
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);

    function handleListen(): void {
        console.log("Ich höre?");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ich höre Stimmen!"); // Kontrolle ob Server reagiert

        let query: AssocStringString = Url.parse(_request.url, true).query; // Url.parse() Metohde -> wenn false dann Ergebnis "NaN"
        //let a: number = parseInt(query["a"]); das ist Aufg4_Code1
        //let b: number = parseInt(query["b"]);
        
        _response.write("");

        // Switch Abfrage um richtige function starten zu k�nnen
        console.log(query["cmd"]); //cmd = short for command
        if (query ["cmd"]) { // if abfrage wenn cmd true dann entsprechnenden case ausf�hren
            switch (query ["cmd"]) {
                case "insert":
                    insert(query, _response);
                    break;
                    
                case "refreh":
                    refresh( _response);
                    break;
                    
                case "search":
                    search(query, _response);
                    break;
                    
                default:
                    flaw();
                }
            }

        _response.end();
        }
        // case functions Aufrufe
        // case insert
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

        studiHomoAssoc[matrikel] = studi;
     
            _response.write("Daten empfangen");
            _response.end();
            }
        

        function refresh(_response: Http.ServerResponse): void {
            console.log(studiHomoAssoc);
            for (let matrikel in studiHomoAssoc) {  
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            console.log(line);
            let data: string = JSON.stringify(line);           
            _response.write(data);
            _response.end();
            }
       } 

        function search(query: AssocStringString, _response: Http.ServerResponse): void {
                let studi: Studi = studiHomoAssoc[query["searchFor"]];
                if (studi) {
                    let line: string = query["searchFor"] + ": ";
                    line += studi.studyPath + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
                    line += studi.gender ? "(M)" : "(F)";
                    _response.write(line);
                    } else {
                        _response.write("No match found");    
                    }    
        }
        function flaw(): void {
            alert("Error"); 
        }        
    
}