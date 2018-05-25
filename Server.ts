import * as Http from "http";
import * as Url from "url";

namespace Server {
    interface AssocStringString {
        [key: string]: string;
    }
    
    // Struktur des heterogenen assoziativen Arrays als Datensatz fÃ¼r eine studierende Person
    interface Studi {
        name: string;
        firstname: string;
        studyPath: string;          //Studiengang
        matrikel: number;
        age: number;
        gender: boolean;
    }
    
    // Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
    export interface Studis { // homogenes assoziatives Array
         [matrikel: string]: Studi; 
    }

    // Simples Array zum Speichern der Studi-Datensätze -> wird jetzt ersetzt durch SERVER!!!!!!!!!!!!!
    // export let studiSimpleArray: Studi[] = [];
    
    // Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer -> wird jetzt ersetzt durch SERVER!!!!!!!!!!!!!
    // export let studiHomoAssoc: Studis = {};
    


    let port: number = process.env.PORT; // Environment für Port erstellen
    if (port == undefined) // wenn Port undefined dann
        port = 8100;        // setze ihn auf port 8100 -> überschreibe Aufg4_Code1

    let server: Http.Server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);

    function handleListen(): void {
        console.log("Ich hÃ¶re?");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ich hÃ¶re Stimmen!"); // Kontrolle ob Server reagiert

        let query: AssocStringString = Url.parse(_request.url, true).query; // Url.parse() Metohde -> wenn false dann Ergebnis "NaN"
        //let a: number = parseInt(query["a"]); das ist Aufg4_Code1
        //let b: number = parseInt(query["b"]);
        
        // Switch Abfrage um richtige function starten zu können
        console.log(query["cmd"]); //cmd = short for command
        if (query ["cmd"]) { // if abfrage wenn cmd true dann entsprechnenden case ausführen
            switch (query ["cmd"]) {
                case "insert":
                    insert();
                    break;
                    
                case "refreh":
                    refresh();
                    break;
                    
                case "search":
                    search();
                    break;
                    
                default:
                    flaw();
                }
            }
        // case functions Aufrufe
        // case insert
       function insert(/*_event: Event*/): void {
        let obj: Studi = JSON.parse(query["data"]);
            let _name: string = obj.name;
            let _firstname: string = obj.firstname;  
            let matrikel: string = obj.matrikel.toString(); 
            let _age: number = obj.age;
            let _gender: boolean = obj.gender;
            let _studiengang: string = obj.studiengang;  
            let studi: Studi;
            studi = {
                name: _name,
                firstname: _firstname,
                matrikel: parseInt(matrikel),
                age: _age,
                gender: _gender,
                studiengang: _studiengang
            };

        studiHomoAssoc[matrikel] = studi;
    
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.write("Daten empfangen");
            _response.end();
            }
        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        studiHomoAssoc[matrikel] = studi;

        function refresh(): void {
            console.log(studiHomoAssoc);
            for (let matrikel in studiHomoAssoc) {  
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.studiengang + ", " + studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.gender ? "(M)" : "(F)";
            console.log(line);
            let data: string = JSON.stringify(line);
            _response.setHeader("Access-Control-Allow-Origin", "*");
            _response.write(data);
            _response.end();
            }
       } 
        function error(): void {
            alert("Error"); 
        }

        
    }
}
}
