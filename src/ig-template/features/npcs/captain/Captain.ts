import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {Npc} from "@/ig-template/features/npcs/Npc";
import {CaptainDialog} from "@/ig-template/features/npcs/captain/CaptainDialog";

export class Captain extends Npc {
    dialog: DialogTree<CaptainDialog>;


    constructor() {
        super(NpcId.Captain, "Fisherman")
        this.dialog = new DialogTree(
            CaptainDialog.Intro,
            [
                new Dialog(CaptainDialog.Intro,
                    [
                        new DialogText(NpcId.Player, "Hi there"),
                        new DialogText(NpcId.Captain, "Good day"),
                        new DialogText(NpcId.Player, "Do you know how I can get to the island?"),
                        new DialogText(NpcId.Captain, "I can only let you through if you have a Boat Ticket"),
                        new DialogText(NpcId.Player, "Where can I get one?"),
                        new DialogText(NpcId.Captain, "Only the king can give you one, now scram"),
                    ],
                ),
            ]
        );
    }
}
