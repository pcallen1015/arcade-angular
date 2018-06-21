import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RockPaperScissorsGameComponent } from './rock-paper-scissors-game/rock-paper-scissors-game.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RockPaperScissorsGameComponent
  ],
  exports: [
    RockPaperScissorsGameComponent
  ]
})
export class RockPaperScissorsModule { }
