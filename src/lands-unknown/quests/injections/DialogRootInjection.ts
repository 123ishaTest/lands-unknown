import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {Features} from "@/ig-template/Features";
import {DialogOption} from "@/ig-template/tools/dialog/DialogOption";
import {DialogInjection} from "@/lands-unknown/quests/injections/DialogInjection";

export class DialogRootInjection<T> extends DialogInjection<T> {
    rootLabel: string


    constructor(npcId: NpcId, rootLabel: string, dialog: Dialog<T>) {
        super(npcId, dialog);
        this.rootLabel = rootLabel;
    }

    inject(features: Features) {
        const npc = features.npcs.getNpc(this.npcId);

        npc.dialog.root.options.unshift(new DialogOption<T>(this.rootLabel, this.dialog.id));
        super.inject(features);

    }

    eject(features: Features): void {
        const npc = features.npcs.getNpc(this.npcId);

        npc.dialog.root.options = npc.dialog.root.options.filter(option => {
            return option.label !== this.rootLabel;
        })

        super.eject(features);
    }
}
