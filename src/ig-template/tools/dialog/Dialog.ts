import {DialogId} from "@/ig-template/tools/dialog/DialogId";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {DialogDecisionId} from "@/ig-template/tools/dialog/DialogDecisionId";

export class Dialog {
    id: DialogId;
    dialog: DialogText[];

    currentIndex: number = 0;

    destination?: DialogDecisionId;


    constructor(id: DialogId, dialog: DialogText[], destination?: DialogDecisionId) {
        this.id = id;
        this.dialog = dialog;
        this.destination = destination;
    }

    next() {
        if (this.isAtEnd()) {
            console.warn(`Cannot go next as currentIndex is at the max`);
            return;
        }

        const currentDialog = this.dialog[this.currentIndex];
        if (currentDialog.afterRead != undefined) {
            currentDialog.afterRead();
        }
        this.currentIndex++;
    }

    isAtEnd(): boolean {
        return this.currentIndex === this.dialog.length;
    }

    getDialogText() {
        return this.dialog[this.currentIndex];
    }

    reset() {
        this.currentIndex = 0;
    }
}
