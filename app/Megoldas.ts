import Hiányzás from "@/app/Hianyzas";
import fs from "fs";

export default class Megoldas{
    #hianyzasok: Hiányzás[] = [];

    get bejegyzésekSzáma(): number {
        return this.#hianyzasok.length;
    }

    get összesIgazoltDb(): number{
        let db = 0
        for (const e of this.#hianyzasok) {
            db += e.igazoltDb
        }
        return db
    }
    get összesIgazolatlanDb(): number{
        let db = 0
        for (const e of this.#hianyzasok) {
            db += e.igazolatlanDb
        }
        return db
    }

    constructor(forrás: string){
        let aktDatum: string = "";
        fs.readFileSync(forrás)
        .toString()
        .split("\n")
        .forEach(sor => {
            const aktSor: string = sor.trim();
            if (aktSor[0] == "#") aktDatum = aktSor;
            else{
                if (aktSor.length > 0){
                    this.#hianyzasok.push(new Hiányzás(aktSor, aktDatum));
                }
            }
        });
        
    }

    static hetNapja(honap: number, nap: number): string{
        const napnev: string[] = ["vasarnap", "hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat"];
        const napszam: number[] = [0, 31, 59, 90, 120, 151, 212, 243, 273, 304, 335];
        const napsorszam: number = (napszam[honap] + nap) % 7
        return napnev[napsorszam]
    }
}