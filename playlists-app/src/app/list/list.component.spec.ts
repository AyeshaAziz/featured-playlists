import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { PlaylistContentModel } from '../playlist/models/playlist-content.model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { MockModule } from 'ng-mocks';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';

const EXTERNAL_LINK = 'mock-url';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [MockModule(MatGridListModule), 
        MockModule(MatDividerModule)],
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    //Arrange, Act & Assert
    expect(component).toBeTruthy();
  });

  it('should emit a click event when onItemClicked triggers', () => {
    // Arrange
    spyOn(component.itemClickedEvent, 'emit');

    // Act
    component.onItemClicked(EXTERNAL_LINK);

    // Assert
    expect(component.itemClickedEvent.emit).toHaveBeenCalledOnceWith(
      EXTERNAL_LINK
    );
  });

  it('should display list items correctly', () => {
    // Arrange
    const mockList = generateMockList();

    // Act
    component.list = of(mockList);
    fixture.detectChanges();

    // Assert
    const listItems = fixture.debugElement.queryAll(By.css('.tile'));
    const firstListItem = listItems[0].nativeElement;
    expect(listItems.length).toBe(2);
    expect(firstListItem.querySelector('h1').textContent).toContain('Item 1');
    expect(firstListItem.querySelector('span').textContent).toContain(
      'Curator 1'
    );
    expect(firstListItem.querySelector('.kind').textContent).toContain(
      'Type 1'
    );
  });

  const generateMockList = (): PlaylistContentModel[] => {
    const mockList: PlaylistContentModel[] = [];
    const item1 = {
      name: 'Item 1',
      curator_name: 'Curator 1',
      kind: 'Type 1',
      artwork: 'url1',
    } as PlaylistContentModel;
    const item2 = {
      name: 'Item 2',
      curator_name: 'Curator 2',
      kind: 'Type 2',
      artwork: 'url2',
    } as PlaylistContentModel;
    mockList.push(item1);
    mockList.push(item2);
    return mockList;
  };
});
