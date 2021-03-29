import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";
import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";

export class DialogInjection<T> extends AbstractInjection {
    npcId: NpcId;

    rootLabel: string
    dialog: Dialog<T>


    constructor(npcId: NpcId, rootLabel: string, dialog: Dialog<T>) {
        super();
        this.npcId = npcId;
        this.rootLabel = rootLabel;
        this.dialog = dialog;
    }

    inject(features: Features) {
        const npc = features.npcs.getNpc(this.npcId);
        npc.dialog.root.options.unshift(new DialogOption<T>(this.rootLabel, this.dialog.id));
        npc.dialog.dialog.push(this.dialog);

    }

    eject(features: Features): void {
        const npc = features.npcs.getNpc(this.npcId);

        const index = npc.dialog.dialog.indexOf(this.dialog);
        npc.dialog.dialog.splice(index, 1);

        npc.dialog.root.options = npc.dialog.root.options.filter(option => {
            return option.label !== this.rootLabel;
        })

    }
}
