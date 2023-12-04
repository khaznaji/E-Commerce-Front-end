import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './admin/menu/menu.component';
import { NotFoundComponent } from './admin/not-found/not-found.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    MenuComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule , 
    HttpClientModule, 
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      // Ajoutez d'autres options de personnalisation de style ici
    }),BrowserAnimationsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
