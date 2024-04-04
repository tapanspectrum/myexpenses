import { Component } from '@angular/core';
import { CommanService } from 'src/app/shared/services';

@Component({
  selector: 'tp-demo',
  standalone: true,
  imports: [],
  templateUrl: './demo.component.html',
  styleUrl: './demo.component.scss'
})
export class DemoComponent {
  constructor(
    private commanservice: CommanService
  ) { }

  ngOnInit(): void {
    setTimeout(() =>{
      console.log('inside');
      this.commanservice.closemodel();
    }, 5000);
  }
}
