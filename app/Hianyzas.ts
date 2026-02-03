export default class Hiányzás {
    #név: string;
    #hiányzásKód: string;
    #hónap: number;
    #nap: number;
    get hülye(): number {
        return this.#hónap
    }
    get hü(): number {
        return this.#nap
    }

    get hianyzasdb(): number{
        return this.igazoltDb + this.igazolatlanDb;
    }

    get igazoltDb(): number{
        return this.#megszámol("X")
    }

    get igazolatlanDb(): number{
        return this.#megszámol("I")
    }
    get név():string{
        return this.#név
    }

    constructor(adatsor: string, dátum: string){
        let m: string[] = adatsor.split(" ");
        this.#név =  `${m[0]} ${m[1]}`;
        this.#hiányzásKód = m[2];
        m = dátum.split(" ");
        this.#hónap = parseInt(m[1])
        this.#nap = parseInt(m[2])
    }

    #megszámol(ch: string): number{
        let db = 0
        for (const e of this.#hiányzásKód) {
            if (e == ch){db++}
        }
        return db;
    }

    voltHianyzas(ora_sorszama: number): boolean{
        const ora_indexe = ora_sorszama - 1;
        return this.#hiányzásKód[ora_indexe] == "I" || this.#hiányzásKód[ora_indexe] == "X"
    }
}