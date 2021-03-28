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
import {FacilityType} from "@/ig-template/features/world-map/FacilityType";
import {TiledLayer} from "@/ig-template/tools/tiled/types/layers/TiledLayer";
import {CrossRoads} from "@/ig-template/features/world-map/towns/CrossRoads";
import {TravelType} from "@/ig-template/features/world-map/roads/TravelType";

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
        const pathLayer = this.getLayer("Paths") as ObjectGroup;

        return pathLayer?.objects?.filter(object => {
            // Skip single points, we will parse them later.
            return !object.point
        }).map(object => {

            const properties = object.properties as ObjectProperty[];
            const from = this.getPropertyValue(properties, "from")
            const to = this.getPropertyValue(properties, "to")
            const roadType = this.getPropertyValue(properties, "type") ?? TravelType.Walk;
            const id = `${from}-${to}` as WorldLocationId;
            const baseDuration = this.getPropertyValue(properties, "baseDuration")

            const points = object.polyline?.map(position => {
                return this.globalToTilePosition({
                    x: position.x + object.x,
                    y: position.y + object.y,
                });
            }) ?? [];
            return new Road(new RoadLocationIdentifier(id), "Road", new TownLocationIdentifier(from), new TownLocationIdentifier(to), points, baseDuration, roadType);
        });
    }

    static getLayer(name: string): TiledLayer {
        const world = worldMap as unknown as TiledMap;
        return world.layers.find(layer => {
            return layer.name === name;
        }) as TiledLayer;
    }

    static parseWorldLocations(): Record<WorldLocationId, WorldPosition> {
        const hitBoxLayer = this.getLayer("Hitboxes") as ObjectGroup;

        const positions = {} as Record<WorldLocationId, WorldPosition>

        hitBoxLayer?.objects?.filter(object => {
            // Only parse points.
            return object.point
        }).forEach(object => {
            positions[object.name as WorldLocationId] = this.globalToTilePosition({x: object.x, y: object.y});
        });
        return positions;
    }

    static createWorld(): WorldMap {
        const roads = this.parsePaths();
        const worldPositions = this.parseWorldLocations();

        const towns = [
            new Town(new TownLocationIdentifier(WorldLocationId.Market), "Market", TownTier.Town, worldPositions[WorldLocationId.Market], [],
                [
                    FacilityType.Furnace,
                    FacilityType.CookingRange,
                ]),
            new Town(new TownLocationIdentifier(WorldLocationId.FisherMan), "Fisherman", TownTier.Town, worldPositions[WorldLocationId.FisherMan], [
                ActionId.Fish,
            ]),
            new Town(new TownLocationIdentifier(WorldLocationId.Castle), "Castle", TownTier.Town, worldPositions[WorldLocationId.Castle], [
                ActionId.BuyBoatTicket,
            ]),
            new Town(new TownLocationIdentifier(WorldLocationId.Island), "Island", TownTier.Town, worldPositions[WorldLocationId.Island], [
                ActionId.LootIslandChest,
            ]),
            new Town(new TownLocationIdentifier(WorldLocationId.Lumberjack), "Lumberjack", TownTier.Town, worldPositions[WorldLocationId.Lumberjack], [
                ActionId.CutWood,
            ]),
            new Town(new TownLocationIdentifier(WorldLocationId.Docks), "Docks", TownTier.Town, worldPositions[WorldLocationId.Docks]),
            new Town(new TownLocationIdentifier(WorldLocationId.Quarry), "Quarry", TownTier.Town, worldPositions[WorldLocationId.Quarry], [
                ActionId.MineStone,
                ActionId.MineIron,
            ]),
            new CrossRoads(WorldLocationId.NorthernCrossRoads, "Northern Crossroads", worldPositions[WorldLocationId.NorthernCrossRoads]),
            new CrossRoads(WorldLocationId.MiddleCrossRoads, "Middle Crossroads", worldPositions[WorldLocationId.MiddleCrossRoads]),
            new CrossRoads(WorldLocationId.SouthernCrossRoads, "Southern Crossroads", worldPositions[WorldLocationId.SouthernCrossRoads]),
            new CrossRoads(WorldLocationId.EasternCrossRoads, "Eastern Crossroads", worldPositions[WorldLocationId.EasternCrossRoads]),
        ];

        return new WorldMap(roads, towns);
    }

}
