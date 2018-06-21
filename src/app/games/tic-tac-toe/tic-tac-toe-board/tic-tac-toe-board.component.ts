import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GamesService } from '../../games.service';

/**
 * An individual cell of a Tic-Tac-Toe game that players can claim
 */
class TicTacToeCell {
  private _status: TicTacToePlayer;

  constructor() {
    this._status = null;
  }

  public get status(): TicTacToePlayer { return this._status; }

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
  private _cells: TicTacToeCell[];

  constructor() {
    this._cells = [new TicTacToeCell(), new TicTacToeCell(), new TicTacToeCell()];
  }

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
  private _result: TicTacToeGameResult;
  private _currentPlayer: TicTacToePlayer;
  private _winner: TicTacToePlayer;

  constructor() {
    this._result = TicTacToeGameResult.playing;
    this._currentPlayer = TicTacToePlayer.X;
    this._winner = undefined;
  }

  public get result(): TicTacToeGameResult { return this._result; }
  public get currentPlayer(): TicTacToePlayer { return this._currentPlayer; }
  public get winner(): TicTacToePlayer { return this._winner; }

  public switchPlayer(): void {
    if (this._currentPlayer === TicTacToePlayer.X) this._currentPlayer = TicTacToePlayer.O;
    else this._currentPlayer = TicTacToePlayer.X;
  }

  public win(player: TicTacToePlayer) {
    this._winner = player;
    this._result = TicTacToeGameResult.won;
  }

  public draw(): void {
    this._result = TicTacToeGameResult.draw;
    this._winner = undefined;
  }

  public get gameOver(): boolean {
    return this._result === TicTacToeGameResult.won || this._result === TicTacToeGameResult.draw;
  }

  public toString(): string {
    if (this._result === TicTacToeGameResult.won) return 'Winner!';
    if (this._result === TicTacToeGameResult.draw) return 'Draw!';
    return 'Playing...';
  }
}

@Component({
  selector: 'tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.scss']
})
export class TicTacToeBoardComponent implements OnInit {
  @Output('onNewGame') newGame: EventEmitter<void> = new EventEmitter<void>();

  private _rows: TicTacToeRow[];
  private _state: TicTacToeGameState;

  constructor(private gamesService: GamesService) { }

  public ngOnInit(): void {
    this.reset();
  }

  public get rows(): TicTacToeRow[] { return this._rows; }
  public get state(): TicTacToeGameState { return this._state; }

  public get columns(): TicTacToeCell[][] {
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

  public get diagonals(): TicTacToeCell[][] {
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

    // Check for DRAW
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
