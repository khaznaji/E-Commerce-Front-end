import { HttpHeaders } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Product } from 'src/app/models/product';
import { SubCategory } from 'src/app/models/subcategory';
import { ProductsService } from 'src/app/services/products.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private projectService: ProductsService , private subcat: SubcategoryService )
 { this.productForm = this.fb.group({
    name: ['', Validators.required],
    originalPrice: ['', Validators.required],
    discountedPrice: ['', Validators.required],
    description: ['', Validators.required],
    stock: ['', Validators.required],
    color: ['',Validators.required],
    size: ['',Validators.required],
    material: ['',Validators.required],
    composition: ['',Validators.required],
    col: ['',Validators.required],
    promo: ['',Validators.required],
    subCategoryId: ['', Validators.required],
    images: [null],


  });
}

foodForm!: FormGroup;
private unsubscribe$ = new Subject<void>();

ngOnInit(): void {
  this.get();
   }
   ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  projectData: FormData = new FormData();
  project: Product = new Product();
  selectedCategory!: string; // Assuming categoryId is of type string
  files: File[] = [];
  categories: SubCategory[] = [];
 
  get(){   this.subcat.getAll().subscribe(
    (categories: SubCategory[]) => {
      this.categories = categories;
    },
    (error: any) => {
      console.error(error);
    }
  );}
  selectedFile: File[] = [];

  selectedImages: File[] = [];
// In your component class
availableSizes: string[] = ['S', 'XS', 'M', 'L', 'XL'];
selectedSizes: { [key: string]: boolean } = {};

size!: NgModel; // or whatever type 'size' should be

add() {
  console.log('Original Price (before toString):', this.project.originalPrice);
  
  // Créer un nouvel objet FormData
  const formData = new FormData();

  // Ajouter les champs requis au FormData
  formData.append('name', this.project.name);
  formData.append('originalPrice', this.project.originalPrice.toString());
  formData.append('discountedPrice', (this.project.discountedPrice !== undefined ? this.project.discountedPrice : 0).toString());
  formData.append('description', this.project.description);
  formData.append('stock', this.project.stock.toString());
  for (const color of this.project.color) {
    formData.append('color', color);
  } 
  for (const size of this.project.size) {
    formData.append('size', size);
  }  formData.append('material', this.project.material);
  formData.append('composition', this.project.composition);
  formData.append('col', this.project.col);
  formData.append('promo', this.project.promo.toString());
 // formData.append('onSale', this.project.onSale.toString());

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
  this.projectService.addProduct(formData).subscribe(
    (response: any) => {
      console.log('Projet ajouté avec succès. ID:', response.id);
      this.project.id = response.id;

      // Mettre à jour les URL des images avec le bon projet ID
      this.project.imageUrls = this.selectedFile.map(file => {
        return `${response.imageFolderPath}\\${this.project.id}_${this.project.name}\\${file.name}`;
      });

      console.log('Project Image URLs:', this.project.imageUrls);

      // Réinitialiser le formulaire ou effectuer d'autres actions si nécessaire
      this.foodForm.reset();
    },
    error => {
      console.error('Erreur lors de l\'ajout du projet', error);
      // Gérer l'erreur selon les besoins
    }
  );
}


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
 
  
  i!: number ;

 
selectedVideoUrl: string = '';
selectedThumbnail: string = '';
images: FileList | null = null;

onFileChanges(event: any) {
  this.images = event.target.files;
}





}
