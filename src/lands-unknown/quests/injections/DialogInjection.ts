import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";

export class DialogInjection<T> extends AbstractInjection {
    npc: NpcId;

    dialog: Dialog<T>


    constructor(npc: NpcId, dialog: Dialog<T>) {
        super();
        this.npc = npc;
        this.dialog = dialog;
    }

    inject(features: Features) {
        console.log("injecting dialog")
        features.npcs.getNpc(this.npc).dialog.dialog.push(this.dialog);
    }

    eject(features: Features): void {
        console.log("ejecting dialog, not implemented")
        // features.npcs.getNpc(this.npc).dialog.dialog.push(this.dialog);

    }
}
