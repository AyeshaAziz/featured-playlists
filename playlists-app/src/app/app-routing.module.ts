import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './app-routes.enum';
import { PlaylistComponent } from './playlist/playlist.component';
import { ExternalLinkGuard } from './link.gaurd';
@Component({
  selector: 'app-empty',
  template: '',
})

export class EmptyComponent {}
const routes: Routes = [
  { path: AppRoutes.DefaultRoot, component: PlaylistComponent },
  {
    path: AppRoutes.ExternalRedirect,
    canActivate: [ExternalLinkGuard],
    component: EmptyComponent,
    data: {
      externalLink: true,
    },
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
