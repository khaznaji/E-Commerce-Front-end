import { Component, OnInit, ViewChild } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
  
})
export class AddCategoryComponent implements OnInit {
  
  ngOnInit() {
    this.reloadData();
    this.updatePagedCategories();

  }
  
  newCategoryName = '';
  id=0;
  categories:any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  constructor(private categoryService: CategoryService, private toastr: ToastrService) {}
  reloadData() {
    // Chargez toutes les catégories (à adapter selon vos besoins)
    this.categoryService.getAll().subscribe(
      (res: Category[]) => {
        this.categories = res;
        this.applyFilter(); // Appliquez le filtre initial
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  
  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedCategories();
  }

  updatePagedCategories(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCategories = this.categories.slice(startIndex, endIndex);
  }

  filterOption: 'all' | 'archive' | 'nonArchive' = 'all';

  // Utilisez cette propriété pour stocker les catégories filtrées
  filteredCategories: Category[] = [];
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
        console.error(' category or image.');
        this.toastr.error('Name and Image are required   ', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastre',
        });
        return;
      }
      if (this.categories.some((category: Category) => category.name === this.newCategory.name)) {
        this.toastr.error('Category with this name already exists', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastre',
        });
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
        console.error(' category or image.');
        this.toastr.error('Name and Image are required   ', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastre',
        });
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
  toggleArchive(categoryId: number): void {
    this.categoryService.toggleArchive(categoryId).subscribe(
      (response) => {
        console.log('Archivage basculé avec succès.', response);

        // Display a success toastr message
        
      },
      (error) => {
        console.error('Erreur lors du basculement de l\'archivage.', error);

        // Display an error toastr message
        this.toastr.success('Category and associated subcategories uptated successfully.', '', {
          positionClass: 'toast-top-center',
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastr',
        });
      }
    );
  } 
  applyFilter() {
    switch (this.filterOption) {
      case 'all':
        this.filteredCategories = this.categories;
        break;
      case 'archive':
        this.filteredCategories = this.categories.filter((category: Category) => category.archive);
        break;
      case 'nonArchive':
        this.filteredCategories = this.categories.filter((category: Category) => !category.archive);
        break;
      default:
        this.filteredCategories = this.categories;
        break;
    }
  }
  
  subcategoryIdsToDelete: number[] = [];

  // ... (existing code)

  toggleDelete(subcategoryId: number | undefined) {
    if (subcategoryId === undefined) {
      console.error('Invalid Categories  id.');
      return;
    }
  
    const index = this.subcategoryIdsToDelete.indexOf(subcategoryId);
  
    if (index !== -1) {
      // Subcategory is already selected, so remove it
      this.subcategoryIdsToDelete.splice(index, 1);
    } else {
      // Subcategory is not selected, so add it
      this.subcategoryIdsToDelete.push(subcategoryId);
    }
  }
  deleteSelectedSubcategories() {

    if (this.subcategoryIdsToDelete.length === 0) {
      console.error('No Categories selected for deletion.');
      this.toastr.error('No Categories selected for deletion', '', {
        positionClass: 'toast-top-center', // Positionnez-le en haut au centre
        timeOut: 5000,
        progressBar: true,
        toastClass: 'ngx-toastre', // Appliquez les styles personnalisés
        // Ajoutez d'autres options de personnalisation de style ici
      });
      return;
    }
    const warningMessage = 'Warning: Deleting selected categories will also delete associated subcategories. Are you sure you want to proceed?';
    const userConfirmed = confirm(warningMessage);
    this.categoryService.deleteMultipleSubcategories(this.subcategoryIdsToDelete).subscribe(
      () => {
        console.log('Categories deleted successfully.');
        this.toastr.success('Categories deleted successfully', '', {
          positionClass: 'toast-top-center', // Positionnez-le en haut au centre
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
          // Ajoutez d'autres options de personnalisation de style ici
        });
        window.location.reload();

        // Refresh the subcategories list or update the UI as needed
      },
      error => {
        console.error('Error deleting subcategories:', error);
      }
    );
  }
 
  deleteAllSubcategories() {
    const warningMessage = 'Warning: Deleting all categories will also delete associated subcategories. Are you sure you want to proceed?';
    const userConfirmed = confirm(warningMessage);
    if (userConfirmed) {
      this.categoryService.deleteAllSubcategories().subscribe(
        () => {
          console.log('All Categories deleted successfully.');
          this.toastr.success('All Categories deleted successfully', '', {
            positionClass: 'toast-top-center', // Positionnez-le en haut au centre
            timeOut: 5000,
            progressBar: true,
            toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
            // Ajoutez d'autres options de personnalisation de style ici
          });      
          window.location.reload();
        },
        error => {
          console.error('Error deleting all Categories:', error);
        }
      );
    } else {
      console.log('Deletion cancelled by the user.');
    }
  }
  }

