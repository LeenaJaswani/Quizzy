import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HighscoresComponent } from './highscores/highscores.component';
import { QuizComponent } from './quiz/quiz.component';
import { EndComponent } from './end/end.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'highscores', component: HighscoresComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'end', component: EndComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' } // Wildcard route for undefined routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
