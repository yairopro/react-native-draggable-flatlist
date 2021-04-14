import React, { useContext, useMemo } from "react";
import Animated from "react-native-reanimated";
import { AnimatedFlatListType, DraggableFlatListProps } from "./types";

type StaticContextValue<T> = {
  cellDataRef: React.MutableRefObject<Map<string, any>>;
  keyToIndexRef: React.MutableRefObject<Map<string, number>>;
  activeIndexAnim: Animated.SharedValue<number>;
  spacerIndexAnim: Animated.SharedValue<number>;
  hoverOffset: Animated.SharedValue<number>;
  activeCellSize: Animated.SharedValue<number>;
  activeCellOffset: Animated.SharedValue<number>;
  scrollOffset: Animated.SharedValue<number>;
  placeholderOffset: Animated.SharedValue<number>;
  activeKeyAnim: Animated.SharedValue<string>;
  horizontalAnim: Animated.SharedValue<boolean>;
  isHovering: Animated.SharedValue<boolean>;
  animationConfigRef: React.MutableRefObject<Animated.WithSpringConfig>;
  keyExtractor: (item: T, index: number) => string;
  flatlistRef: React.RefObject<AnimatedFlatListType>;
  activeKey: string | null;
};

type ActiveKeyContextValue = {
  activeKey: string | null;
};

type PropsContextValue = {
  horizontal?: boolean;
};

// context to hold values that remain referentially equal
const StaticContext = React.createContext<StaticContextValue<any> | undefined>(
  undefined
);
const ActiveKeyContext = React.createContext<ActiveKeyContextValue | undefined>(
  undefined
);
const PropsContext = React.createContext<PropsContextValue | undefined>(
  undefined
);

type Props<T> = StaticContextValue<T> &
  ActiveKeyContextValue &
  PropsContextValue & { children: React.ReactNode };

export const DraggableFlatListProvider = React.memo(function <T>({
  children,
  activeIndexAnim,
  spacerIndexAnim,
  hoverOffset,
  activeKeyAnim,
  horizontalAnim,
  keyToIndexRef,
  cellDataRef,
  activeCellSize,
  activeCellOffset,
  scrollOffset,
  isHovering,
  animationConfigRef,
  placeholderOffset,
  flatlistRef,
  activeKey,
  keyExtractor,
  propsRef,
  horizontal,
}: Props<T>) {
  const staticValue = useMemo(() => {
    return {
      activeIndexAnim,
      spacerIndexAnim,
      hoverOffset,
      activeKeyAnim,
      horizontalAnim,
      keyToIndexRef,
      cellDataRef,
      activeCellSize,
      activeCellOffset,
      scrollOffset,
      isHovering,
      animationConfigRef,
      placeholderOffset,
      flatlistRef,
      keyExtractor,
      propsRef,
    };
  }, [
    activeIndexAnim,
    activeKeyAnim,
    horizontalAnim,
    spacerIndexAnim,
    hoverOffset,
    activeCellSize,
    activeCellOffset,
    scrollOffset,
    isHovering,
    animationConfigRef,
    placeholderOffset,
    flatlistRef,
    keyExtractor,
    propsRef,
  ]);

  const activeKeyValue = useMemo(
    () => ({
      activeKey,
    }),
    [activeKey]
  );

  const propsValue = useMemo(
    () => ({
      horizontal,
    }),
    [horizontal]
  );

  return (
    <ActiveKeyContext.Provider value={activeKeyValue}>
      <StaticContext.Provider value={staticValue}>
        <PropsContext.Provider value={propsValue}>
          {children}
        </PropsContext.Provider>
      </StaticContext.Provider>
    </ActiveKeyContext.Provider>
  );
});

export const useStaticValues = () => {
  const value = useContext(StaticContext);
  if (!value) {
    throw new Error(
      "useStaticValues must be called within StaticContext.Provider"
    );
  }
  return value;
};

export const useActiveKey = () => {
  const value = useContext(ActiveKeyContext);
  if (!value) {
    throw new Error(
      "useActiveKey must be called within ActiveKeyContext.Provider"
    );
  }
  return value;
};

export const useProps = () => {
  const value = useContext(PropsContext);
  if (!value) {
    throw new Error("useProps must be called within PropsContext.Provider");
  }
  return value;
};