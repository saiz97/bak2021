import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ComicListComponent } from './components/comic-list/comic-list.component';
import { ComicDetailComponent } from './components/comic-detail/comic-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { GlobalConstants } from './shared/global.variables';
import { LoaderComponent } from './shared/loader/loader.component';
import { ComicsComponent } from './components/comics/comics.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ComicListComponent,
    ComicDetailComponent,
    FavoritesComponent,
    LoaderComponent,
    ComicsComponent,
    AuthComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [GlobalConstants],
  bootstrap: [AppComponent]
})
export class AppModule { }
