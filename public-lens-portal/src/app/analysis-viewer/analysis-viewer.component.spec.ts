import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisViewerComponent } from './analysis-viewer.component';

describe('AnalysisViewerComponent', () => {
  let component: AnalysisViewerComponent;
  let fixture: ComponentFixture<AnalysisViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnalysisViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnalysisViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
