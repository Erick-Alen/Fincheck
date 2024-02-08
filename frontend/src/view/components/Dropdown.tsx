import { cn } from '@/app/utils/cn';
import * as RadixDropdown from '@radix-ui/react-dropdown-menu';

type DropdownMenuProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const DropdownMenuRoot = ({ children }: { children: React.ReactNode }) => {
  return <RadixDropdown.Root>{children}</RadixDropdown.Root>;
};
const DropdownMenuTrigger = ({ children }: { children: React.ReactNode }) => {
  return <RadixDropdown.Trigger className='outline-none' asChild>{children}</RadixDropdown.Trigger>;
};

const DropdownMenuPortalContent = ({
  children,
  className,
}: DropdownMenuProps) => {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        className={cn(
          'bg-white outline-none rounded-xl space-y-1 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50',
          'data-[side=bottom]:animate-slideUpAndFade data-[side=top]:animate-slideDownAndFade ',
          className
        )}
      >
        {children}
      </RadixDropdown.Content>
    </RadixDropdown.Portal>
  );
};

const DropdownMenuItem = ({
  children,
  className,
  onClick,
}: DropdownMenuProps) => {
  return (
    <RadixDropdown.Item
      onSelect={onClick}
      className={cn(
        'min-h-10 outline-none cursor-pointer flex items-center px-4 py-2 text-gray-800 text-sm hover:bg-gray-50 rounded-xl transition-colors data-[highlighted]:bg-gray-50',
        className
      )}
    >
      {children}
    </RadixDropdown.Item>
  );
};

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  PortalContent: DropdownMenuPortalContent,
  Item: DropdownMenuItem,
};
