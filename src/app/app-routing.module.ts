import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { MenuComponent } from './admin/menu/menu.component';
import { NotFoundComponent } from './admin/not-found/not-found.component';
import { SubcategoryComponent } from './admin/subcategory/subcategory.component';
import { ProductsComponent } from './admin/products/products.component';
import { ListProductsComponent } from './admin/products/list/list-products/list-products.component';
import { DetailsProductsComponent } from './admin/products/list/details-products/details-products.component';
import { MenufrontComponent } from './visitor/menufront/menufront.component';
import { ListProductsFrontComponent } from './visitor/list-products-front/list-products-front.component';

const routes: Routes = [
{  path: 'admin', component: MenuComponent ,children: [
  {path:'add-category', component:AddCategoryComponent},
  {path:'subcategory', component:SubcategoryComponent},
  {path:'add-products', component:ProductsComponent},
  {path:'list-products', component:ListProductsComponent},
  {path:'detail-product/:id', component:DetailsProductsComponent},

]

},
{path: '', component: MenufrontComponent ,children: [
  {path:'products', component:ListProductsFrontComponent},]
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
