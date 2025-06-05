import { SCHEDULER_CONFIG } from "@/config/scheduler";
import type { Order } from "@/types";
import { ChevronRight, ChevronDown } from "lucide-react";

interface OrderCellProps {
  order: Order & { level?: number };
  onToggle: (orderId: string) => void;
  isExpanded: boolean;
}

export const OrderCell: React.FC<OrderCellProps> = ({
  order,
  onToggle,
  isExpanded
}) => (
  <div
    className="sticky [will-change:transform] [backface-visibility:hidden] left-0 z-20 bg-white border-r flex-shrink-0 border-b"
    style={{ width: SCHEDULER_CONFIG.dimensions.leftColumnWidth }}
  >
    <div className="p-2 flex items-center">
      <div className="flex items-center">
        {Array.from({ length: order.level || 0 }).map((_, index) => (
          <div
            key={index}
            className="w-6 h-full border-l border-gray-200 ml-2"
          />
        ))}
      </div>

      <div className="w-6 flex justify-center">
        {order.hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle(order.id);
            }}
            className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>
        ) : (
          <div className="w-5 h-5 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
          </div>
        )}
      </div>

      <div className="ml-2 min-w-0">
        <div className="font-medium truncate">{order.code}</div>
        <div className="text-xs text-gray-600 truncate">{order.name}</div>
      </div>
    </div>
  </div>
);
