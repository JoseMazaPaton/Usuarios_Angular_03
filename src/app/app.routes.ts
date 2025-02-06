import { Routes } from '@angular/router';
import { UsuarioListComponent } from './pages/usuario-list/usuario-list.component';
import { UsuarioViewComponent } from './pages/usuario-view/usuario-view.component';
import { UsuarioFormComponent } from './pages/usuario-form/usuario-form.component';

export const routes: Routes = [
    { path: "", pathMatch: "full", redirectTo: "home"},
    { path: "home", component: UsuarioListComponent},
    { path: "user/:_id", component: UsuarioViewComponent},
    { path: "newuser", component: UsuarioFormComponent},
    { path: "updateuser/:_id", component: UsuarioFormComponent},



    { path: "**", redirectTo: "home"}
];
