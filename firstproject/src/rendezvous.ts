import { Logement } from "./logement";

export interface Rendezvous {
  id: number;
  date: string;
  heure: string;
  logement: Logement; 
  numTel: string;
}
