import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { MenuComponent } from './admin/menu/menu.component';
import { NotFoundComponent } from './admin/not-found/not-found.component';

const routes: Routes = [
{  path: 'admin', component: MenuComponent ,children: [
  {path:'add-category', component:AddCategoryComponent}]
},
{
  path: 'not-found',
  component: NotFoundComponent
},
{
  path: '**',
  redirectTo: '/not-found'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
