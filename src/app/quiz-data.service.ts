// // src/app/quiz.service.ts

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class QuizDataService {
//   private questions: any[] = [];
//   private currentQuestion: any = {};
//   private availableQuestions: any[] = [];
//   private questionCounter = 0;
//   private score = 0;
//   private mostRecentScore = 0;
//   private highScores: any[] = [];
//   private maxQuestions = 5;

//   constructor(private http: HttpClient) {}

//   startQuiz(): any {
//     return this.http.get<any[]>('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
//   }

//   initializeQuiz(questions: any[]): void {
//     this.questions = questions;
//     this.availableQuestions = [...questions];
//     this.getNewQuestion();
//   }

//   getNewQuestion(): void {
//     if (this.availableQuestions.length === 0 || this.questionCounter >= this.maxQuestions) {
//       this.mostRecentScore = this.score;
//       return;
//     }

//     this.questionCounter++;
//     this.currentQuestion = this.availableQuestions.shift() || {};
//   }

//   getCurrentQuestion(): any {
//     return this.currentQuestion;
//   }

//   getChoices(): any[] {
//     const choices = [];

//     for (let i = 1; i <= 4; i++) {
//       choices.push(this.currentQuestion[`choice${i}`] || ''); // Use default value if undefined
//     }

//     return choices;
//   }


//   checkAnswer(selectedAnswer: number): boolean {
//     return selectedAnswer === this.currentQuestion.answer;
//   }

//   incrementScore(): void {
//     this.score += 10; // Adjust as needed
//   }

//   getQuestionCounter(): number {
//     return this.questionCounter;
//   }

//   getScore(): number {
//     return this.score;
//   }

//   getMaxQuestions(): number {
//     return this.maxQuestions;
//   }

//   getMostRecentScore(): number {
//     return this.mostRecentScore;
//   }

//   saveHighScore(username: string): void {
//     const score = { username, score: this.mostRecentScore };
//     this.highScores.push(score);
//     this.highScores.sort((a, b) => b.score - a.score);
//     this.highScores.splice(5);

//     // Save high scores to localStorage or a backend service
//     localStorage.setItem('highScores', JSON.stringify(this.highScores));
//   }

//   getHighScores(): any[] {
//     // Retrieve high scores from localStorage or a backend service
//     return this.highScores;
//   }
// }
