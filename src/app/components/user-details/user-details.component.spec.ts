import { ComponentFixture, TestBed } from '@angular/core/testing';

import { userDetailsComponent } from './user-details.component';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { UserService } from '../../services/user';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
describe('userDetailsComponent', () => {
  let component: userDetailsComponent;
  let fixture: ComponentFixture<userDetailsComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let routerSpy: jasmine.SpyObj<Router>;
  
  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['get', 'update', 'delete']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  
    
    // Configura un valor de retorno para el espía del método 'get'
    userServiceSpy.get.and.returnValue(of({ 
      id: '123', 
      username: 'Test User', 
      email: 'test@example.com', 
      status: true 
    }));
  
    await TestBed.configureTestingModule({
      declarations: [userDetailsComponent],
      imports: [HttpClientTestingModule, FormsModule,RouterTestingModule],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '123' } }
          }
        }
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(userDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
