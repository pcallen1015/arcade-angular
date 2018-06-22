import { Component, ViewChild, forwardRef } from '@angular/core';
import { GameComponent } from '../../game-component';
import { TicTacToeBoardComponent } from '../tic-tac-toe-board/tic-tac-toe-board.component';

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
   * Reference to the Tic-Tac-Toe board component
   */
  @ViewChild(TicTacToeBoardComponent) board: TicTacToeBoardComponent;

  /**
   * Initialize the component
   */
  constructor() { super(); }

  /**
   * Start a new Tic-Tac-Toe game
   */
  public newGame(): void {
    console.info('Starting a new Tic-Tac-Toe game');
    this.board.reset();
  }

}
