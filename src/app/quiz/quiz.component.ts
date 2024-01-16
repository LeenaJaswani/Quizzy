// quiz.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  questions: any[] = [];
  loading = true; 
  currentQuestion: any = {};
  choices: any[] = [];
  acceptingAnswers = false;
  score = 0;
  questionCounter = 0;
  maxQuestions = 5;
  selectedChoice: string | null = null;

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    this.fetchQuestions();
  }

  // fetchQuestions() {
  //   fetch('https://opentdb.com/api.php?amount=10&category=18&type=multiple')
  //     .then(res => res.json())
  //     .then(loadedQuestions => {
  //       this.questions = loadedQuestions.results;
  //       this.startQuiz();
  //     })
  //     .catch(err => console.log(err));
  // }
  fetchQuestions() {
    this.quizService.getQuestions().subscribe(
      (loadedQuestions: any) => {
        this.questions = loadedQuestions.results;
        this.startQuiz();
        this.loading = false; 
      },
      (error) => {
        // console.error(error);
        if (error.status === 429) {
          // Handle 429 status code (Too Many Requests)
          // You may want to navigate to a 404 page or show an error message
          this.router.navigate(['/404']);
        } else {
          // Handle other errors accordingly
         // console.error('An unexpected error occurred:', error);
          // Optionally, you can navigate to a general error page
           this.router.navigate(['/']);
        }
      }
    );
  }
  startQuiz() {
    this.questionCounter = 0;
    this.score = 0;
    this.getNewQuestion();
  }

 
  getNewQuestion() {
    if (this.questionCounter >= this.maxQuestions) {
      localStorage.setItem('mostRecentScore', this.score.toString());
      this.router.navigate(['/end']);
    } else {
      this.currentQuestion = this.questions[this.questionCounter];
      const incorrectChoices = this.currentQuestion.incorrect_answers.map((choice) => ({
        text: choice,
        isCorrect: false
      }));
      const correctChoice = {
        text: this.currentQuestion.correct_answer,
        isCorrect: true
      };
      this.choices = this.shuffleArray([...incorrectChoices, correctChoice]);
      this.acceptingAnswers = true;
    }
  }
  
  nextQuestion() {
    this.questionCounter++;
    this.getNewQuestion();
  }
  
  
  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  checkAnswer(choice: string) {
    if (!this.acceptingAnswers) return;
  
    this.acceptingAnswers = false;
    this.selectedChoice = choice;
    const correctChoice = this.currentQuestion.correct_answer;
  
    if (choice === correctChoice) {
      this.incrementScore();
    }
  
    // Do not automatically go to the next question here
  }

  incrementScore() {
    this.score += 10;
  }

  getProgressPercentage() {
    return ((this.questionCounter+1) / this.maxQuestions) * 100;
  }

  getChoicePrefix(index: number): string {
    return String.fromCharCode(65 + index);
  }
  finishQuiz() {
    // You can perform any finishing logic here
    localStorage.setItem('mostRecentScore', this.score.toString());
    this.router.navigate(['/end']);
  }
}
