import { createContext, Ref, HTMLAttributes } from 'react';

type TooltipTriggerState = any
type PlacementAxis = any

interface TooltipContextProps {
  state?: TooltipTriggerState,
  ref?: Ref<HTMLDivElement>,
  placement?: PlacementAxis,
  arrowProps?: HTMLAttributes<HTMLElement>
}

export const TooltipContext = createContext<TooltipContextProps>({});