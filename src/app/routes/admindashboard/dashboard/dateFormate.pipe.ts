import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'niceDateFormat'
})
export class NiceDateFormatPipe implements PipeTransform {
  transform(value: any) {

    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

       if (new Date(value).getFullYear() == today.getFullYear() && new Date(value).getMonth() == today.getMonth() && new Date(value).getDate() == today.getDate())
       return "Today";
     else if (new Date(value).getFullYear() == yesterday.getFullYear() && new Date(value).getMonth() == yesterday.getMonth() && new Date(value).getDate() == yesterday.getDate())
       return "Yesterday";
    else{
      return (new DatePipe("en-US")).transform(new Date(value), 'dd/MM/yyyy');
    }
 }
}