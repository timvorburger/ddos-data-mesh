import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavCardListComponent } from './components/nav-card-list/nav-card-list.component';

const routes: Routes = [
  { path: '', component: NavCardListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
