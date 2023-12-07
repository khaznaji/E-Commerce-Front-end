import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { SubCategory } from 'src/app/models/subcategory';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  constructor(private categoryService : CategoryService, private toastr: ToastrService,private subcategoryService: SubcategoryService){}
  categories: SubCategory[] = [];
  categoriess: Category[] = [];
  adminProjects: any;
  category?: Category; // This should match the name of the property you are trying to access
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  ngOnInit(): void {
    this.getCategories();
    this.getSubcategories();
    this.updatePagedCategories();

  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.updatePagedCategories();
  }

  updatePagedCategories(): void {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.categories = this.categories.slice(startIndex, endIndex);
  }

  getSubcategories() {
    this.subcategoryService.getAll().subscribe(
      (subcategories: SubCategory[]) => {
        console.log(subcategories); // Add this to see what you're getting
        this.categories = subcategories;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  getCategories() {
    this.categoryService.getAll().subscribe(
      (categories: Category[]) => {
        this.categoriess = categories;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  projectData: FormData = new FormData();
  project: SubCategory = new SubCategory();
  selectedCategory!: string; // Assuming categoryId is of type string
  selected!: SubCategory; // New property to store the selected category for update
  id!: number;

  addProject() {
    if (!this.selected) { 
      console.error(' category or image.');
      this.toastr.error('The entire form must be filled. ', '', {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        progressBar: true,
        toastClass: 'ngx-toastre',
      });
    // Ajoutez les champs du projet à la FormData
    this.projectData.append('name', this.project.name);
    this.projectData.append('description', this.project.description);
    this.projectData.append('CategoryId', this.selectedCategory);

    console.log(this.selectedCategory );

    // Appelez le service pour ajouter le projet
    this.subcategoryService.add(this.projectData).subscribe(
      response => {
        // Réponse réussie, effectuez les actions nécessaires
        console.log('Projet ajouté avec succès', response);
        this.project = new SubCategory();
        this.toastr.success('Subcategory created successfully', '', {
          positionClass: 'toast-top-center', // Positionnez-le en haut au centre
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
          // Ajoutez d'autres options de personnalisation de style ici
        });
        this.getSubcategories();
        window.location.reload();

      },
      error => {
        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout du projet', error);
      }
    );
  }else {
    this.projectData.append('id', this.selected.id!.toString()); // Assuming id is of type number

   // this.projectData.append('id',  this.project.id.toString()); 
    this.projectData.append('name', this.project.name);
    this.projectData.append('description', this.project.description);
    this.projectData.append('CategoryId', this.selectedCategory);
    this.subcategoryService.updateProject(this.selected.id!,this.projectData).subscribe(
      response => {
        // Réponse réussie, effectuez les actions nécessaires
        console.log('Projet ajouté avec succès', response);
        this.project = new SubCategory();
        this.toastr.success('Subcategory updated successfully', '', {
          positionClass: 'toast-top-center', // Positionnez-le en haut au centre
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
          // Ajoutez d'autres options de personnalisation de style ici
        });
        this.getSubcategories();
        window.location.reload();

      },
      error => {
        console.log(this.selectedCategory);
        console.log(this.selected.id!);

        // Gérez les erreurs
        console.error('Erreur lors de l\'ajout du projet', error);

      }
    );
  }}
  isAddCategoryModalVisible: boolean = false;
  showAddCategoryModal() {
    this.isAddCategoryModalVisible = true;
  }

  // Méthode pour fermer le modal
  closeAddCategoryModal() {
    this.isAddCategoryModalVisible = false;
  }
  cancelUpdate() {
    this.clearForm();
  }
  newCategoryName = '';

  clearForm() {
    // Clear the selected category and form
    this.selectedCategory ;
    this.newCategoryName = '';
  }
  filteredCategories: SubCategory[] = [];

  
  newCategory: SubCategory = new SubCategory();

  editCategory(category: SubCategory) {
    // Set the selected category for update
    this.project = { ...category };
    this.newCategory.name = category.name;
    this.selectedCategory = category.categoryId.toString(); // Assuming categoryId is of type string
  }
  
  getCategoryName(categoryId: number): string {
    const category = this.getCategoryById(categoryId);
    return category ? category.name : 'Category Not Found';
  }
  
  getCategoryById(categoryId: number): Category | undefined {
    return this.categoriess.find(category => category.id === categoryId);
  }
  deleteEvents = (id: number | undefined) => {
    if (id !== undefined && confirm('Are you sure you want to delete this category?')) {
      this.subcategoryService.deleteEvent(id).subscribe(() => {
        // Reload the page after deletion
        window.location.reload();
      });
    }
  };
  toggleArchive(categoryId: number): void {
    this.subcategoryService.toggleArchive(categoryId).subscribe(
      (response) => {
        console.log('Archivage basculé avec succès.', response);
        // Mettez à jour votre vue si nécessaire
      },
      (error) => {
        console.error('Erreur lors du basculement de l\'archivage.', error);
        // Gérez l'erreur selon vos besoins
      }
    );
  }
    filterOption: 'all' | 'archive' | 'nonArchive' = 'all';
     archivedSubCategories = this.categories.filter(category => category.archive);

    // To get non-archived items
     nonArchivedSubCategories = this.categories.filter(category => !category.archive);
    
     applyFilter() {
      switch (this.filterOption) {
        case 'all':
          this.filteredCategories = this.categories;
          break;
        case 'archive':
          this.filteredCategories = this.categories.filter(category => category.archive);
          break;
        case 'nonArchive':
          this.filteredCategories = this.categories.filter(category => !category.archive);
          break;
        default:
          this.filteredCategories = this.categories;
          break;
      }
    }

 /*   toggleDelete(subcategoryId: number) {
      if (this.subcategoryIdsToDelete.includes(subcategoryId)) {
        this.subcategoryIdsToDelete = this.subcategoryIdsToDelete.filter(id => id !== subcategoryId);
      } else {
        this.subcategoryIdsToDelete.push(subcategoryId);
      }
    }*/
    subcategoryIdsToDelete: number[] = [];

    // ... (existing code)
  
    toggleDelete(subcategoryId: number | undefined) {
      if (subcategoryId === undefined) {
        console.error('Invalid subcategory id.');
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
        console.error('No subcategories selected for deletion.');
        this.toastr.error('No subcategories selected for deletion', '', {
          positionClass: 'toast-top-center', // Positionnez-le en haut au centre
          timeOut: 5000,
          progressBar: true,
          toastClass: 'ngx-toastre', // Appliquez les styles personnalisés
          // Ajoutez d'autres options de personnalisation de style ici
        });
        return;
      }
      const userConfirmed = confirm('Are you sure you want to delete Selected Subcategories?');

      this.subcategoryService.deleteMultipleSubcategories(this.subcategoryIdsToDelete).subscribe(
        () => {
          console.log('Subcategories deleted successfully.');
          this.toastr.success('Subcategories deleted successfully', '', {
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
      const userConfirmed = confirm('Are you sure you want to delete all subcategories?');
  
      if (userConfirmed) {
        this.subcategoryService.deleteAllSubcategories().subscribe(
          () => {
            console.log('All subcategories deleted successfully.');
          
          },
          error => {
            console.error('Error deleting all subcategories:', error);
            this.toastr.success('All subcategories deleted successfully', '', {
              positionClass: 'toast-top-center', // Positionnez-le en haut au centre
              timeOut: 7000,
              progressBar: true,
              toastClass: 'ngx-toastr', // Appliquez les styles personnalisés
              // Ajoutez d'autres options de personnalisation de style ici
            });      
            window.location.reload();
          }
        );
      } else {
        console.log('Deletion cancelled by the user.');
      }
    }
    }
