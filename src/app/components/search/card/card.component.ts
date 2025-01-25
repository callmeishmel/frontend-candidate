import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-result-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
    @Input() person: {id: string; name: string};

    constructor(private router: Router) {}

    /**
     * Navigate to the details page for the given person.
     */
    navigateToDetails(): void {
        this.router.navigate(['/details', this.person.id]);
    }

    ngOnInit(): void {}
}