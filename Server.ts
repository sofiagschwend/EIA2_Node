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
        console.log("Ich hÃ¶re?");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("Ich hÃ¶re Stimmen!");

        let query: AssocStringString = Url.parse(_request.url, true).query; // Url.parse() Metohde -> wenn false dann Ergebnis "NaN"
        let a: number = parseInt(query["a"]);
        let b: number = parseInt(query["b"]);

        for (let key in query) // for-in-Schleife ist für Objekte gedacht, werden alle nicht belegten Array-Stellen einfach übergangen, iteriert über die Schlüssel des assoziativen Arrays
            console.log(query[key]); // gibt query aus zu der Schlüssel 'key' passt

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        _response.write("Ich habe dich gehÃ¶rt<br/>");
        _response.write("Das Ergebnis ist: " + (a + b));

        _response.end();
    }
}