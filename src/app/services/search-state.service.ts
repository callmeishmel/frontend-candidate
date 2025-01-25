import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class SearchStateService {
    searchResults: any[] = [];
    searchQuery: string = '';
    searchColor: string = '';
}