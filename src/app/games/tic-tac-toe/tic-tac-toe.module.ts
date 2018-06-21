import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeGameComponent } from './tic-tac-toe-game/tic-tac-toe-game.component';
import { TicTacToeBoardComponent } from './tic-tac-toe-board/tic-tac-toe-board.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TicTacToeGameComponent,
    TicTacToeBoardComponent,
  ],
  exports: [
    TicTacToeGameComponent,
  ]
})
export class TicTacToeModule { }
