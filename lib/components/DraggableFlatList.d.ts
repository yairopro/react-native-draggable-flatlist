import React, { ForwardedRef } from "react";
import { FlatListProps } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { DraggableFlatListProps } from "../types";
declare function DraggableFlatList<T>(
  props: DraggableFlatListProps<T>,
  ref: React.ForwardedRef<FlatList<T>>
): JSX.Element;
declare const _default: <T>(
  props: Omit<
    FlatListProps<T>,
    | "onDragEnd"
    | "keyExtractor"
    | "data"
    | "renderItem"
    | "debug"
    | "scrollEnabled"
    | "autoscrollThreshold"
    | "autoscrollSpeed"
    | "animationConfig"
    | "dragHitSlop"
    | "activationDistance"
    | "dragItemOverflow"
    | "containerStyle"
    | "onDragBegin"
    | "onPlaceholderIndexChange"
    | "onRelease"
    | "onScrollOffsetChange"
    | "renderPlaceholder"
    | "simultaneousHandlers"
    | "cellStyle"
  > & {
    data: T[];
    activationDistance?: number | undefined;
    animationConfig?: Partial<Animated.SpringConfig> | undefined;
    autoscrollSpeed?: number | undefined;
    autoscrollThreshold?: number | undefined;
    containerStyle?: import("react-native").StyleProp<
      import("react-native").ViewStyle
    >;
    debug?: boolean | undefined;
    dragItemOverflow?: boolean | undefined;
    keyExtractor: (item: T, index: number) => string;
    onDragBegin?: ((index: number) => void) | undefined;
    onDragEnd?:
      | ((params: import("../types").DragEndParams<T>) => void)
      | undefined;
    onPlaceholderIndexChange?: ((placeholderIndex: number) => void) | undefined;
    onRelease?: ((index: number) => void) | undefined;
    onScrollOffsetChange?: ((scrollOffset: number) => void) | undefined;
    renderItem: import("../types").RenderItem<T>;
    renderPlaceholder?: import("../types").RenderPlaceholder<T> | undefined;
    simultaneousHandlers?: React.Ref<any> | React.Ref<any>[] | undefined;
    cellStyle?:
      | import("react-native").StyleProp<import("react-native").ViewStyle>
      | ((
          item: T,
          index: number
        ) => import("react-native").StyleProp<
          import("react-native").ViewStyle
        >);
  } & Partial<
      Readonly<{
        autoscrollThreshold: number;
        autoscrollSpeed: number;
        animationConfig: import("react-native-reanimated").WithSpringConfig;
        scrollEnabled: boolean;
        dragHitSlop:
          | import("react-native-gesture-handler/lib/typescript/handlers/gestureHandlerCommon").HitSlop
          | undefined;
        activationDistance: number;
        dragItemOverflow: boolean;
      }>
    > & {
      ref?: React.ForwardedRef<FlatList<T>> | undefined;
    }
) => ReturnType<typeof DraggableFlatList>;
export default _default;
