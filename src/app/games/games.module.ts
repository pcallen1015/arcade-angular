import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GamesService } from './games.service';

// Individual Games
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { RockPaperScissorsModule } from './rock-paper-scissors/rock-paper-scissors.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,

    TicTacToeModule,
    RockPaperScissorsModule,
  ],
  declarations: [],
  exports: [
    TicTacToeModule,
    RockPaperScissorsModule,
  ],
  providers: [
    GamesService,
  ]
})
export class GamesModule { }
