import { cn } from '@/app/utils/cn';
import * as radixDropdown from '@radix-ui/react-dropdown-menu';

type DropdownMenuProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const DropdownMenuRoot = ({ children }: { children: React.ReactNode }) => {
  return <radixDropdown.Root>{children}</radixDropdown.Root>;
};
const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  return <radixDropdown.Trigger>{children}</radixDropdown.Trigger>;
};

const DropdownMenuPortalContent = ({
  children,
  className,
}: DropdownMenuProps) => {
  return (
    <radixDropdown.Portal>
      <radixDropdown.Content
        className={cn(
          'bg-white outline-none rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] data-[side=bottom]:animate-slideUpAndFade',
          className
        )}
      >
        {children}
      </radixDropdown.Content>
    </radixDropdown.Portal>
  );
};

const DropdownMenuItem = ({
  children,
  className,
  onClick,
}: DropdownMenuProps) => {
  return (
    <radixDropdown.Item
      onSelect={onClick}
      className={cn(
        'min-h-12 outline-none flex items-center px-4 py-2 text-gray-800 text-sm hover:bg-gray-50 rounded-2xl transition-colors data-[highlighted]:bg-gray-50',
        className
      )}
    >
      {children}
    </radixDropdown.Item>
  );
};

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  PortalContent: DropdownMenuPortalContent,
  Item: DropdownMenuItem,
};
