import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {DialogTree} from "@/ig-template/tools/dialog/DialogTree";
import {Dialog} from "@/ig-template/tools/dialog/Dialog";
import {DialogText} from "@/ig-template/tools/dialog/DialogText";
import {Npc} from "@/ig-template/features/npcs/Npc";
import {CaptainDialog} from "@/ig-template/features/npcs/captain/CaptainDialog";
import {KeyItems} from "@/ig-template/features/key-items/KeyItems";
import {KeyItemDecision} from "@/ig-template/tools/dialog/npc-decisions/KeyItemDecision";
import {KeyItemId} from "@/ig-template/features/key-items/KeyItemId";

export class Captain extends Npc {
    dialog: DialogTree<CaptainDialog>;

    _keyItems: KeyItems;

    constructor(keyItems: KeyItems) {
        super(NpcId.Captain, "Fisherman")
        this._keyItems = keyItems;
        this.dialog = new DialogTree(
            CaptainDialog.Intro,
            [
                new Dialog(CaptainDialog.Intro,
                    [
                        new DialogText(NpcId.Player, "Hi there"),
                        new DialogText(NpcId.Captain, "Good day"),
                        new DialogText(NpcId.Player, "Do you know how I can get to the island?"),
                        new DialogText(NpcId.Captain, "I can only let you through if you have a Boat Ticket"),
                    ],
                    CaptainDialog.HasBoatTicket
                ),
                new Dialog(CaptainDialog.YesBoatTicket,
                    [
                        new DialogText(NpcId.Player, "I have one right here"),
                        new DialogText(NpcId.Captain, "That's great, now you can travel to the island!"),
                        new DialogText(NpcId.Player, "Thanks!"),
                    ],
                ),
                new Dialog(CaptainDialog.NoBoatTicket,
                    [
                        new DialogText(NpcId.Player, "Where can I get one?"),
                        new DialogText(NpcId.Captain, "I heard the King only gives them to worthy adventurers"),
                        new DialogText(NpcId.Captain, "Maybe if you help out some of the citizens, he will deem you worthy"),
                        new DialogText(NpcId.Player, "I see, thanks!"),
                    ],
                ),
            ],
            [],
            [
                new KeyItemDecision(CaptainDialog.HasBoatTicket, this._keyItems.getKeyItem(KeyItemId.BoatTicket), CaptainDialog.YesBoatTicket, CaptainDialog.NoBoatTicket)
            ]
        );
    }
}
