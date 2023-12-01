import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCategoryComponent } from './admin/add-category/add-category.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './admin/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    AddCategoryComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule , 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
