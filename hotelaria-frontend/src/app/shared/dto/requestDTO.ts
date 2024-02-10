import {PageDTO} from "./pageDTO";
import {SearchRequestDTO} from "./searchRequestDTO";

export class RequestDTO {
    searchRequestDTOS: SearchRequestDTO[] = [];
    globalOperator: GlobalOperator;
    pageDTO: PageDTO;
}

export enum GlobalOperator {
    AND = 'AND', OR = 'OR'
}
