import {KeyItems} from "@/ig-template/features/key-items/KeyItems";
import {KeyItemId} from '@/ig-template/features/key-items/KeyItemId';
import {KeyItem} from '@/ig-template/features/key-items/KeyItem';
import {KeyItemRequirement} from '@/ig-template/features/key-items/KeyItemRequirement';

describe('Key Item Requirement', () => {
    const id = "dummy" as KeyItemId;

    test('normal usage', () => {
        const keyItems = new KeyItems();
        const keyItem = keyItems.registerKeyItem(new KeyItem(id, 'test', ''));
        const requirement = new KeyItemRequirement(keyItems, id);

        expect(requirement.isCompleted).toBe(false);
        keyItem.unlock();

        expect(requirement.isCompleted).toBe(true);
    });

});
