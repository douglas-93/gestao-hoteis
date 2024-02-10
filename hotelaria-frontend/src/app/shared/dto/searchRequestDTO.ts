export class SearchRequestDTO {
    columnName: string;
    value: string;
    operation: Operation;
    joinTable: string;
}

export enum Operation {
    EQUAL='EQUAL',
    LIKE='LIKE',
    IN='IN',
    GREATER_THAN='GREATER_THAN',
    LESS_THAN='LESS_THAN',
    GREATER_THAN_EQUAL='GREATER_THAN_EQUAL',
    LESS_THAN_EQUAL='LESS_THAN_EQUAL',
    BETWEEN='BETWEEN',
    JOIN='JOIN'
}
