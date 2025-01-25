import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonApiService } from 'src/app/services/PersonApiService';
import { PersonDetails } from 'src/app/types/personDetails.types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  personDetails: PersonDetails;
  quotes = [];
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private personApiService: PersonApiService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.fetchPersonDetails(id);
    }
  }

  fetchPersonDetails(id: string): void {
    this.personApiService.getPersonDetails(id).subscribe({
      next: (details) => {
        this.isLoading = false;
        this.personDetails = details;

        this.quotes = Object.entries(this.personDetails.quotes)
          .map(([key, value]) => ({
            likes: parseInt(key, 10),
            quotes: value.sort((a, b) => a.localeCompare(b)),
          }))
          .sort((a, b) => b.likes - a.likes);
      },
      error: (err) => {
        console.error('Error fetching details:', err);
        this.isLoading = false;
      }
    });
  }

}
