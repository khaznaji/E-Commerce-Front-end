import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { SubCategory } from 'src/app/models/subcategory';
import { ProductsService } from 'src/app/services/products.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-update-products',
  templateUrl: './update-products.component.html',
  styleUrls: ['./update-products.component.css']
})
export class UpdateProductsComponent implements OnInit {
  constructor(private route: ActivatedRoute,private subcat: SubcategoryService,private router:Router ,private productService: ProductsService) {}
  food!:Product;
  id!: number;
  project: Product = new Product();
  imagePreview: string | undefined;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.productService.getById(this.id).subscribe((food: Product) => {
        this.food = food;
  
        // Check if the existing title is different from the new value
          // Pre-fill the form field with the existing project data
          this.project.name = this.food.name;
          this.project.description = this.food.description;

  
        // Pre-fill the other form fields with the existing project data
        this.project.originalPrice = this.food.originalPrice;
        this.project.discountedPrice = this.food.discountedPrice;
        this.project.stock = this.food.stock;
        this.project.color = this.food.color;
        this.project.size = this.food.size;
        this.project.material = this.food.material;

        this.project.composition = this.food.composition;
        this.project.material = this.food.material;
        this.project.col = this.food.col;
        this.project.promo = this.food.promo;
        this.project.onSale = this.food.onSale;
        this.project.subCategoryId = this.food.subCategoryId;
        this.selectedCategory = this.food.subCategoryId.toString();

        this.thumbnails = this.food.imageUrls.map(url => `../../../assets/E-Commerce-Image/Products/${url}`);

  
        
 // Définir l'URL de l'image existante
 this.imagePreview = '../../../assets/E-Commerce-Image/Products/' + this.food.imageUrls[0];


  
       
      });
    });  
  this.get(); }
  thumbnails: string[] = []; // Tableau pour stocker les URL des miniatures générées

  onFileChange(event: any) {
    this.selectedFile = event.target.files;
  
    // Générer les miniatures des images sélectionnées
    this.thumbnails = [];
    for (const file of this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.thumbnails.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  categories: SubCategory[] = [];

    get(){   this.subcat.getAll().subscribe(
      (categories: SubCategory[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error(error);
      }
    );}
    selectedCategory!: string; // Assuming categoryId is of type string
    selectedFile: File[] = [];

    add() {
      console.log('Original Price (before toString):', this.project.originalPrice);
      
      // Créer un nouvel objet FormData
      const formData = new FormData();
      formData.append('id', this.food.id.toString()); // Add product ID to match the route parameter

      // Ajouter les champs requis au FormData
      formData.append('name', this.project.name);
      formData.append('originalPrice', this.project.originalPrice.toString());
      formData.append('discountedPrice', (this.project.discountedPrice !== undefined ? this.project.discountedPrice : 0).toString());
      formData.append('description', this.project.description);
      formData.append('stock', this.project.stock.toString());
      formData.append('color', this.project.color);
      for (const size of this.project.size) {
        formData.append('size', size);
      }  formData.append('material', this.project.material);
      formData.append('composition', this.project.composition);
      formData.append('col', this.project.col);
      formData.append('promo', this.project.promo.toString());
      formData.append('onSale', this.project.onSale.toString());
    
      // Ajouter la catégorie sélectionnée
      formData.append('subCategoryId', String(this.selectedCategory));
    
      // Ajouter les fichiers sélectionnés
      if (this.selectedFile) {
        console.log('Selected Files:', this.selectedFile); // Ajout de ce log supplémentaire
    
        for (const file of this.selectedFile) {
          formData.append('images', file, file.name);
          console.log(file.name);
        }
      } else {
        console.log('No files selected');
      }
    
      // Appeler le service pour ajouter le produit
      this.productService.updateProducts(this.food.id ,formData).subscribe(
        (response: any) => {
          console.log('Projet ajouté avec succès. ID:', response.id);
          this.project.id = response.id;
    
          // Mettre à jour les URL des images avec le bon projet ID
          this.project.imageUrls = this.selectedFile.map(file => {
            return `${response.imageFolderPath}\\${this.project.id}_${this.project.name}\\${file.name}`;
          });
    
          console.log('Project Image URLs:', this.project.imageUrls);
    
          // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
        },
        error => {
          console.error('Erreur lors de l\'ajout du projet', error);
          console.log('Project ID:', this.id);
          this.router.navigate(['admin/list-products']);

          if (error.error) {
            console.error('Error details:', error.error);
          }        }
      );
    }
}
