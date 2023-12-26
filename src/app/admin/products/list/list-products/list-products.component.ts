import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(private router: Router,private categoryService: ProductsService) {}
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
}
