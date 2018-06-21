import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { GamesModule } from './games/games.module';

const routes: Routes = [
  { path: '', redirectTo: 'browse', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),

    GamesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
