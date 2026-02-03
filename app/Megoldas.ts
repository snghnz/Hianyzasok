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

    get #hianyzasokStat(): Map<string, number>{
        const stat: Map<string, number> = new Map<string, number>();
        for (const e of this.#hianyzasok){
            if (stat.has(e.név)){
                stat.set(e.név, stat.get(e.név) as number + e.hianyzasdb)
            } else{
                stat.set(e.név, e.hianyzasdb)
            }
            stat.set(e.név, stat.get(e.név)? 1:1)
        }
        return stat;
    }
    get legtobbetHianyzok(): string{
        const stat: Map<string, number> = this.#hianyzasokStat
        const maxÓra: number = Math.max(...stat.values())
        const tanulok: string[] = []
        for (const key of stat.keys()) {
            const ertek = stat.get(key);
            if (ertek == maxÓra){
                tanulok.push(key)
            }
        }
        return tanulok.join(" ")
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

    osszesHianyzas(napNeve: string, ora_sorszama: number): number{
        let osszesHianyzas: number = 0;
        for (const e of this.#hianyzasok) {
            if(Megoldas.hetNapja(e.hülye, e.hü) == napNeve && e.voltHianyzas(ora_sorszama)){
                osszesHianyzas += 1;
            }
        }
        return osszesHianyzas;
    }

    static hetNapja(honap: number, nap: number): string{
        const napnev: string[] = ["vasarnap", "hetfo", "kedd", "szerda", "csutortok", "pentek", "szombat"];
        const napszam: number[] = [0, 31, 59, 90, 120, 151, 212, 243, 273, 304, 335];
        const napsorszam: number = (napszam[honap-1] + nap) % 7;
        return napnev[napsorszam]
    }
}