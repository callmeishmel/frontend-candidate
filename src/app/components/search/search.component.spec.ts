import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { FormBuilder } from '@angular/forms';
import { PersonApiService } from '../../services/person-api.service';
import { SearchStateService } from '../../services/search-state.service';
import { ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockPersonApiService: jasmine.SpyObj<PersonApiService>;
  let mockSearchStateService: jasmine.SpyObj<SearchStateService>;

  beforeEach(async () => {
    mockPersonApiService = jasmine.createSpyObj('PersonApiService', ['fetchAll']);
    mockSearchStateService = jasmine.createSpyObj(
      'SearchStateService',
      [
        'searchResults',
        'searchQueary',
        'searchColor'
      ]);

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: PersonApiService, useValue: mockPersonApiService },
        { provide: SearchStateService, useValue: mockSearchStateService }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  /*
   * State test: Get
   */
  it('should populate people from SearchStateService if results exist', () => {
    const mockPeople = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    mockSearchStateService.searchResults = mockPeople;

    component.ngOnInit();

    expect(component.people).toEqual(mockPeople);
  });

  /*
   * State test: Patch
   */
  it('should patch form values from SearchStateService', () => {
    const mockQuery = 'John Doe';
    const mockColor = 'blue';
    mockSearchStateService.searchQuery = mockQuery;
    mockSearchStateService.searchColor = mockColor;

    component.ngOnInit();

    expect(component.searchForm.value).toEqual({ term: mockQuery, color: mockColor });;
  });

  /*
   * Form validation test
   */
  it('should fail validation when no search term or color are submitted', () => {
    const mockResponse = 'Please provide a valid search term or select a color.';
    component.searchForm.setValue({ term: '', color: '' });

    component.onSubmit();

    expect(component.feedbackMessage).toBe(mockResponse);
    expect(mockPersonApiService.fetchAll).not.toHaveBeenCalledWith();
  });

  /*
   * Basic integrations test
   * API -> Save Result -> No call failure
   * 1. Calls fetchAll() with correct params.
   * 2. Checks results stored in 'people'.
   * 3. Successful call returns no message.
   */
  it('should call personApiService.fetchAll and update on form submission', () => {
    const mockResults = [{ name: 'John Doe' }, { name: 'Jane Doe' }];
    mockPersonApiService.fetchAll.and.returnValue(of({ matches: mockResults }));

    component.searchForm.setValue({ term: 'Angular', color: '' });

    component.onSubmit();

    expect(mockPersonApiService.fetchAll).toHaveBeenCalledWith({ term: 'Angular', color: '' });
    expect(component.people).toEqual(mockResults);
    expect(component.feedbackMessage).toBeNull();
  });

  /*
   * Error handling
   */
  it('should set feedbackMessage when API call fails', () => {
    mockPersonApiService.fetchAll.and.returnValue(throwError(() => new Error('Something went wrong.')));

    component.searchForm.setValue({ term: 'Angular', color: '' });

    component.onSubmit();

    expect(component.feedbackMessage).toBe('Failed to fetch search results.');
  });
});
