import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
}

const EmptyState = ({
  title = "No results found",
  description = "Try adjusting your filters or search to find more properties.",
  actionLabel = "Clear filters",
  onAction,
  icon,
}: EmptyStateProps) => {
  return (
    <Card className="w-full p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        {icon ?? <Search className="h-6 w-6 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      {onAction && (
        <div className="mt-6">
          <Button onClick={onAction} variant="secondary">
            {actionLabel}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default EmptyState;
