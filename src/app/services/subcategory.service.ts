import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SubCategory } from '../models/subcategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  private apiUrl = 'https://localhost:7066/api/SubCategory';

  constructor(private http:HttpClient) { }
  add(projectData: FormData) {
    return this.http.post(`${this.apiUrl}`, projectData);
  }
  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
  createSubcategory(subcategory: SubCategory): Observable<SubCategory> {
    const formData = new FormData();
    formData.append('name', subcategory.name);
    formData.append('description', subcategory.description);
    formData.append('categoryId', String(subcategory.categoryId));
    //formData.append('date', subcategory.date.toISOString());
   // formData.append('archive', subcategory.archive.toString());

    return this.http.post<SubCategory>(`${this.apiUrl}`, formData);
  }
  updateProject(projectId: number, projectData: FormData): Observable<SubCategory> {
    const url = `${this.apiUrl}/${projectId}`;
    return this.http.put<SubCategory>(url, projectData);
  }
  getAll(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
  toggleArchive(categoryId: number ): Observable<any> {
    const url = `${this.apiUrl}/toggle-archive/${categoryId}`;

    // Envoyer une requête HTTP PUT pour basculer l'archivage
    return this.http.put<any>(url, {});
  }
  deleteMultipleSubcategories(subcategoryIds: number[]): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-multiple`, { body: subcategoryIds });
  }
  deleteAllSubcategories(): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete-all`);
  }
}
