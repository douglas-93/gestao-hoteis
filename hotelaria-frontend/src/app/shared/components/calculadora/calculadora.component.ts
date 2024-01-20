import {Component} from '@angular/core';

@Component({
    selector: 'app-calculadora',
    templateUrl: './calculadora.component.html',
    styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
    displayValue: string = '0';

    buttons: string[][] = [
        ['C', '⇤', '%', '÷'],
        ['7', '8', '9', 'x'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '00', ',', '=']
    ];

    handleButtonClick(value: string): void {
        if (value === '=') {
            this.calculate();
        } else if (value === 'C') {
            this.clearDisplay();
        } else if (value === '⇤') {
            this.clearOne();
        } else {
            this.appendToDisplay(value);
        }
    }

    appendToDisplay(value: string): void {
        this.displayValue = this.displayValue === '0' ? value : this.displayValue + value;
    }

    clearDisplay(): void {
        this.displayValue = '0';
    }

    calculate(): void {
        try {
            this.displayValue = this.replaceSpecialCharacters(this.displayValue);
            this.displayValue = eval(this.displayValue).toString();
        } catch (error) {
            this.displayValue = 'Error';
        }
    }

    replaceSpecialCharacters(displayValue: string) {
        return displayValue.replaceAll('%', '/100')
            .replaceAll('x', '*')
            .replaceAll('÷', '/');
    }

    private clearOne() {
        let length = this.displayValue.length;
        if (length > 1) {
            this.displayValue = this.displayValue.slice(0, length - 1);
        } else if (length == 1 && this.displayValue != '0') {
            this.displayValue = '0';
        }
    }
}
