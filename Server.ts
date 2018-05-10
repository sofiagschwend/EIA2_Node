import * as Http from "http";
import * as Url from "url";

namespace Server {
    interface AssocStringString {
        [key: string]: string;
    }

    let port: number = process.env.PORT;
    if (port == undefined) // wenn Port undefined dann
        port = 8100;        // setze ihn auf port 8100

    let server: Http.Server = Http.createServer();
    server.addListener("listening", handleListen);
    server.addListener("request", handleRequest);
    server.listen(port);

    function handleListen(): void {
        console.log("Ich höre?");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ich höre Stimmen!");

        let query: AssocStringString = Url.parse(_request.url, true).query; // Url.parse() Metohde -> wenn false dann Ergebnis "NaN"
        let a: number = parseInt(query["a"]);
        let b: number = parseInt(query["b"]);

        for (let key in query) // for-in-Schleife ist f�r Objekte gedacht, werden alle nicht belegten Array-Stellen einfach �bergangen, iteriert �ber die Schl�ssel des assoziativen Arrays
            console.log(query[key]); // gibt query aus zu der Schl�ssel 'key' passt

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        _response.write("Ich habe dich gehört<br/>");
        _response.write("Das Ergebnis ist: " + (a + b));

        _response.end();
    }
}