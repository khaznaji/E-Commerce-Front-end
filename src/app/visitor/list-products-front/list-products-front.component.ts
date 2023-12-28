import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-list-products-front',
  templateUrl: './list-products-front.component.html',
  styleUrls: ['./list-products-front.component.css']
})
export class ListProductsFrontComponent implements OnInit{
  ngOnInit() {
    this.reloadData();
  }
  constructor(private router: Router,private categoryService: ProductsService) {}
  categories:any;
  filteredCategories: Product[] = [];

  reloadData() {
    // Chargez toutes les catégories (à adapter selon vos besoins)
    this.categoryService.getAll().subscribe(
      (res: Product[]) => {
        this.categories = res;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
