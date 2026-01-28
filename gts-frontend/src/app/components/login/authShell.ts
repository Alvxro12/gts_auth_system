import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-auth-shell',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './authShell.html',
})
export class AuthShellComponent {
    @Input() public brand: string = 'Global tax service';
    @Input() public title: string = 'Sign in with email';
    @Input() public subtitle: string = 'Make a new doc to bring your words, data, and teams together. For free';
}
