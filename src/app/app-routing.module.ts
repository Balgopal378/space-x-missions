import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MissionsComponent } from './missions/missions.component';

const routes: Routes = [
    {
        path: '',
        component: MissionsComponent,
        data: {
            title: 'Launches',
        },
      },
  ];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
