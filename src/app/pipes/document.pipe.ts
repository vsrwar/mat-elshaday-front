import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'document'})
export class DocumentPipe implements PipeTransform {
  transform(value: string, type: string): string {
    switch(type) {
        case 'cpf':
            return value.length === 11 ? value.substring(0, 3) + '.' + value.substring(3, 6) + '.' + value.substring(6, 9) + '-' + value.substring(9) : value;
        case 'cnpj':
            return value.length === 14 ? value.substring(0, 2) + '.' + value.substring(2, 5) + '.' + value.substring(5, 8) + '/' + value.substring(8, 12) + '-' + value.substring(12) : value;
        default:
            return value;
    }
  }
}