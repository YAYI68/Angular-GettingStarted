import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ProductService } from "./product.services";
import { IProduct } from "./products";


@Component({
    selector:"product-detail",
    templateUrl:"./product-detail.component.html",
    styleUrls:["./product-detail.component.css"]
})

export class ProductDetailComponent implements OnInit {
    pageTitle: string = 'Product Details';
    errorMessage: string = "";
    sub!: Subscription;

    constructor (private route: ActivatedRoute,
                 private router: Router,
                 private productService: ProductService){}

    product:IProduct | undefined;

    ngOnInit():void{
        const id = Number( this.route.snapshot.paramMap.get('id'))
        this.pageTitle=`Product Details: `;
        if(id){
            this.getProduct(id)
        }
        
    }
    getProduct(id:number):void{
       this.sub = this.productService.getProduct(id).subscribe({
            next: product => this.product = product,
            error : err => this.errorMessage = err
        })
    }
    onBack():void{
        this.router.navigate(['/products'])
    }
    ngOnDestroy(){
        this.sub.unsubscribe();
    }
}