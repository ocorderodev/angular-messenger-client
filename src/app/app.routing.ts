import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

// Components
import { SingupComponent } from './components/singup/singup.component';
import { AuthComponent } from './components/auth/auth.component';
import { MessengerComponent } from './components/messenger/messenger.component';

const appRouter : Routes = [
    { path : 'register', component : SingupComponent },
    { path : '', component : AuthComponent },
    { path : 'home', component : MessengerComponent }
];

export const appRoutingProvider : any[] = [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRouter);