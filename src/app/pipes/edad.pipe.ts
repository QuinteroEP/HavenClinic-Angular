import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'edad'
})
export class EdadPipe implements PipeTransform {

  transform(value: number): unknown {
    var concat = value.toString();
    concat = concat + " años";
    return concat;
  }

}
