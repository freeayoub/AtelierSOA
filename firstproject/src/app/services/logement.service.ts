import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Logement } from 'src/logement'; // Assuming correct path to Logement interface

@Injectable({
  providedIn: 'root',
})
export class LogementService {
  private apiUrl = 'http://localhost:8082/LogementRendezVous_Etudiant_war/api/logement';

  constructor(private http: HttpClient) {}

  // Récupérer tous les logements
  getLogements(): Observable<Logement[]> {
    return this.http
      .get<Logement[]>(`${this.apiUrl}/getAll`)
      .pipe(catchError(this.handleError));
  }

// Ajouter un logement
addLogement(logement: Logement): Observable<any> {
  console.log('Tentative d\'ajout du logement:', logement);
  return this.http
    .post<any>(`${this.apiUrl}/new`, logement, { responseType: 'text' as 'json' })
    .pipe(catchError(this.handleError));
}


  // Supprimer un logement par référence
  deleteLogementByReference(reference: number): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/del/${reference}`,{ responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  // Mettre à jour un logement
  updateLogement(logement: Logement): Observable<any> {
    console.log('Tentative de mise à jour du logement:', logement);
    return this.http
      .put<any>(`${this.apiUrl}/update/${logement.reference}`, logement, { responseType: 'text' as 'json' })
      .pipe(catchError(this.handleError));
  }

  // Gestion des erreurs
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Problème avec l\'API des logements.';

    // Handle specific error codes
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Erreur côté client: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Erreur côté serveur: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
