// Struktur des heterogenen assoziativen Arrays als Datensatz fÃ¼r eine studierende Person
interface Studi {
    name: string;
    firstname: string;
    studyPath: string;
    matrikel: number;
    age: number;
    gender: boolean;
}

interface AssocStringString {
    [key: string]: string;
}

// Struktur des homogenen assoziativen Arrays, bei dem ein Datensatz der Matrikelnummer zugeordnet ist
interface Studis {
    // Datentyp ist nur Studi => nur ein einziger Datentyp - homogenes assoziatives Array
    [matrikel: string]: Studi;
    // einzelne Studenten werden mit der Matrikelnummer als Schlüssel gespeichert       
}

// Homogenes assoziatives Array zur Speicherung einer Person unter der Matrikelnummer
let studiHomoAssoc: Studis = {};