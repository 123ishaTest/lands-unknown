import {WorldMap} from "@/ig-template/features/world-map/WorldMap";
import {TownLocationIdentifier} from "@/ig-template/features/world-map/towns/TownLocationIdentifier";
import {TownTier} from "@/ig-template/features/world-map/towns/TownTier";
import {RoadLocationIdentifier} from "@/ig-template/features/world-map/roads/RoadLocationIdentifier";
import {Road} from "@/ig-template/features/world-map/roads/Road";
import {Town} from "@/ig-template/features/world-map/towns/Town";

import worldMap from '@/assets/tiled/maps/overworld.json'
import {WorldPosition} from "@/ig-template/tools/tiled/WorldPosition";
import {ObjectGroup} from "@/ig-template/tools/tiled/types/layers/ObjectGroup";
import {TiledMap} from "@/ig-template/tools/tiled/types/TiledMap";
import {ObjectProperty} from "@/ig-template/tools/tiled/types/objects/ObjectProperty";
import {WorldLocationId} from "@/ig-template/features/world-map/WorldLocationId";
import {ActionId} from "@/lands-unknown/features/action-list/ActionId";

export class WorldBuilder {

    static globalToTilePosition(global: WorldPosition): WorldPosition {
        const tileHeight = worldMap.tileheight;
        const tileWidth = worldMap.tilewidth;
        return {
            x: Math.floor(global.x / tileWidth),
            y: Math.floor(global.y / tileHeight),
        }
    }

    static getPropertyValue(
        properties: ObjectProperty[], targetName: string) {
        const property = properties.find(property => {
            return property.name === targetName;
        })
        return property?.value
    }

    static parsePaths(): Road[] {
        // TODO double check
        const world = worldMap as unknown as TiledMap;
        const pathLayer = world.layers.find(layer => {
            return layer.name === "Paths"
        }) as ObjectGroup;


        const paths = pathLayer?.objects?.map(object => {
            const properties = object.properties as ObjectProperty[];
            const from = this.getPropertyValue(properties, "from")
            const to = this.getPropertyValue(properties, "to")
            const id = `${from}-${to}` as WorldLocationId;
            const baseDuration = this.getPropertyValue(properties, "baseDuration")

            const points = object.polyline?.map(position => {
                return this.globalToTilePosition({
                    x: position.x + object.x,
                    y: position.y + object.y,
                });
            }) ?? [];
            return new Road(new RoadLocationIdentifier(id), "Road", new TownLocationIdentifier(from), new TownLocationIdentifier(to), points, baseDuration);
        });

        return paths;
    }

    static createWorld(): WorldMap {
        const roads = this.parsePaths();

        const towns = [
            new Town(new TownLocationIdentifier(WorldLocationId.Market), "Market", TownTier.Town),
            new Town(new TownLocationIdentifier(WorldLocationId.FisherMan), "Fisherman", TownTier.Town, [
                ActionId.Fish,
            ]),
            new Town(new TownLocationIdentifier(WorldLocationId.Castle), "Castle", TownTier.Town),
            new Town(new TownLocationIdentifier(WorldLocationId.Lumberjack), "Lumberjack", TownTier.Town, [
                ActionId.CutWood,
            ]),
            new Town(new TownLocationIdentifier(WorldLocationId.Docks), "Docks", TownTier.Town),
            new Town(new TownLocationIdentifier(WorldLocationId.Quarry), "Quarry", TownTier.Town, [
                ActionId.MineStone,
                ActionId.MineIron,
            ]),
        ];

        return new WorldMap(roads, towns);
    }

}
