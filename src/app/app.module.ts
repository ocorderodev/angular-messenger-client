import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { appRoutingProvider, routing } from './app.routing';

import { AppComponent } from './app.component';
import { SingupComponent } from './components/singup/singup.component';
import { AuthComponent } from './components/auth/auth.component';
import { MessengerComponent } from './components/messenger/messenger.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SingupComponent,
    AuthComponent,
    MessengerComponent,
    NavbarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    appRoutingProvider,
    routing,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
