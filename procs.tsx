import Animated from "react-native-reanimated"
import { State as GestureState } from "react-native-gesture-handler"

let {
  or,
  set,
  cond,
  add,
  sub,
  block,
  eq,
  neq,
  and,
  divide,
  greaterThan,
  greaterOrEq,
  not,
  proc,
  debug,
  Value,
  spring,
} = Animated

if (!proc) {
  console.warn("Use reanimated > 1.3 for optimal perf")
  proc = cb => cb
}

export const getMidpoint = proc((size, offset) => add(offset, divide(size, 2)))

export const getIsAfterActive = proc((currentIndex, activeIndex) => greaterThan(currentIndex, activeIndex))

export const getHoverMid = proc((
  isAfterActive,
  midpoint,
  activeCellSize,
) => cond(
  isAfterActive,
  sub(midpoint, activeCellSize),
  midpoint,
))

export const getIsShifted = proc((translate) => greaterThan(translate, 0))

export const getIsAfterHoverMid = proc((hoverMid, hoverOffset) => greaterOrEq(hoverMid, hoverOffset))

export const getTranslate = proc((isHovering, currentIndex, activeIndex, isAfterHoverMid, activeCellSize) => cond(and(
  isHovering,
  neq(currentIndex, activeIndex)
), cond(isAfterHoverMid, activeCellSize, 0), 0))

export const getCellStart = proc((isAfterActive, size, offset, activeCellSize, scrollOffset) => sub(
  cond(isAfterActive, sub(add(offset, size), activeCellSize), offset), scrollOffset)
)


const setMultiCond = proc((
  val,
  firstCond,
  secondCond,
  firstAndSecond,
  firstOnly,
  secondOnly,
  none
) => set(val,
  cond(firstCond,
    cond(secondCond, firstAndSecond, firstOnly),
    cond(secondCond, secondOnly, none)
  )
))

export const getOnChangeTranslate = proc((
  translate,
  hasMoved,
  isAfterActive,
  isShifted,
  cellStart,
  size,
  initialized,
  currentIndex,
  hoverScrollSnapshot,
  scrollOffset,
  hoverTo,
  spacerIndex,
  position,
  toValue,
) => block([
  cond(or(not(isAfterActive), initialized), [
    set(hoverScrollSnapshot, scrollOffset),
    cond(hasMoved, [
      setMultiCond(hoverTo, isAfterActive, isShifted, sub(cellStart, size), cellStart, cellStart, add(cellStart, size)),
      setMultiCond(spacerIndex, isAfterActive, isShifted, sub(currentIndex, 1), currentIndex, currentIndex, add(currentIndex, 1)),
    ])
  ], set(initialized, 1)),
  set(toValue, translate),
]))


export const getOnCellTap = proc((
  state,
  tapState,
  disabled,
  offset,
  scrollOffset,
  hasMoved,
  hoverTo,
  touchCellOffset,
  onGestureRelease,
  touchOffset,
) => block([
  cond(and(
    neq(state, tapState),
    not(disabled),
  ), [
      set(tapState, state),
      cond(eq(state, GestureState.BEGAN), [
        set(hasMoved, 0),
        set(hoverTo, sub(offset, scrollOffset)),
        set(touchCellOffset, touchOffset),
      ]),
      cond(eq(state, GestureState.END), onGestureRelease)
    ]
  )
]))

const betterSpring = proc(
  (
    finished,
    velocity,
    position,
    time,
    prevPosition,
    toValue,
    damping,
    mass,
    stiffness,
    overshootClamping,
    restSpeedThreshold,
    restDisplacementThreshold,
    clock
  ) =>
    spring(
      clock,
      {
        finished,
        velocity,
        position,
        time,
        prevPosition,
      },
      {
        toValue,
        damping,
        mass,
        stiffness,
        overshootClamping,
        restDisplacementThreshold,
        restSpeedThreshold,
      }
    )
);

export function springFill(clock, state, config) {
  return betterSpring(
    state.finished,
    state.velocity,
    state.position,
    state.time,
    new Value(0),
    config.toValue,
    config.damping,
    config.mass,
    config.stiffness,
    config.overshootClamping,
    config.restSpeedThreshold,
    config.restDisplacementThreshold,
    clock
  );
}