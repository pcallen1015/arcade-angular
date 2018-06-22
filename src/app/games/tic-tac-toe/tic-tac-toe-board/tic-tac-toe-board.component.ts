import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesService } from '../../games.service';

/**
 * An individual cell of a Tic-Tac-Toe game that players can claim
 */
class TicTacToeCell {
  /**
   * The player who has "claimed" the cell
   */
  private _status: TicTacToePlayer;

  /**
   * Initialize the cell:
   * 
   * status: none (nobody has claimed it)
   */
  constructor() {
    this._status = null;
  }

  /**
   * Get the player who has claimed the cell
   */
  public get status(): TicTacToePlayer { return this._status; }

  /**
   * Handle a click event on the cell, set the cell's status to the player who clicked
   * @param player 
   */
  public click(player: TicTacToePlayer): boolean {
    if (this._status !== null) {
      let message: string = `This cell is already claimed by Player ${this._status}!`;
      console.warn(message);
      alert(message);
      return false;
    }
    this._status = player;
    return true;
  }
}

/**
 * A row of a Tic-Tac-Toe board, containing cells
 */
class TicTacToeRow {
  /**
   * The cells in the row
   */
  private _cells: TicTacToeCell[];

  /**
   * Initialize the row:
   * 
   * cells: [cell, cell, cell]
   */
  constructor() {
    this._cells = [new TicTacToeCell(), new TicTacToeCell(), new TicTacToeCell()];
  }

  /**
   * Get the cells in the row
   */
  public get cells(): TicTacToeCell[] { return this._cells; }
}

/**
 * The different players in a Tic-Tac-Toe game
 */
enum TicTacToePlayer {
  X = 'X',
  O = 'O'
}

/**
 * The different results of a Tic-Tac-Toe game
 */
enum TicTacToeGameResult {
  playing = 'playing',
  won = 'won',
  draw = 'draw'
}

/**
 * Class for tracking the STATE of a Tic-Tac-Toe game
 */
class TicTacToeGameState {
  /**
   * The result of the game
   */
  private _result: TicTacToeGameResult;

  /**
   * The currently active player
   */
  private _currentPlayer: TicTacToePlayer;

  /**
   * The winner (if the game is over and the result is "won")
   */
  private _winner: TicTacToePlayer;

  /**
   * Initialize the state:
   * 
   * result: playing
   * current player: X
   * winner: none
   */
  constructor() {
    this._result = TicTacToeGameResult.playing;
    this._currentPlayer = TicTacToePlayer.X;
    this._winner = undefined;
  }

  /**
   * Get the result from the state
   */
  public get result(): TicTacToeGameResult { return this._result; }

  /**
   * Get the current player from the state
   */
  public get currentPlayer(): TicTacToePlayer { return this._currentPlayer; }

  /**
   * Get the winner from the state
   */
  public get winner(): TicTacToePlayer { return this._winner; }

  /**
   * Switch the current player
   */
  public switchPlayer(): void {
    if (this._currentPlayer === TicTacToePlayer.X) this._currentPlayer = TicTacToePlayer.O;
    else this._currentPlayer = TicTacToePlayer.X;
  }

  /**
   * Set the state to "won" and define the player who won the game
   * @param player 
   */
  public win(player: TicTacToePlayer) {
    this._winner = player;
    this._result = TicTacToeGameResult.won;
  }

  /**
   * Set the state to "draw" (and clear the winner)
   */
  public draw(): void {
    this._result = TicTacToeGameResult.draw;
    this._winner = undefined;
  }

  /**
   * Check if the state represents a "game over" state (won or draw)
   */
  public get gameOver(): boolean {
    return this._result === TicTacToeGameResult.won || this._result === TicTacToeGameResult.draw;
  }

  /**
   * Get a string representation of the state
   */
  public toString(): string {
    if (this._result === TicTacToeGameResult.won) return 'Winner!';
    if (this._result === TicTacToeGameResult.draw) return 'Draw!';
    return 'Playing...';
  }
}

/**
 * A Tic-Tac-Toe board
 */
@Component({
  selector: 'tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.scss']
})
export class TicTacToeBoardComponent implements OnInit {

