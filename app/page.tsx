
import Megoldas  from "@/app/Megoldas";

type Searchparams = {
  hónap?: string;
  nap?: string;
  napNeve?: string;
  óra?: string;
}

export default async function HonePage({searchParams}:{searchParams: Searchparams}){
  const p = await searchParams;
  const hónap: number = Number(p.hónap) ? Number(p.hónap) : 2;
  const nap: number = Number(p.nap) ? Number(p.nap) : 3;
  const napNeve: string = p.napNeve ? p.napNeve: "szerda"
  const óra: number = Number(p.óra) ? Number(p.óra): 3

  const m: Megoldas = new Megoldas("naplo.txt");
  return(<div>
    
    <div>
      2. feladat
      <br />A naplóban {m.bejegyzésekSzáma} bejegyzés van.
      </div>
    <div>
      3. feladat <br />Az igazolt hiányzások száma: {m.összesIgazoltDb}, az igazolatlanoké: {m.összesIgazolatlanDb}
      </div>
    <form>
      5. feladat
      <p>A hónap sorszáma=<input 
      className="input input-sm" 
      defaultValue={hónap}
      name="hónap" 
      required
      type="text" 
      /></p>
      <p>A nap sorszáma=<input 
      className="input input-sm" 
      defaultValue={nap}
      name="nap" 
      required
      type="text" /></p>
      <p>A nap neve=<input 
      className="input input-sm" 
      defaultValue={napNeve}
      name="napNeve" 
      required
      type="text" /></p>
       <p>Óra=<input 
      className="input input-sm" 
      defaultValue={óra}
      name="óra" 
      required
      type="text" /></p>
      <p>7. feladat</p>
      <p>A legtöbbet hiányzott tanuló(k): {m.legtobbetHianyzok}</p>
      <button 
      className="hidden" 
      type="submit"></button>
    </form>
  </div>
  )
}