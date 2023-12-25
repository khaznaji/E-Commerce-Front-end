import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'https://localhost:7066/api/product';
  constructor(private http:HttpClient
    ) { }

    /*addProduct(productData: any) {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post(`${this.apiUrl}`, productData, { headers });
    }*/
/*addProduct(formData: FormData): Observable<any> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  return this.http.post(`${this.apiUrl}`, formData, { headers });
}*/
addProduct(projectData: FormData) {
  return this.http.post(`${this.apiUrl}`, projectData);
}

addProducts(product: FormData): Observable<Product> {
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  return this.http.post<Product>(`${this.apiUrl}`, product, { headers });
}
    
}
