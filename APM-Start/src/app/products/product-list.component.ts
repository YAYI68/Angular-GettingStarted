import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "./product.services";
import { IProduct } from "./products";

@Component({
    selector:'product-list',
    templateUrl:'./product-list.component.html',
    styleUrls:["./product-list.component.css"]
})

export class ProductListComponent implements OnInit {
    pageTitle = 'Product List';
    imageMargin = 2;
    imageWidth = 50 ;
    showImage = true;
    sub!:Subscription;
    
    
    private _listFilter:string = "" ;
  errorMessage: any;
    get listFilter():string {
        return this._listFilter;
    }
    set listFilter(value:string){
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value)
    }
     filteredProducts:IProduct[] = [];
     products:IProduct[] = [];
     constructor(private productService:ProductService){}
      toggleImage(): void {
          this.showImage = !this.showImage;
      }

      performFilter(filterBy:string):IProduct[] {
          filterBy = filterBy.toLowerCase()
          return this.products.filter((product:IProduct) => {
             return product.productName.toLowerCase().includes(filterBy)
          })
      }
      ngOnInit(){
          this.listFilter = ''
          this.sub = this.productService.getProducts().subscribe({
            next:products => {
              this.products = products
              this.filteredProducts = this.products
            },
            error:err => this.errorMessage =err
          })
          this.filteredProducts = this.products
      }
      OnRatingClicked(message:string):void {
        this.pageTitle = "Product List " + message;
      }
      ngOnDestroy(){
        this.sub.unsubscribe()
      }
}