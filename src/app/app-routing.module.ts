import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { TodoMainComponent } from './todo-main/todo-main.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'todo', component: TodoMainComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
