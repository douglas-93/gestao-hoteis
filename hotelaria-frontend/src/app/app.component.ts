import {Component, HostBinding} from '@angular/core';
import {AppInfoService, AuthService, ScreenService} from './shared/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    constructor(private authService: AuthService, private screen: ScreenService, public appInfo: AppInfoService) {
    }

    @HostBinding('class') get getClass() {
        return Object.keys(this.screen.sizes).filter(cl => this.screen.sizes[cl]).join(' ');
    }

    isAuthenticated() {
        return this.authService.loggedIn;
    }
}
