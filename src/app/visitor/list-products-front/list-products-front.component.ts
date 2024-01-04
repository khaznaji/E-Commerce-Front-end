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
  openQuickView(productId: number) {
    // Appel du service pour obtenir les détails du produit par ID
    this.categoryService.getById(productId).subscribe((product) => {
      // Stockage des détails du produit pour la vue rapide
      this.quickViewProduct = product;
    });
  }
  quickViewProduct: Product = new Product();
  selectedColor: string = ''; // Pour stocker la couleur sélectionnée

  selectColor(color: string): void {
    this.selectedColor = color;
    // Vous pouvez ajouter ici la logique supplémentaire en fonction de la couleur sélectionnée
  }
  currentIndex = 0;

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.quickViewProduct.imageUrls.length;
  }

  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.quickViewProduct.imageUrls.length) % this.quickViewProduct.imageUrls.length;
  } 
  redirectToProductDetails(productId: number) {
    this.router.navigate(['/detail-product', productId]);
  }
  
}
