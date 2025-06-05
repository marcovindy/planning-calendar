import { SCHEDULER_CONFIG } from "@/config/scheduler";
import type { Order } from "@/types";

export const OrderCell: React.FC<{ order: Order }> = ({ order }) => (
  <div
    className="sticky [will-change:transform] [backface-visibility:hidden] left-0 z-20 bg-white border-r flex-shrink-0 border-b"
    style={{ width: SCHEDULER_CONFIG.dimensions.leftColumnWidth }}
  >
    <div className="p-2">
      <div className="font-medium">{order.code}</div>
      <div className="text-sm text-gray-600">{order.name}</div>
    </div>
  </div>
);
