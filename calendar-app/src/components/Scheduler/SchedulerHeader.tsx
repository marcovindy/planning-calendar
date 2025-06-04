import type { SchedulerViewport } from "../../types";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SchedulerHeaderProps {
  viewport: SchedulerViewport;
  onMove: (direction: "left" | "right") => void;
}

export const SchedulerHeader: React.FC<SchedulerHeaderProps> = ({
  viewport,
  onMove
}) => {
  return (
    <div className="flex items-center justify-center p-4 border-b">
      <div className="flex space-x-2 items-center">
        <Button variant="outline" size="icon" onClick={() => onMove("left")}>
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <div className="text-sm font-medium text-muted-foreground">
          {viewport.label}
        </div>
        <Button variant="outline" size="icon" onClick={() => onMove("right")}>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
