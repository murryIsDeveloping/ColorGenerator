import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: "generator", loadChildren: () => import('./../generator/generator.module').then(m => m.GeneratorModule)},
  { path: "", pathMatch: "full", redirectTo: "generator" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
