package com.example.asset_management.asset.lifecycle;

import com.example.asset_management.asset.entity.AssetStatus;
import java.util.List;
import java.util.EnumMap;
import java.util.EnumSet;
import java.util.Map;
import java.util.Set;

public final class AssetStateMachine {

    private static final Map<AssetStatus, Set<AssetStatus>> TRANSITIONS =
            new EnumMap<>(AssetStatus.class);

    static {

        TRANSITIONS.put(
                AssetStatus.NEW,
                EnumSet.of(
                        AssetStatus.IN_STOCK
                )
        );

        TRANSITIONS.put(
                AssetStatus.IN_STOCK,
                EnumSet.of(
                        AssetStatus.UNDER_CONFIGURATION,
                        AssetStatus.LOST,
                        AssetStatus.DAMAGED
                )
        );

        TRANSITIONS.put(
                AssetStatus.UNDER_CONFIGURATION,
                EnumSet.of(
                        AssetStatus.READY_TO_HANDOVER,
                        AssetStatus.UNDER_REPAIR
                )
        );

        TRANSITIONS.put(
                AssetStatus.READY_TO_HANDOVER,
                EnumSet.of(
                        AssetStatus.ALLOCATED
                )
        );

        TRANSITIONS.put(
                AssetStatus.ALLOCATED,
                EnumSet.of(
                        AssetStatus.RETURNED,
                        AssetStatus.LOST,
                        AssetStatus.DAMAGED
                )
        );

        TRANSITIONS.put(
                AssetStatus.RETURNED,
                EnumSet.of(
                        AssetStatus.UNDER_CONFIGURATION,
                        AssetStatus.UNDER_REPAIR,
                        AssetStatus.SCRAPPED,
                        AssetStatus.LOST,
                        AssetStatus.DAMAGED
                )
        );

        TRANSITIONS.put(
                AssetStatus.UNDER_REPAIR,
                EnumSet.of(
                        AssetStatus.IN_STOCK,
                        AssetStatus.READY_TO_HANDOVER,
                        AssetStatus.SCRAPPED
                )
        );

        TRANSITIONS.put(
                AssetStatus.DAMAGED,
                EnumSet.of(
                        AssetStatus.UNDER_REPAIR,
                        AssetStatus.SCRAPPED
                )
        );

        TRANSITIONS.put(
                AssetStatus.LOST,
                EnumSet.of(
                        AssetStatus.SCRAPPED
                )
        );

        TRANSITIONS.put(
                AssetStatus.SCRAPPED,
                EnumSet.noneOf(AssetStatus.class)
        );

    }

    private AssetStateMachine() {
    }

    public static boolean canTransition(
            AssetStatus current,
            AssetStatus next) {

        return TRANSITIONS
                .getOrDefault(current, Set.of())
                .contains(next);

    }

    public static void validateTransition(
            AssetStatus current,
            AssetStatus next) {

        if (!canTransition(current, next)) {

            throw new InvalidAssetStateException(
                    "Invalid asset transition: "
                            + current
                            + " -> "
                            + next
            );

        }

    }
    public static List<AssetStatus> getAllowedTransitions(
            AssetStatus current) {

        return TRANSITIONS
                .getOrDefault(current, Set.of())
                .stream()
                .toList();

    }

}