import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

// Tic-Tac-Toe
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';

// Rock-Paper-Scissors
import { RockPaperScissorsModule } from './rock-paper-scissors/rock-paper-scissors.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    TicTacToeModule,
    RockPaperScissorsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
