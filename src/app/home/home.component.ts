// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(private router: Router) {}

  startQuiz(): void {
    this.router.navigate(['/quiz']);
  }

  viewHighScores(): void {
    this.router.navigate(['/high-scores']);
  }
}
