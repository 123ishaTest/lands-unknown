import {Npc} from "@/ig-template/features/npcs/Npc";
import {LumberjackDialog} from "@/ig-template/features/npcs/lumberjack/LumberjackDialog";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";

export class Lumberjack extends Npc {
    dialog: DialogTree<LumberjackDialog>;


    constructor() {
        super(NpcId.Lumberjack, "Lumberjack");
        this.dialog = new DialogTree<LumberjackDialog>(
            LumberjackDialog.Intro,
            [
                new Dialog(LumberjackDialog.Intro, [
                    new DialogText(NpcId.Player, "Nice weather"),
                    new DialogText(NpcId.Lumberjack, "Indeed it is"),
                ])
            ]
        );
    }
}
