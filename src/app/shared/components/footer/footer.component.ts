import { Component } from '@angular/core';

@Component({
  selector: 'shared-footer',
  templateUrl: './footer.component.html',
  styles: ``
})
export class FooterComponent {
  date: number = new Date().getFullYear();
  name: string = `Copyright ©  Hiram Chavez. ${this.date}`;
  github: URL = new URL('https://github.com/JustLearningMX');
  linkedin: URL = new URL('https://www.linkedin.com/in/hiram-chavez-24126831/');
  twitter: URL = new URL('https://twitter.com/hiram_ch');
  portfolio: URL = new URL('https://hiramchavez.me/');
  email: string = 'hiramchavezlopez@gmail.com';

}
