import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, children: [
    { path: 'comic/:id', component: ComicDetailComponent }
  ]},
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: '/home' }
];

/*
{ path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'terms', component: TermsComponent, resolve:[RouteResolverService] },
  { path: 'events', component: CountrySelectionComponent, resolve:[RouteResolverService] },
  { path: ':lang', children: [
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: 'events', component: EventListComponent },
    { path: 'event/:id', component: EventDetailComponent },
    { path: 'terms', component: TermsComponent },
  ], resolve:[RouteResolverService], runGuardsAndResolvers: "always" },
  // runGuardsAndResolvers is needed for rerunning resolver, when user enters in detail-view and goes back to event overview
  { path: '**', redirectTo: '/events' }
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
