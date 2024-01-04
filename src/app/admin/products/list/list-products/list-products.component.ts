import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit{
  ngOnInit() {
    this.reloadData();
  }
  constructor(private router: Router,private categoryService: ProductsService, private toastr: ToastrService) {}
  categories:any;

  reloadData() {
    // Chargez toutes les catégories (à adapter selon vos besoins)
    this.categoryService.getAll().subscribe(
      (res: Product[]) => {
        this.categories = res;
        this.applyFilter(); // Appliquez le filtre initial
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  filteredCategories: Product[] = [];
  filterOption: 'all' | 'onSale' | 'NotOnSale' = 'all';

  applyFilter() {
    switch (this.filterOption) {
      case 'all':
        this.filteredCategories = this.categories;
        break;
      case 'onSale':
        this.filteredCategories = this.categories.filter((category: Product) => category.onSale);
        break;
      case 'NotOnSale':
        this.filteredCategories = this.categories.filter((category: Product) => !category.onSale);
        break;
      default:
        this.filteredCategories = this.categories;
        break;
    }
  }
  details(id: number){
    this.router.navigate(['admin/detail-product', id]);
  }
  deleteEvents = (id: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteEvent(id).subscribe(() => {
        // Recharge la page après la suppression
        window.location.reload();
      });
    }
  }
  
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
  subcategoryIdsToDelete: number[] = [];

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

    const warningMessage = ' Are you sure you want to proceed?';
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
        window.location.reload();

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
          window.location.reload();

        }
      );
    } else {
      console.log('Deletion cancelled by the user.');
      window.location.reload();

    }
  }
  updateEvent(id: number){
    this.router.navigate(['admin/update-product', id]);
  }  
}
