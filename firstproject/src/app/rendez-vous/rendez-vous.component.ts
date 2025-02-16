import { Component, OnInit } from '@angular/core';
import { RendezvousService } from '../services/rendezvous.service';
import { Rendezvous } from 'src/rendezvous';

@Component({
  selector: 'app-rendez-vous',
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.css']
})
export class RendezVousComponent implements OnInit {
  rendezvousList: Rendezvous[] = [];
  constructor(private rendezvousService: RendezvousService) {}

  ngOnInit() {
    this.rendezvousService.getRendezvous().subscribe({
      next: (data) => this.rendezvousList = data
      });
  }
 
  delete(rendezvousId: number) {
      this.rendezvousService.deleteRendezvousById(rendezvousId).subscribe({
        next: () => this.ngOnInit()
        });
  }

  update(rendezvous: Rendezvous) {
      const updatedRendezvous = { ...rendezvous,
        "date": "18/02/2025",
        "heure": "15:5:30",
       };
      this.rendezvousService.updateRendezvous(updatedRendezvous).subscribe({
        next: () => this.ngOnInit()
        })
      }
    
}
