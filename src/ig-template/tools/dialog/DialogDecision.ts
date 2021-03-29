import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";

export class DialogDecision<T> {
    id: T;
    description: DialogText;
    options: DialogOption<T>[]


    constructor(id: T, description: DialogText, options: DialogOption<T>[]) {
        this.id = id;
        this.description = description
        this.options = options;
    }
}
