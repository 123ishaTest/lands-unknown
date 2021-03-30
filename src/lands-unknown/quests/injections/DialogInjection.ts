import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";

export class DialogInjection<T> extends AbstractInjection {
    npcId: NpcId;

    dialog: Dialog<T>


    constructor(npcId: NpcId, dialog: Dialog<T>) {
        super();
        this.npcId = npcId;
        this.dialog = dialog;
    }

    inject(features: Features) {
        const npc = features.npcs.getNpc(this.npcId);
        npc.dialog.dialog.push(this.dialog);
    }

    eject(features: Features): void {
        const npc = features.npcs.getNpc(this.npcId);

        const index = npc.dialog.dialog.indexOf(this.dialog);
        npc.dialog.dialog.splice(index, 1);
    }
}
