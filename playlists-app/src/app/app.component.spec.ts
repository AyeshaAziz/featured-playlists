import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MockModule } from 'ng-mocks';
import { By } from '@angular/platform-browser';

const EXPECTED_TITLE = 'Featured Playlists';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MockModule(RouterTestingModule), MockModule(MatToolbarModule)],
      declarations: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    // Arrange in before each

    // Act
    const app = fixture.componentInstance;

    // Assert
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Featured Playlists'`, () => {
    // Arrange in before each

    // Act
    const app = fixture.componentInstance;

    // Asert
    expect(app.title).toEqual(EXPECTED_TITLE);
  });

  it('should display the title in the toolbar', () => {
    // Arrange
    const matToolbarClass = 'mat-toolbar';

    // Act
    fixture.detectChanges();

    // Assert
    const toolbarElement = fixture.debugElement.query(By.css(matToolbarClass));
    expect(toolbarElement.nativeElement.textContent.trim()).toBe(
      EXPECTED_TITLE
    );
  });
});
