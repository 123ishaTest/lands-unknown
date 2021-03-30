import {App} from "@/App.ts";

import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";
import {DialogHandler} from "@/ig-template/tools/dialog/DialogHandler";
import {QuestId} from "@/lands-unknown/quests/QuestId";
import {NpcId} from "@/ig-template/features/npcs/NpcId";
import {LumberjackQuest} from "@/lands-unknown/quests/lumberjack/LumberjackQuest";
import {LumberjackQuestStepId} from "@/lands-unknown/quests/lumberjack/LumberjackQuestStepId";
import {KeyItemId} from "@/ig-template/features/key-items/KeyItemId";
import {ItemId} from "@/ig-template/features/items/ItemId";


describe('Run the lumberjack quest', () => {

    test('Lumberjack Quest', () => {
        expect(() => {
            App.start()

            const lumberjack = App.game.features.npcs.getNpc(NpcId.Lumberjack)
            const king = App.game.features.npcs.getNpc(NpcId.King)
            const quest: LumberjackQuest = App.game.features.quests.getQuest(QuestId.Lumberjack) as LumberjackQuest;

            const worldMap = App.game.features.worldMap;
            const adventurer = App.game.features.adventurer;

            const lumberjackTown = worldMap.getTown(WorldLocationId.Lumberjack);
            const lumberjackLocation = new TownLocationIdentifier(WorldLocationId.Lumberjack);
            const kingLocation = new TownLocationIdentifier(WorldLocationId.Castle);
            const dialogHandler = new DialogHandler();

            // Move to beginning
            worldMap.moveToLocation(lumberjackLocation);
            App.game.forceUpdate(Infinity);
            expect(quest.isStarted).toBe(false)

            // Quest Intro
            dialogHandler.start(lumberjack.dialog);
            dialogHandler.selectOption(0);
            dialogHandler.goToEnd()
            expect(quest.isStarted).toBe(true);
            dialogHandler.goToEnd()

            // Ask permission from king
            expect(quest.currentStep.id).toBe(LumberjackQuestStepId.AskPermissionFromKing)
            worldMap.moveToLocation(kingLocation)
            App.game.forceUpdate(Infinity);
            dialogHandler.start(king.dialog);
            dialogHandler.selectOption(0);
            dialogHandler.goToEnd()

            // Back to lumberjack
            expect(quest.currentStep.id).toBe(LumberjackQuestStepId.BackToLumberjack)
            worldMap.moveToLocation(lumberjackLocation)
            App.game.forceUpdate(Infinity);
            dialogHandler.start(lumberjack.dialog);
            dialogHandler.selectOption(0);
            dialogHandler.goToEnd()

            // Gather wood
            expect(quest.currentStep.id).toBe(LumberjackQuestStepId.GatherWood)
            adventurer.addAction(lumberjackTown.possibleActions[0], 25)
            for (let i = 0; i < 30; i++) {
                App.game.forceUpdate(Infinity);
            }

            // Wood gathered
            expect(quest.currentStep.id).toBe(LumberjackQuestStepId.WoodGathered)
            dialogHandler.start(lumberjack.dialog);
            dialogHandler.selectOption(0);
            dialogHandler.goToEnd()

            expect(App.game.features.inventory.getTotalAmount(ItemId.Wood)).toBe(1);

            // Go to King for reward
            expect(quest.currentStep.id).toBe(LumberjackQuestStepId.GetBoatTicketFromKing)
            worldMap.moveToLocation(kingLocation)
            App.game.forceUpdate(Infinity);
            dialogHandler.start(king.dialog);
            dialogHandler.selectOption(0);
            dialogHandler.goToEnd()


            expect(quest.isCompleted).toBe(true);
            expect(App.game.features.keyItems.hasKeyItem(KeyItemId.BoatTicket)).toBe(true);
        }).not.toThrow();
    });
});
