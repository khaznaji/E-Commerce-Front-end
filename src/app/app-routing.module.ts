import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { MenuComponent } from './admin/menu/menu.component';

const routes: Routes = [
{  path: 'admin', component: MenuComponent ,children: [
  {path:'add-category', component:AddCategoryComponent}]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
