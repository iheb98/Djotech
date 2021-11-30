import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faFilter, faPlus, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { ColorService } from 'src/app/services/color.service';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import { GlobalVariable } from 'src/app/shared/global';
import { ViewImagesComponent } from '../../modals/view-images/view-images.component';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  IMAGE_BASE_PATH = GlobalVariable.IMAGE_BASE_PATH;
  faSearch = faSearch;
  faFilter = faFilter;
  faPlus = faPlus;
  faTimes = faTimes;



  products;
  filtredProducts;

  color;
  category;
  brand;
  state;
  provider;
  searchable;
  maxPrice;
  minPrice
  maxQuantity;
  minQuantity;

  showFilters = false;


  colors;
  categories;
  brands;
  states;
  providers;

  constructor(private router: Router,
    private productService: ProductService,
    private categoryService: CategoryService,
    private colorService: ColorService,
    private providerService: ProviderService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getDetails();

    this.states = ["Neuf", "Occasion"]
  }

  navigate(destination) {
    this.router.navigate(['/' + destination]);
  }

  getProducts() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data;

      this.products.forEach(element => {
        element.category = this.toCategory(element.category);
        element.color = this.toColor(element.color);
        element.provider = this.toProvider(element.provider);
      });
      this.filtredProducts = this.products;
    })
  }
  getDetails() {
    this.getCategories();

  }
  getProviders() {
    this.providerService.getProviders().subscribe(data => {
      this.providers = data;
      this.getProducts();
    })
  }

  getColors() {
    this.colorService.getColors().subscribe(data => {
      this.colors = data;
      this.getProviders();

    })
  }
  getCategories() {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
      this.getColors();

    })
  }
  search() {
    this.filtredProducts = this.products;
    if (this.searchable != undefined && this.searchable != null)
      this.filtredProducts = this.filtredProducts.filter(item => ((item.name?.toUpperCase()?.indexOf(this.searchable?.toUpperCase()) != -1) ||
        (item.description?.toUpperCase()?.indexOf(this.searchable?.toUpperCase()) != -1)));

  }

  toCategory(id) {
    let result = "NA";
    this.categories.forEach(element => {
      if (element._id == id) {
        result = element.name
      }
    });
    return result;
  }

  toProvider(id) {
    let result = "NA";
    this.providers.forEach(element => {
      if (element._id == id) {
        result = element.name
      }
    });
    return result;
  }

  toColor(id) {
    let result = "NA";
    this.colors.forEach(element => {
      if (element._id == id) {
        result = element.name
      }
    });
    return result;
  }

  searchWithFilters() {
    this.filtredProducts = this.products;
    if (this.color != undefined && this.color != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.color == this.color._id);

    if (this.category != undefined && this.category != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.category == this.category._id);

    if (this.brand != undefined && this.brand != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.brand == this.brand);

    if (this.state != undefined && this.state != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.state == this.state);

    if (this.provider != undefined && this.provider != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.provider == this.provider._id);


    if (this.minPrice != undefined && this.minPrice != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.price >= this.minPrice);

    if (this.maxPrice != undefined && this.maxPrice != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.price <= this.maxPrice);


    if (this.minQuantity != undefined && this.minQuantity != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.quantity >= this.minQuantity);

    if (this.maxQuantity != undefined && this.maxQuantity != null)
      this.filtredProducts = this.filtredProducts.filter(item => item.quantity <= this.maxQuantity);

  }
  reset() {
    this.color = null;
    this.brand = null;
    this.provider = null;
    this.category = null;
    this.state = null;
    this.minPrice = null;
    this.maxPrice = null;
    this.minQuantity = null;
    this.maxQuantity = null;

    this.filtredProducts = this.products;
  }

  openModal(images, name) {
    const modalRef = this.modalService.open(ViewImagesComponent);
    modalRef.componentInstance.images = images;
    modalRef.componentInstance.name = name;
  }

  deleteProduct(product) {
    this.productService.deleteProduct(product._id).subscribe(data => {
      this.products = this.products.filter(item => item._id != product._id);
      this.filtredProducts = this.filtredProducts.filter(item => item._id != product._id);
    })
  }

}
