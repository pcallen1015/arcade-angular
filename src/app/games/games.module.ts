import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { GamesService } from './games.service';
import { BrowseGamesComponent } from './browse-games/browse-games.component';
import { GameViewComponent } from './game-view/game-view.component';

// Individual Games
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { RockPaperScissorsModule } from './rock-paper-scissors/rock-paper-scissors.module';

const routes: Routes = [
  { path: 'browse', component: BrowseGamesComponent },
  { path: 'game/:gameId', component: GameViewComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild(routes),

    TicTacToeModule,
    RockPaperScissorsModule,
  ],
  declarations: [
    GameViewComponent,
    BrowseGamesComponent
  ],
  exports: [
    GameViewComponent,

    TicTacToeModule,
    RockPaperScissorsModule,
  ],
  providers: [
    GamesService,
  ]
})
export class GamesModule { }
