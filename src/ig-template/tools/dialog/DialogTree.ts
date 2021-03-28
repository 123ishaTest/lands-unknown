import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {NpcId} from "@/ig-template/features/npcs/NpcId";

export class DialogTree<T> {
    dialog: Dialog<T>[];
    decisions: DialogDecision<T>[];
    private readonly firstDialog: T;

    constructor(dialog: Dialog<T>[], decisions: DialogDecision<T>[], firstDialog: T) {
        this.dialog = dialog;
        this.decisions = decisions;
        this.firstDialog = firstDialog;
    }


    getRoot(): DialogDecision<T> {
        return new DialogDecision<T>('root' as unknown as T, new DialogText(NpcId.Player, "Intro text?"), [new DialogOption<T>("Talk about something else", this.firstDialog)]);
    }

    getDialog(id: T) {
        return this.dialog.find(value => value.id === id) ?? null;
    }

    getDecision(id: T) {
        return this.decisions.find(value => value.id === id) ?? null;
    }
}
