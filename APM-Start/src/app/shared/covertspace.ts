import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'changespace',
})
export class ConvertSpace implements PipeTransform{
    transform(value:string, character:string){
        return value.replace(character," ")
    }
}