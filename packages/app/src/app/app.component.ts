import {Component} from '@angular/core';
import {User} from '@issue1/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public users: User[] = [
    new User('peter'),
    new User('Filipe'),
  ];
}
