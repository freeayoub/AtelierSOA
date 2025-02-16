import { Component, OnInit } from '@angular/core';
import { RendezvousService } from '../services/rendezvous.service';
import { LogementService } from '../services/logement.service';
import { Rendezvous } from 'src/rendezvous';
import { Logement } from 'src/logement';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-rendezvous',
  templateUrl: './add-rendezvous.component.html',
  styleUrls: ['./add-rendezvous.component.css']
})
export class AddRendezvousComponent implements OnInit {
  rendezvous: Rendezvous = {
    id: 0,
    date: '',
    heure: '',
    logement: {} as Logement, 
    numTel: ''
  };
  logements: Logement[] = []; 
  rendezvouss: Rendezvous[] = []; 
  constructor(
    private rendezvousService: RendezvousService,
    private logementService: LogementService,
     private router: Router
  ) {}
  ngOnInit() {
    this.logementService.getLogements().subscribe({
      next: (data) => this.logements = data });
    this.rendezvousService.getRendezvous().subscribe({
      next: (data) => this.rendezvouss = data });
  }
  onSubmit() {
    let newrendezvous: Rendezvous = {
      id:  this.rendezvouss.length + 1,  
      date:  this.rendezvous.date,
      heure: this.rendezvous.heure,
      logement: this.rendezvous.logement, 
      numTel: this.rendezvous.numTel
    };
    this.rendezvousService.addRendezvous(newrendezvous).subscribe({
      next: () => {
        this.ngOnInit(),
        this.resetForm()
        this.router.navigate(['/rendezvous']);}
    });
  }
  resetForm() {
    this.rendezvous = {
      id: 0,
      date: '',
      heure: '',
      logement: {} as Logement,
      numTel: ''
    };
  }
}
