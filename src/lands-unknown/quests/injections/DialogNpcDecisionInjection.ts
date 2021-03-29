import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {AbstractInjection} from "@/lands-unknown/quests/injections/AbstractInjection";
import {Features} from "@/ig-template/Features";
import {NpcDecision} from "@/ig-template/tools/dialog/NpcDecision";

export class DialogNpcDecisionInjection<T> extends AbstractInjection {
    npcId: NpcId;

    npcDecision: NpcDecision<T>


    constructor(npcId: NpcId, npcDecision: NpcDecision<T>) {
        super();
        this.npcId = npcId;
        this.npcDecision = npcDecision;
    }

    inject(features: Features) {
        const npc = features.npcs.getNpc(this.npcId);
        npc.dialog.npcDecisions.push(this.npcDecision);
    }

    eject(features: Features): void {
        const npc = features.npcs.getNpc(this.npcId);

        npc.dialog.npcDecisions = npc.dialog.npcDecisions.filter(decision => {
            return decision.id !== this.npcDecision.id;
        })
    }
}
