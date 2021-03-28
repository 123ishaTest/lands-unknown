import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogDecisionId} from "@/ig-template/tools/dialog/DialogDecisionId";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";

export class DialogDecision {
    id: DialogDecisionId;
    description: DialogText;
    options: DialogOption[]


    constructor(id: DialogDecisionId, description: DialogText, options: DialogOption[]) {
        this.id = id;
        this.description = description
        this.options = options;
    }
}
