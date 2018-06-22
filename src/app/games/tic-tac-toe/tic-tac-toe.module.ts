import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeGameComponent } from './tic-tac-toe-game/tic-tac-toe-game.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TicTacToeGameComponent,
  ],
  exports: [
    TicTacToeGameComponent,
  ]
})
export class TicTacToeModule { }
