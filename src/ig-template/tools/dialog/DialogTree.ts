import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {DialogId} from "@/ig-template/tools/dialog/DialogId";
import {DialogDecisionId} from "@/ig-template/tools/dialog/DialogDecisionId";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {NpcId} from "@/ig-template/features/npcs/NpcId";

export class DialogTree {
    dialog: Dialog[];
    decisions: DialogDecision[];
    private readonly firstDialog: DialogId;

    constructor(dialog: Dialog[], decisions: DialogDecision[], firstDialog: DialogId) {
        this.dialog = dialog;
        this.decisions = decisions;
        this.firstDialog = firstDialog;
    }


    getRoot() {
        return new DialogDecision(DialogDecisionId.Root, new DialogText(NpcId.Player, "Intro text?"), [new DialogOption("Talk about something else", this.firstDialog)]);
    }

    getDialog(id: DialogId) {
        return this.dialog.find(value => value.id === id) ?? null;
    }

    getDecision(id: DialogDecisionId) {
        return this.decisions.find(value => value.id === id) ?? null;
    }
}
