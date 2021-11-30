import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { ManageCategoriesComponent } from './components/category/manage-categories/manage-categories.component';
import { UpdateCategoryComponent } from './components/category/update-category/update-category.component';
import { ColorComponent } from './components/color/color.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ManageProductsComponent } from './components/product/manage-products/manage-products.component';
import { SellProductComponent } from './components/product/sell-product/sell-product.component';
import { UpdateProductComponent } from './components/product/update-product/update-product.component';
import { AddProviderComponent } from './components/provider/add-provider/add-provider.component';
import { ManageProvidersComponent } from './components/provider/manage-providers/manage-providers.component';
import { UpdateProviderComponent } from './components/provider/update-provider/update-provider.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Manage Products
  { path: 'manageProducts', component: ManageProductsComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProducts/addProduct', component: AddProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProducts/updateProduct/:id', component: UpdateProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProducts/sellProduct/:id', component: SellProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Manage Colors
  { path: 'manageColors', component: ColorComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageColors/addColor', component: AddProductComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },


  //  Manage Providers
  { path: 'manageProviders', component: ManageProvidersComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProviders/addProvider', component: AddProviderComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageProviders/updateProvider/:id', component: UpdateProviderComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  
  
  //  Manage Categories
  { path: 'manageCategories', component: ManageCategoriesComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageCategories/addCategory', component: AddCategoryComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  { path: 'manageCategories/updateCategory/:id', component: UpdateCategoryComponent, canActivate: [AuthGuardService], data: { expectedRole: ['Owner', 'Admin'] } },
  
  
  {path: '', redirectTo: 'home', pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
