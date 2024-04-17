import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdduserComponent } from './add-user.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserService } from '../../services/user';

describe('AdduserComponent', () => {
  let component: AdduserComponent;
  let fixture: ComponentFixture<AdduserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdduserComponent],
      imports: [
        FormsModule, // Añade FormsModule aquí
        HttpClientTestingModule
      ],
      providers: [UserService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdduserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Puedes añadir más pruebas aquí...
});
