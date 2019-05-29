import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



@Component({
  selector: 'app-search-emp',
  templateUrl: './search-emp.component.html',
  styleUrls: ['./search-emp.component.css']
})
export class SearchEmpComponent implements OnInit {

  @Input('searchText') searchText: string;

  //@Output('searchText') searchTe:string;
  @Output() keyUpSearch = new EventEmitter();
  constructor() { }

  ngOnInit() {
    
  }

  keyPressChange(){

    this.keyUpSearch.emit(this.searchText);
    
  }

  key(){
    console.log(this.searchText);
    //console.log(this.searchTe);
  }

}
