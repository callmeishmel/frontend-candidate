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

  query: string = '';
  people: any[] = [];
  submitted: boolean = false;
  feedbackMessage: string | null = null;

  searchForm = this.fb.group({
    term: [''],
    color: ['']
  }, { validators: termOrColorValidator() });
  
  constructor(
    private fb: FormBuilder,
    private personApiService: PersonApiService,
    private searchStateService: SearchStateService,
  ) {}

  ngOnInit(): void {
    this.people = this.searchStateService.searchResults;
    this.searchForm.patchValue({
      term: this.searchStateService.searchQuery || '',
      color: this.searchStateService.searchColor || '',
    });
  }
  
  onSubmit() {
    this.submitted = true;

    if(this.searchForm.invalid) {
      this.feedbackMessage = 'Please provide a valid search term or select a color.';
      return;
    }

    const formData = this.searchForm.value;

    this.personApiService.fetchAll({
      term: formData.term,
      color: formData.color
    }).subscribe({
      next: (response) => {

        this.people = response.matches || [];
        this.searchStateService.searchResults = this.people;
        this.searchStateService.searchQuery = formData.term || '';
        this.searchStateService.searchColor = formData.color || '';

        this.feedbackMessage = this.people.length === 0 ? 'No matches found.' : null;
      },
      error: (err) => {
        console.error('Error fetching search results:', err);
        this.feedbackMessage = 'Failed to fetch search results.';
      }
    });
  }
}
