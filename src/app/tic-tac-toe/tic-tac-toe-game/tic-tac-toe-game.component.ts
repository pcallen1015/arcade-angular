import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { TicTacToeBoardComponent } from '../tic-tac-toe-board/tic-tac-toe-board.component';

@Component({
  selector: 'tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.scss']
})
export class TicTacToeGameComponent implements AfterViewInit {
  @ViewChild(TicTacToeBoardComponent) board: TicTacToeBoardComponent;

  constructor() { }

  public ngAfterViewInit(): void {
    this.newGame();
  }

  public newGame(): void {
    console.info('Starting a new Tic-Tac-Toe game');
    this.board.reset();
  }

}
