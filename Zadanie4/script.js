class Produkt {
    static cenaEnergiiZaKWh = 0.75;

    constructor(id, nazwa, model, rokProdukcji, cena, zużycieEnergii) {
        this.id = id;
        this.nazwa = nazwa;
        this.model = model;
        this.rokProdukcji = rokProdukcji;
        this.cena = cena;
        this.zużycieEnergii = zużycieEnergii;
    }

    koszt() {
        return this.cena;
    }

    kosztEnergii() {
        return this.zużycieEnergii * Produkt.cenaEnergiiZaKWh;
    }

    wiekProduktu() {
        const currentYear = new Date().getFullYear(); // Aktualny rok
        return currentYear - this.rokProdukcji;
    }

    wiekProduktuLata() {
        const wiek = this.wiekProduktu();
        if (wiek === 1) {
            return "1 rok";
        } else {
            return `${wiek} lata`;
        }
    }
    static fromJSON(jsonString) {
        const data = JSON.parse(jsonString);
        return new Produkt(data.id, data.nazwa, data.model, data.rokProdukcji, data.cena, data.zużycieEnergii);
    }
}

class ListaTowarów {
    towary = [];

    opisProduktu(idProduktu) {
        const produkt = this.towary.find(p => p.id === idProduktu);
        if (produkt) {
            return `${produkt.nazwa} ${produkt.model} (${produkt.wiekProduktuLata()})`;
        } else {
            return "Produkt nie istnieje";
        }
    }

    opisWszystkichProduktów() {
        return this.towary.map(p => `${p.nazwa} ${p.model} (${p.wiekProduktuLata()})`).join('\n');
    }

    dodajProdukt(produkt) {
        // Sprawdzenie, czy produkt o tym id już istnieje
        const exists = this.towary.some(p => p.id === produkt.id);
        if (exists) {
            throw new Error(`Produkt o ID ${produkt.id} już istnieje.`);
        }
        this.towary.push(produkt);
    }

    zmieńProdukt(idProduktu, produkt) {
        const index = this.towary.findIndex(p => p.id === idProduktu);
        if (index !== -1) {
            this.towary[index].nazwa = produkt.nazwa;
            this.towary[index].model = produkt.model;
            this.towary[index].rokProdukcji = produkt.rokProdukcji;
            this.towary[index].cena = produkt.cena;
            this.towary[index].zużycieEnergii = produkt.zużycieEnergii;
        } else {
            throw new Error(`Produkt o ID ${idProduktu} nie istnieje.`);
        }
    }
}
class Magazyn extends ListaTowarów {
    ilosciTowarow = {};
    dodajProdukt(produkt, ilosc) {
        super.dodajProdukt(produkt);
        this.ilosciTowarow[produkt.id] = ilosc;
    }
    zabierzProduktId(idProduktu) {
        const index = this.towary.findIndex(p => p.id === idProduktu);
        if (index !== -1) {
            if (this.ilosciTowarow[idProduktu] > 0) {
                this.ilosciTowarow[idProduktu]--;
                return Produkt.fromJSON(JSON.stringify(this.towary[index])); // Poprawka tutaj
            } else {
                throw new Error(`Brak dostępnych sztuk produktu o ID ${idProduktu}.`);
            }
        } else {
            throw new Error(`Produkt o ID ${idProduktu} nie istnieje.`);
        }
    }
    
    zabierzProduktNazwaModel(nazwa, model) {
        const index = this.towary.findIndex(p => p.nazwa === nazwa && p.model === model);
        if (index !== -1) {
            if (this.ilosciTowarow[this.towary[index].id] > 0) {
                this.ilosciTowarow[this.towary[index].id]--;
                return Produkt.fromJSON(JSON.stringify(this.towary[index])); // Poprawka tutaj
            } else {
                throw new Error(`Brak dostępnych sztuk produktu ${nazwa} ${model}.`);
            }
        } else {
            throw new Error(`Produkt o nazwie ${nazwa} i modelu ${model} nie istnieje.`);
        }
    }

    
}
class Sklep extends ListaTowarów {
    constructor() {
        super();
        this.nextId = 1; // Inicjalizujemy ID dla nowych produktów
        this.zamowienia = [];
    }

    dodajProdukt(nazwa, model, cena, zużycieEnergii) {
        const produkt = new Produkt(this.nextId++, nazwa, model, new Date().getFullYear(), cena, zużycieEnergii);
        super.dodajProdukt(produkt); // Używamy super zamiast this
    }

    dodajProduktZId(idProduktu, nazwa, model, cena, zużycieEnergii) {
        const produkt = new Produkt(idProduktu, nazwa, model, new Date().getFullYear(), cena, zużycieEnergii);
        super.dodajProdukt(produkt); // Używamy super zamiast this
    }

    zlozZamowienie(idProduktu, ilosc) {
        const produkt = this.towary.find(p => p.id === idProduktu);
        if (!produkt) {
            throw new Error(`Produkt o ID ${idProduktu} nie istnieje.`);
        }
        // Dodajemy zamówienie do listy zamówień
        this.zamowienia.push({ produkt: produkt, ilosc: ilosc });
    }

    zrealizujZamowienie(magazyn) {
        this.zamowienia.forEach(zamowienie => {
            const { produkt, ilosc } = zamowienie;
            const idProduktu = produkt.id;

            // Usuwamy produkt z magazynu
            for (let i = 0; i < ilosc; i++) {
                try {
                    magazyn.zabierzProduktId(idProduktu);
                } catch (error) {
                    console.error(`Błąd podczas realizacji zamówienia: ${error.message}`); // Informujemy o błędzie, jeśli nie ma wystarczających sztuk
                }
            }
        });
        // Po zrealizowaniu zamówienia, czyścimy listę zamówień
        this.zamowienia = [];
    }
}
// Tworzymy produkty
// Tworzymy produkty
const produkt1 = new Produkt(1, 'Lodówka', 'LG GBB60PZJMN', 2020, 2999.99, 0.8);
const produkt2 = new Produkt(2, 'Pralka', 'Samsung WW90J5456FW', 2019, 1799.99, 1.2);

// Tworzymy magazyn i dodajemy produkty
const magazyn = new Magazyn();
magazyn.dodajProdukt(produkt1, 10); // Dodajemy 10 sztuk lodówki
magazyn.dodajProdukt(produkt2, 5);   // Dodajemy 5 sztuk pralki

// Tworzymy sklep i dodajemy te same produkty
const sklep = new Sklep();
sklep.dodajProduktZId(1, 'Lodówka', 'LG GBB60PZJMN', 2999.99, 0.8); // Dodajemy lodówkę
sklep.dodajProduktZId(2, 'Pralka', 'Samsung WW90J5456FW', 1799.99, 1.2); // Dodajemy pralkę


// Składamy zamówienie na produkt
try {
    sklep.zlozZamowienie(1, 2); // Zamawiamy 2 sztuki lodówki
    sklep.zlozZamowienie(2, 1); // Zamawiamy 1 sztukę pralki
} catch (error) {
    console.error(error.message);
}

// Realizujemy zamówienie
sklep.zrealizujZamowienie(magazyn);

// Sprawdzamy stany magazynowe po realizacji zamówienia
console.log(magazyn.ilosciTowarow);