/*    Aufgabe: Aufgabe 4 - �bung
      Name: Sofia Gschwend
      Matrikel: 257664
      Datum: 02.05.18
    
      Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
      Dieser Code wurde zusammen mit Franziska Hei� und Alena Hurst erarbeitet.
*/
var Aufgabe6_Interfaces;
(function (Aufgabe6_Interfaces) {
    window.addEventListener("load", init);
    function init(_event) {
        console.log("Init");
        let insertButton = document.getElementById("insert");
        let refreshButton = document.getElementById("refresh");
        let searchButton = document.getElementById("searchButton");
        insertButton.addEventListener("click", insert);
        refreshButton.addEventListener("click", refresh);
        searchButton.addEventListener("click", search);
    }
    function insert(_event) {
        let inputs = document.getElementsByTagName("input");
        let genderButton = document.getElementById("male");
        let studyPath = document.getElementById("select"); //Studiengang
        let matrikel = inputs[2].value;
        let studi;
        studi = {
            name: inputs[0].value,
            firstname: inputs[1].value,
            studyPath: studyPath.value,
            matrikel: parseInt(matrikel),
            age: parseInt(inputs[3].value),
            gender: genderButton.checked
        };
        console.log(studi);
        console.log(studi.age);
        console.log(studi["age"]);
        // Datensatz im assoziativen Array unter der Matrikelnummer speichern
        Aufgabe6_Interfaces.studiHomoAssoc[matrikel] = studi;
        // nur um das auch noch zu zeigen...
        Aufgabe6_Interfaces.studiSimpleArray.push(studi);
    }
    function refresh(_event) {
        let output = document.getElementsByTagName("textarea")[0];
        output.value = "";
        // for-in-Schleife iteriert �ber die Schl�ssel des assoziativen Arrays
        for (let matrikel in Aufgabe6_Interfaces.studiHomoAssoc) {
            let studi = Aufgabe6_Interfaces.studiHomoAssoc[matrikel];
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre ";
            line += studi.studyPath + ", "; // Studiengang ausgeben nach refresh dr�cken
            line += studi.gender ? "m�nnlich" : "weiblich";
            output.value += line + "\n";
        }
    }
    function search(_event) {
        let output = document.getElementById("textarea2");
        output.value = "";
        let matrikel = parseInt(document.getElementById("matrikelNr").value);
        let studi = Aufgabe6_Interfaces.studiHomoAssoc[matrikel];
        if (typeof studi === "undefined") {
            output.value += "Kein Suchergebnis gefunden";
        }
        else {
            let line = matrikel + ": ";
            line += studi.name + ", " + studi.firstname + ", " + studi.age + " Jahre, ";
            line += studi.studyPath + ", ";
            line += studi.gender ? "m�nnlich" : "weiblich";
            output.value += line + "\n";
        }
    }
    // zus�tzliche Konsolenausgaben zur Demonstration
    console.group("Simple Array");
    console.log(Aufgabe6_Interfaces.studiSimpleArray);
    console.groupEnd();
    console.group("Associatives Array (Object)");
    console.log(Aufgabe6_Interfaces.studiHomoAssoc);
    console.groupEnd();
})(Aufgabe6_Interfaces || (Aufgabe6_Interfaces = {}));
//# sourceMappingURL=ProcessForm.js.map