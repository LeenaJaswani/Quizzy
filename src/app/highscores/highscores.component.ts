import { Component } from '@angular/core';

@Component({
  selector: 'app-highscores',
  templateUrl: './highscores.component.html',
  styleUrls: ['./highscores.component.css']
})
export class HighscoresComponent {
  highScores: any[] = JSON.parse(localStorage.getItem('highScores')) || [];
}
