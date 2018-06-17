import { Component, OnInit, Input } from '@angular/core';
import { GamesService } from '../../games/games.service';

enum TicTacToePlayer {
  X = 'X',
  O = 'O'
}

class TicTacToeCell {
  private _status: TicTacToePlayer;

  constructor() {
    this._status = null;
  }

  public get status(): TicTacToePlayer { return this._status; }

  public click(player: TicTacToePlayer): boolean {
    if (this._status !== null) {
      console.warn(`This cell is already claimed!`);
      return false;
    }
    this._status = player;
    return true;
  }
}

class TicTacToeRow {
  private _cells: TicTacToeCell[];

  constructor() {
    this._cells = [new TicTacToeCell(), new TicTacToeCell(), new TicTacToeCell()];
  }

  public get cells(): TicTacToeCell[] { return this._cells; }
}

class TicTacToeBoard {
  private _rows: TicTacToeRow[];

  constructor() {
    this._rows = [new TicTacToeRow(), new TicTacToeRow(), new TicTacToeRow()];
  }

  public get rows(): TicTacToeRow[] { return this._rows; }

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
}

@Component({
  selector: 'tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.scss']
})
export class TicTacToeBoardComponent implements OnInit {
  public board: TicTacToeBoard;
  public currentPlayer: TicTacToePlayer;
  public winner: TicTacToePlayer = null;

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.reset();
  }

  private switchPlayer(): void {
    if (this.currentPlayer === TicTacToePlayer.X) this.currentPlayer = TicTacToePlayer.O;
    else this.currentPlayer = TicTacToePlayer.X;
  }

  private checkForWinner(cells: TicTacToeCell[]): TicTacToePlayer {
    if (cells.filter((cell: TicTacToeCell) => cell.status === TicTacToePlayer.X).length === 3) return TicTacToePlayer.X;
    if (cells.filter((cell: TicTacToeCell) => cell.status === TicTacToePlayer.O).length === 3) return TicTacToePlayer.O;
    return null;
  }

  private checkForGameOver(): TicTacToePlayer {
    console.log(`Checking for winner...`);
    let winner: TicTacToePlayer = null;
    // Horizontal
    for (let r: number = 0; r < this.board.rows.length; r++) {
      if (winner = this.checkForWinner(this.board.rows[r].cells)) return winner;
    }

    // Vertical
    for (let c: number = 0; c < this.board.columns.length; c++) {
      if (winner = this.checkForWinner(this.board.columns[c])) return winner;
    }

    // Diagonals
    for (let d: number = 0; d < this.board.diagonals.length; d++){
      if (winner = this.checkForWinner(this.board.diagonals[d])) return winner;
    }

    return winner;
  }

  public click(cell: TicTacToeCell): void {
    if (!this.winner && cell.click(this.currentPlayer)) {
      this.switchPlayer();
      if (this.winner = this.checkForGameOver()) {
        console.log(this.winner);
        this.gamesService.reportWin('Tic-Tac-Toe', this.winner.toString()).subscribe(() => {
          console.log('win reported!');
        });
      }
    }
  }

  public reset(): void {
    this.board = new TicTacToeBoard();
    this.currentPlayer = TicTacToePlayer.X;
    this.winner = null;
  }

}
