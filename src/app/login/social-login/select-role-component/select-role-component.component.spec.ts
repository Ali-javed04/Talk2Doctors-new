import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectRoleComponentComponent } from './select-role-component.component';

describe('SelectRoleComponentComponent', () => {
  let component: SelectRoleComponentComponent;
  let fixture: ComponentFixture<SelectRoleComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectRoleComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectRoleComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
