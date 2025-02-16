import { Component, OnInit } from '@angular/core';
import { LogementService } from '../services/logement.service';
import { Router } from '@angular/router';
import { Logement } from 'src/logement';

@Component({
  selector: 'app-add-logement',
  templateUrl: './add-logement.component.html',
  styleUrls: ['./add-logement.component.css'],
})
export class AddLogementComponent implements OnInit {
  logement: Logement = {  
    reference: 0,         
    adresse: '',
    delegation: '',
    gouvernorat: '',
    type: '',
    description: '',
    prix: 0.0,
  };
  logements: Logement[] = []; 
  constructor(
    private logementService: LogementService,
    private router: Router) {
     }
     ngOnInit() {
      this.logementService.getLogements().subscribe({
        next: (data) => this.logements = data });
    }
    
  onSubmit() {
    let newLogement: Logement = {
      reference: this.logements.length + 1,  
      adresse: this.logement.adresse,
      delegation: this.logement.delegation,
      gouvernorat: this.logement.gouvernorat,
      type: this.logement.type,
      description: this.logement.description,
      prix: this.logement.prix,
    };
    this.logementService.addLogement(newLogement).subscribe({
      next: () => {
        this.ngOnInit();
        this.router.navigate(['/logement']);
      }});
  }
  
}
