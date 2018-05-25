
/*    Aufgabe: Aufgabe 4 - Übung
      Name: Sofia Gschwend
      Matrikel: 257664
      Datum: 02.05.18
    
      Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
      Dieser Code wurde zusammen mit Franziska Heiß und Alena Hurst erarbeitet.

namespace Aufgabe6_Interfaces {
    
    window.addEventListener("load", init);

    function init(_event: Event): void {
        console.log("Init");
        let insertButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("insert");
        let refreshButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("refresh");
        let searchButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("searchButton");
        
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }

    function insert(_event: Event): void {
        let inputs: NodeListOf<HTMLInputElement> = document.getElementsByTagName("input");
        let genderButton: HTMLInputElement = <HTMLInputElement>document.getElementById("male");
        let studyPath: HTMLSelectElement = <HTMLSelectElement>document.getElementById("select");  //Studiengang
        let matrikel: string = inputs[2].value;
        let studi: Studi;
        
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            studyPath: studyPath.value,          //Studiengang definieren was gespeichert werden soll.
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked
        };

        console.log(studi);
        console.log(studi.age);
        console.log(studi["age"]);

        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        studiHomoAssoc[matrikel] = studi;

        // nur um das auch noch zu zeigen...
        studiSimpleArray.push(studi);
    }

    function refresh(_event: Event): void {
        let output: HTMLTextAreaElement = document.getElementsByTagName("textarea")[0];
        output.value = "";
        // for-in-Schleife iteriert über die Schlüssel des assoziativen Arrays
        
        for (let matrikel in studiHomoAssoc) {  // Besonderheit: Type-Annotation nicht erlaubt, ergibt sich aus der Interface-Definition
            let studi: Studi = studiHomoAssoc[matrikel];
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.studyPath + ", ";                            // Studiengang ausgeben nach refresh drücken
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }
    }

    function search(_event: Event): void {
        let output: HTMLTextAreaElement = <HTMLTextAreaElement>document.getElementById("textarea2");
        output.value = "";
        let matrikel: number = parseInt((<HTMLInputElement>document.getElementById("matrikelNr")).value);
        let studi: Studi = studiHomoAssoc[matrikel];
        
        if (typeof studi === "undefined") {
            output.value += "Kein Suchergebnis gefunden";
        }
        
        else {
            let line: string = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
            line += studi.studyPath + ", ";                            
            line += studi.gender ? "männlich" : "weiblich";
            output.value += line + "\n";
        }
    
    }

    // zusätzliche Konsolenausgaben zur Demonstration
    console.group("Simple Array");
    console.log(studiSimpleArray);
    console.groupEnd();

    console.group("Associatives Array (Object)");
    console.log(studiHomoAssoc);
    console.groupEnd();
}*/