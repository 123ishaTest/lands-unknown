import {Requirement} from "@/ig-template/tools/requirements/Requirement";
import {NoRequirement} from "@/ig-template/tools/requirements/NoRequirement";

export class DialogOption<T> {
    label: string;
    reference: T;
    requirement: Requirement;

    constructor(label: string, reference: T, requirement: Requirement = new NoRequirement()) {
        this.label = label;
        this.reference = reference;
        this.requirement = requirement;
    }

    canAccess(): boolean {
        return this.requirement.isCompleted
    }
}
