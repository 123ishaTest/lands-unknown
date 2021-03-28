export enum WorldLocationId {
    // Towns
    FisherMan = 'fisherman',
    Market = 'market',
    Lumberjack = 'lumberjack',
    Quarry = 'quarry',
    Castle = 'castle',
    Island = 'island',
    Docks = 'docks',


    // CrossRoads
    NorthernCrossRoads = 'northern-cross-roads',
    SouthernCrossRoads = 'southern-cross-roads',
    EasternCrossRoads = 'eastern-cross-roads',
    MiddleCrossRoads = 'middle-cross-roads',

    // Roads only need to be described if they are accessed in the code (like by having a requirement)
    DocksToIsland = "docks-island",
    // FisherManNorthernCrossRoad = "fisherman-northern-cross-road",
    // MarketNorthernCrossRoad = "market-northern-cross-road",
    // LumberjackNorthernCrossRoad = "lumberjack-northern-cross-road",

}