  /**
   * Broadcast a "new game" event to parent component
   */
  @Output('onNewGame') newGame: EventEmitter<void> = new EventEmitter<void>();

  /**
   * The rows of the board
   */
  private _rows: TicTacToeRow[];

  /**
   * The state of the game
   */
  private _state: TicTacToeGameState;

  /**
   * Initialize the component
   * @param gamesService 
   */
  constructor(private gamesService: GamesService) { }

  /**
   * Initialize the component with a new game
   */
  public ngOnInit(): void {
    this.reset();
  }

  /**
   * Get the rows of the board
   */
  public get rows(): TicTacToeRow[] { return this._rows; }

  /**
   * Get the state of the game
   */
  public get state(): TicTacToeGameState { return this._state; }

  /**
   * Get the columns of the board (transpose the rows)
   */
  private get columns(): TicTacToeCell[][] {
    let columns: TicTacToeCell[][] = [];
    for (let c: number = 0; c < 3; c++) {
      let column: TicTacToeCell[] = [];
      for (let r: number = 0; r < this._rows.length; r++) {
        column.push(this._rows[r].cells[c]);
      }
      columns.push(column);
    }
    return columns;
  }

  /**
   * Get the diagonals of the board
   */
  private get diagonals(): TicTacToeCell[][] {
    let lrDiagonal: TicTacToeCell[] = [];
    let rlDiagonal: TicTacToeCell[] = [];
    for (let i: number = 0; i < this._rows.length; i++) {
      lrDiagonal.push(this._rows[i].cells[i]);
      rlDiagonal.push(this._rows[i].cells[3 - (i + 1)]);
    }
    return [lrDiagonal, rlDiagonal];
  }

  /**
   * Check for a winner in a collection of cells. If all the given cells are claimed by the same player, that player is the winner
   * @param cells 
   */
  private checkForWinner(cells: TicTacToeCell[]): TicTacToePlayer {
    if (cells.filter((cell: TicTacToeCell) => cell.status === TicTacToePlayer.X).length === 3) return TicTacToePlayer.X;
    if (cells.filter((cell: TicTacToeCell) => cell.status === TicTacToePlayer.O).length === 3) return TicTacToePlayer.O;
    return null;
  }

  /**
   * Update the state of the game by checking for game over conditions or updating the current player
   */
  public updateGameState(): void {

    // Check for Game Over

    // Check for WIN
    let winner: TicTacToePlayer = null;
    let allCells: TicTacToeCell[] = [];

    // Horizontal
    for (let r: number = 0; r < this.rows.length; r++) {
      allCells = allCells.concat(this.rows[r].cells);
      if (winner = this.checkForWinner(this.rows[r].cells)) {
        this._state.win(winner);
        return;
      }
    }

    // Vertical
    for (let c: number = 0; c < this.columns.length; c++) {
      if (winner = this.checkForWinner(this.columns[c])) {
        this._state.win(winner);
        return;
      }
    }

    // Diagonals
    for (let d: number = 0; d < this.diagonals.length; d++) {
      if (winner = this.checkForWinner(this.diagonals[d])) {
        this._state.win(winner);
        return;
      }
    }

    // Check for DRAW (all cells occupied, no winner)
    if (allCells.filter((cell: TicTacToeCell) => cell.status === null).length === 0) {
      this._state.draw();
      return;
    }

    // Game is still being played, switch players
    this._state.switchPlayer();
  }

  /**
   * Handle a cell click event (a "move")
   * @param cell 
   */
  public click(cell: TicTacToeCell): void {
    if (!this._state.gameOver && cell.click(this._state.currentPlayer)) {
      this.updateGameState();

      if (this._state.result === TicTacToeGameResult.won) {
        console.log(`WINNER: ${this._state.winner}`);
        this.gamesService.reportWin('Tic-Tac-Toe', this._state.winner.toString()).subscribe()
      } else if (this._state.result === TicTacToeGameResult.draw) {
        console.log('DRAW!');
      }
    }
  }

  /**
   * Reset the game
   */
  public reset(): void {
    this._rows = [new TicTacToeRow(), new TicTacToeRow(), new TicTacToeRow()];
    this._state = new TicTacToeGameState();
  }

}
