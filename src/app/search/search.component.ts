import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchForm = this.fb.group({
    name: ['', Validators.required],
    color: ['']
  });
  
  constructor(private fb: FormBuilder) {}
  
  onSubmit() {
    console.log(this.searchForm.value);
  }

  ngOnInit(): void {
  }

}
