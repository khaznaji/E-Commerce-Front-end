import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';

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

  constructor(private categoryService: CategoryService, private toastr: ToastrService) {}
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
  selectedImage: File | null = null;
  imagePreview: string | undefined;

  newCategory: Category = new Category();
  file: File | null = null;
  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      // Générer l'aperçu de l'image
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(this.file);
    } 
  }
   createCategory() {
    if (!this.selectedCategory) { 
      if (!this.newCategory.name || !this.file) {
        console.error('Invalid category or image.');
        return;
      }
  
      this.categoryService.createCategory(this.newCategory, this.file).subscribe(
        (data) => {
          console.log('Category created successfully!', data);
          this.toastr.success('Category created successfully', '', {
            positionClass: 'toast-top-center', // Positionnez-le en haut au centre
            timeOut: 5000,
            progressBar: true,
            toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
            // Ajoutez d'autres options de personnalisation de style ici
          });
          
          window.location.reload();
 

        },
        (error) => {
          console.error('Error creating category:', error);
          console.log(this.file);
          console.log(this.newCategory.name);

        }
       ) 
    } else {
      this.selectedCategory.name = this.newCategory.name;
      
      // Update the selected category
      if (!this.newCategory.name || !this.file) {
        console.error('Invalid category or image.');
        return;
      }

      this.categoryService.updateCategory(this.selectedCategory.id, this.selectedCategory, this.file).subscribe(
        () => {
          console.log('Category updated successfully!');
          this.toastr.success('Category updated successfully', '', {
            positionClass: 'toast-top-center', // Positionnez-le en haut au centre
            timeOut: 5000,
            progressBar: true,
            toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
            // Ajoutez d'autres options de personnalisation de style ici
          });
          this.reloadData();
          this.clearForm();
          window.location.reload();

        },
        (error) => {
          console.error('Error updating category:', error);
          console.log('Category ID:', this.selectedCategory.id);
        }
      );
      
    }
  }
  deleteEvents = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
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
    this.newCategory.name = category.name;
  
    // Charger l'image existante dans le cadre de drag-and-drop
    this.loadExistingImage(category.imageUrl);
  }
  
  // Méthode pour charger l'image existante dans le cadre de drag-and-drop
  loadExistingImage(imageUrl: string) {
    // Construire le chemin complet de l'image
    const fullImageUrl = `../../../assets/E-Commerce Image/${imageUrl}`;
  
    // Charger l'image existante
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const blob = xhr.response;
      const file = new File([blob], 'existing_image', { type: blob.type });
      
      // Mettre à jour le file et l'aperçu de l'image
      this.file = file;
      this.handleFileSelection();
    };
    xhr.open('GET', fullImageUrl);
    xhr.responseType = 'blob';
    xhr.send();
  }
  
  
  cancelUpdate() {
    this.clearForm();
  }

  clearForm() {
    // Clear the selected category and form
    this.selectedCategory ;
    this.newCategoryName = '';
  }

  isAddCategoryModalVisible: boolean = false;

  // Méthode pour afficher le modal
  showAddCategoryModal() {
    this.isAddCategoryModalVisible = true;
  }

  // Méthode pour fermer le modal
  closeAddCategoryModal() {
    this.isAddCategoryModalVisible = false;
  }
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Add visual feedback for drag over
    // For example, add a CSS class to the drag-drop-area
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    // Remove visual feedback for drag leave
    // For example, remove the CSS class from the drag-drop-area
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.file = files[0];
      this.handleFileSelection();
    }
    // Remove visual feedback for drop
    // For example, remove the CSS class from the drag-drop-area
  }
  isDragOver: boolean = false; // Add this line
  
  // Existing file input handler
  onFileSelected2(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.file = inputElement.files[0];
      this.handleFileSelection();
    }
  }

  // Handle file selection logic
  handleFileSelection(): void {
    // Your existing logic for handling file selection
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePreview = e.target?.result as string;
    };
    reader.readAsDataURL(this.file!);
  }
  removeImage() {
    // Remove the selected image
    this.file = null;
    this.imagePreview = undefined;
    // Reset the file input to allow selecting the same file again
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  openFileInput() {
    // Trigger the file input click event
    const fileInput = document.getElementById('image') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }
}
