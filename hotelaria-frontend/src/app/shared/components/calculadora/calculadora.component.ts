import { Component } from '@angular/core';

@Component({
    selector: 'app-calculadora',
    templateUrl: './calculadora.component.html',
    styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent {
    displayValue: string = '0';

    buttons: string[][] = [
        ['C', '/', '*', '-'],
        ['7', '8', '9', '+'],
        ['4', '5', '6', '='],
        ['1', '2', '3', '.'],
        ['0']
    ];

    handleButtonClick(value: string): void {
        if (value === '=') {
            this.calculate();
        } else if (value === 'C') {
            this.clearDisplay();
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
            this.displayValue = eval(this.displayValue).toString();
        } catch (error) {
            this.displayValue = 'Error';
        }
    }
}
