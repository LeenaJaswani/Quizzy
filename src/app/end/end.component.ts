import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-end',
  templateUrl: './end.component.html',
  styleUrls: ['./end.component.css']
})
export class EndComponent {
  mostRecentScore: string = localStorage.getItem('mostRecentScore') || '0';
  username: string = '';
  saveScoreButtonDisabled = true;
  highScores: any[] = JSON.parse(localStorage.getItem('highScores')) || [];

  constructor(private router: Router) {}

  onUsernameChange() {
    this.saveScoreButtonDisabled = !this.username.trim();
  }

  savedHighScore() {
    const score = {
      score: this.mostRecentScore,
      username: this.username.trim()
    };
    this.highScores.push(score);
    this.highScores.sort((a, b) => b.score - a.score);
    this.highScores = this.highScores.slice(0, 5);
    localStorage.setItem('highScores', JSON.stringify(this.highScores));
    this.router.navigate(['/']);
  }
}
