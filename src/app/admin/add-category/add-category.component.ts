import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  
  ngOnInit() {
    this.reloadData();
    
  }
  
  newCategoryName = '';
  id=0;
  categories:any;

  constructor(private categoryService: CategoryService) {}
  reloadData() {
    this.categoryService.getAll().subscribe(
      (res: Category[]) => {
        this.categories = res;
        console.log(res);
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  createCategory() {
    if (!this.selectedCategory) {
      // Create a new category
      const newCategory: Category = { id:this.id ,name: this.newCategoryName };
      
      this.categoryService.createCategory(newCategory).subscribe(
        () => {
          console.log('Category created successfully!');
          this.reloadData(); // Refresh the category list
          this.clearForm();
        },
        (error) => {
          console.error('Error creating category:', error);
        }
      );
    } else {
      // Update the selected category
      this.selectedCategory.name = this.newCategoryName;

      this.categoryService.updateCategory(this.selectedCategory.id, this.selectedCategory).subscribe(
        () => {
          console.log('Category updated successfully!');
          this.reloadData(); // Refresh the category list
          this.clearForm();
        },
        (error) => {
          console.error('Error updating category:', error);
        }
      );
    }
  }
  deleteEvents = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce poste?')) {
      this.categoryService.deleteEvent(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  }
  selectedCategory!: Category; // New property to store the selected category for update
  editCategory(category: Category) {
    // Set the selected category for update
    this.selectedCategory = { ...category };
    this.newCategoryName = category.name;
  }

  cancelUpdate() {
    this.clearForm();
  }

  clearForm() {
    // Clear the selected category and form
    this.selectedCategory ;
    this.newCategoryName = '';
  }


}
