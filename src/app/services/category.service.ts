import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'https://localhost:7066/api/categories';
  constructor(private http:HttpClient
    ) { }
   
  createCategory(category: Category, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('name', category.name);
    formData.append('image', image, image.name); // Changer 'image' à 'imageUrl'

    return this.http.post<any>(this.apiUrl, formData);
  }

    getAll(): Observable<any> {
      return this.http.get(`${this.apiUrl}`);
    }
    deleteEvent(id: number): Observable<any> {
      return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }
    updateCategory(id: number, category: Category, image: File): Observable<Category> {
      const formData = new FormData();
      formData.append('id', id.toString()); 
      formData.append('name', category.name);
      formData.append('image', image, image.name);
      return this.http.put<any>(`${this.apiUrl}/${id}`, formData);
    }
    toggleArchive(categoryId: number ): Observable<any> {
      const url = `${this.apiUrl}/toggle-archive/${categoryId}`;
  
      // Envoyer une requête HTTP PUT pour basculer l'archivage
      return this.http.put<any>(url, {});
    }
}
