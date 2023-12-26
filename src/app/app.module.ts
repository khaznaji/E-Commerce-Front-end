import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './admin/menu/menu.component';
import { NotFoundComponent } from './admin/not-found/not-found.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SubcategoryComponent } from './admin/subcategory/subcategory.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProductsComponent } from './admin/products/products.component';
import { ListProductsComponent } from './admin/products/list/list-products/list-products.component';
import { DetailsProductsComponent } from './admin/products/list/details-products/details-products.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    MenuComponent,
    NotFoundComponent,
    SubcategoryComponent,
    ProductsComponent,
    ListProductsComponent,
    DetailsProductsComponent
  ],
  imports: [NgbModule,
    
    BrowserModule,
    MatPaginatorModule,
    AppRoutingModule, 
    FormsModule , 
    HttpClientModule, 
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      // Ajoutez d'autres options de personnalisation de style ici
    }),BrowserAnimationsModule, NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
