import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from "./profile/profile.component";
import { ExpComponent } from "./exp/exp.component";
import { ContactsComponent } from "./contacts/contacts.component";
import { LoginComponent } from "./login/login.component";


const routes: Routes = [
  { path: "", component: ProfileComponent },
  { path: "exp", component: ExpComponent },
  { path: "contacts", component: ContactsComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
