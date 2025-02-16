import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LogementComponent } from './logement/logement.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
import { AddRendezvousComponent } from './add-rendezvous/add-rendezvous.component';
import { AddLogementComponent } from './add-logement/add-logement.component';
const routes: Routes = [
  { path: '', redirectTo: '/logement', pathMatch: 'full' },
  { path: 'logement', component: LogementComponent },
  { path: 'addLogement', component:AddLogementComponent },
  { path: 'rendezvous', component:RendezVousComponent },
  { path: 'addRendezvous', component:AddRendezvousComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}




