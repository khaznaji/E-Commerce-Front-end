import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:7066/api/categories';
  constructor(private http:HttpClient
    ) { }
    createCategory(category: Category): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}`, category);
    }
    getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}`);
    }
    deleteEvent(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }
    updateCategory(id: number, category: Category): Observable<Category> {
      const url = `${this.apiUrl}/${id}`;
      return this.http.put<Category>(url, category);
    }
}
