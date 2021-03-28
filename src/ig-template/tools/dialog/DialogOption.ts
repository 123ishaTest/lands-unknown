import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";
import {DialogId} from "@/ig-template/tools/dialog/DialogId";

export class DialogOption {
    label: string;
    reference: DialogId;
    requirement: Requirement;

    constructor(label: string, reference: DialogId, requirement: Requirement = new NoRequirement()) {
        this.label = label;
        this.reference = reference;
        this.requirement = requirement;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted
    }
}
