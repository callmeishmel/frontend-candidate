import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PersonApiService } from 'src/app/services/person-api.service';
import { termOrColorValidator } from 'src/app/validators/term-color.validator';
import { SearchStateService } from 'src/app/services/search-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  people: any[] = [];
  submitted: boolean = false;

  searchForm = this.fb.group({
    term: [''],
    color: ['']
  }, { validators: termOrColorValidator() });
  
  constructor(
    private fb: FormBuilder,
    private personApiService: PersonApiService,
    private searchStateService: SearchStateService,
  ) {}
  
  onSubmit() {
    this.submitted = true;
    this.people = [];

    if(this.searchForm.invalid) {
      return;
    }

    const formData = this.searchForm.value;

    this.personApiService.fetchAll({
      term: formData.term,
      color: formData.color
    }).subscribe(response => {
      this.people = response.matches || [];
    });
  }

  ngOnInit(): void {}

}
