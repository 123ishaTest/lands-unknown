import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogDecision} from "@/ig-template/tools/dialog/DialogDecision";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {NpcDecision} from "@/ig-template/tools/dialog/NpcDecision";

export class DialogTree<T> {
    dialog: Dialog<T>[];
    playerDecisions: DialogDecision<T>[];
    npcDecisions: NpcDecision<T>[];
    private readonly firstDialog: T;

    constructor(firstDialog: T, dialog: Dialog<T>[], decisions: DialogDecision<T>[] = [], npcDecisions: NpcDecision<T>[] = []) {
        this.firstDialog = firstDialog;
        this.dialog = dialog;
        this.playerDecisions = decisions;
        this.npcDecisions = npcDecisions;
    }


    getRoot(): DialogDecision<T> {
        return new DialogDecision<T>('root' as unknown as T, new DialogText(NpcId.Player, "Intro text?"), [new DialogOption<T>("Talk about something else", this.firstDialog)]);
    }

    getDialog(id: T) {
        return this.dialog.find(value => value.id === id) ?? null;
    }

    getDecision(id: T) {
        return this.playerDecisions.find(value => value.id === id) ?? null;
    }

    getNpcDecision(id: T) {
        return this.npcDecisions.find(value => value.id === id) ?? null;
    }
}
