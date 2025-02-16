import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { LogementComponent } from './logement/logement.component';
import { AddLogementComponent } from './add-logement/add-logement.component';
import { AddRendezvousComponent } from './add-rendezvous/add-rendezvous.component';
import { RendezVousComponent } from './rendez-vous/rendez-vous.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NotFoundComponent,
    LogementComponent,
    RendezVousComponent,
    AddRendezvousComponent,
    AddLogementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
