import { Component, forwardRef } from '@angular/core';
import { GameComponent } from '../../game-component';

/**
 * A Tic-Tac-Toe game
 */
@Component({
  selector: 'tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss'],
  providers: [{ provide: GameComponent, useExisting: forwardRef(() => TicTacToeGameComponent) }]
})
export class TicTacToeGameComponent extends GameComponent {

  /**
   * Initialize the component
   */
  constructor() { super(); }

  /**
   * Start a new Tic-Tac-Toe game
   */
  public newGame(): void {
    console.info('Starting a new Tic-Tac-Toe game');
  }

}
