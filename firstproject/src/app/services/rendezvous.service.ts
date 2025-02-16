import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Rendezvous } from 'src/rendezvous';

@Injectable({
  providedIn: 'root',
})
export class RendezvousService {
  private apiUrl = 'http://localhost:8082/LogementRendezVous_Etudiant_war/api/rendezvous'; 

  constructor(private http: HttpClient) {}
 
  getRendezvous(): Observable<Rendezvous[]> {
    return this.http
      .get<Rendezvous[]>(`${this.apiUrl}/list`)
      .pipe(catchError(this.handleError));
  }

  addRendezvous(rendezvous: Rendezvous): Observable<Rendezvous> {
    return this.http
      .post<Rendezvous>(`${this.apiUrl}/new`, rendezvous,{ responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  deleteRendezvousById(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/del/${id}`,{ responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  updateRendezvous(rendezvous: Rendezvous): Observable<Rendezvous> {
    return this.http
      .put<Rendezvous>(`${this.apiUrl}/update/${rendezvous.id}`, rendezvous,{ responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('Erreur API :', error);
    return throwError(() => new Error("Problème avec l'API des rendez-vous."));
  }
}
