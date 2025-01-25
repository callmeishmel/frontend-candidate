import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PersonApiService } from 'src/app/services/person-api.service';
import { PersonDetails } from 'src/app/types/person-details.types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  personDetails: PersonDetails;
  quotes = [];
  errorMessage: string | null = null;

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

  /**
   * Fetches person details by ID and processes quotes into a sorted array.
   * @param id - The ID of the person to fetch details for
   */
  fetchPersonDetails(id: string): void {
    this.personApiService.getPersonDetails(id).subscribe({
      next: (details) => {
        this.personDetails = details;

        this.quotes = this.sortQuotes(this.personDetails.quotes);
      },
      error: (err) => {
        console.error('Error fetching details:', err);
        this.errorMessage = 'Failed to load details.';
      }
    });
  }

  /**
   * Processes and sorts quotes into an array grouped by the number of likes.
   * - Groups quotes by likes (key).
   * - Sorts quotes alphabetically within each group.
   * - Orders the groups in descending order of likes.
   *
   * @param quotes - An object where the keys represent likes and the values are arrays of quotes.
   * @returns An array of objects, each containing the number of likes and the sorted quotes.
   */
  sortQuotes(quotes: Record<string, string[]>): any[] {
    return Object.entries(quotes)
        .map(([key, value]) => ({
            likes: parseInt(key, 10),
            quotes: value.sort((a, b) => a.localeCompare(b)),
        }))
        .sort((a, b) => b.likes - a.likes);
  }

}
