import { Component, OnInit } from '@angular/core';
import { LogementService } from '../services/logement.service';
import { Logement } from 'src/logement';

@Component({
  selector: 'app-logement',
  templateUrl: './logement.component.html',
  styleUrls: ['./logement.component.css'],
})
export class LogementComponent implements OnInit {
  logements: Logement[] = []; 
  constructor(private logementService: LogementService) {}
  ngOnInit() {
    this.logementService.getLogements().subscribe({
      next: (data) => this.logements = data });
  }
  delete(logementReference: number) {
      this.logementService.deleteLogementByReference(logementReference).subscribe({
        next: () => this.ngOnInit() 
        });
  }
update(logement: Logement) {
  const updatedLogement = { 
    "reference": logement.reference,
    "adresse": logement.adresse,
    "delegation": logement.delegation,
    "gouvernorat": logement.gouvernorat,
    "type": logement.type,
    "description": logement.description,
    "prix": logement.prix + 50
  };
  this.logementService.updateLogement(updatedLogement).subscribe({
    next: () => 
      this.ngOnInit()});
}
}
