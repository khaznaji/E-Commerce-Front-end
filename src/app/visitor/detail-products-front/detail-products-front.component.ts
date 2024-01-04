import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { SubCategory } from 'src/app/models/subcategory';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-detail-products-front',
  templateUrl: './detail-products-front.component.html',
  styleUrls: ['./detail-products-front.component.css']
})
export class DetailProductsFrontComponent implements OnInit {
  constructor(private sp:ProductsService , private route: ActivatedRoute){}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.get(productId);
  }
  product: Product = new Product();

  get(productId: number): void {
    this.sp.getById(productId).subscribe(
      (product: Product) => {
        this.product = product;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
 
  categoriess: SubCategory[] = [];

  getCategoryName(subcategoryId: number): string {
    const subcategory = this.getCategoryById(subcategoryId);
    return subcategory ? subcategory.name : 'subcategory Not Found';

  }
  getCategoryById(subcategoryId: number): SubCategory | undefined {
    return this.categoriess.find(subcategory => subcategory.id === subcategoryId);
  }
  

  selectedColor: string = ''; // Pour stocker la couleur sélectionnée

  selectColor(color: string): void {
    this.selectedColor = color;
    // Vous pouvez ajouter ici la logique supplémentaire en fonction de la couleur sélectionnée
  }
  
}
