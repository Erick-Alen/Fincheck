import React from 'react';
import * as RdxPopover from '@radix-ui/react-popover';
import { cn } from '@/app/utils/cn';

type PopoverContentProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const PopoverRoot = ({ children }: { children: React.ReactNode }) => {
  return <RdxPopover.Root>{children}</RdxPopover.Root>;
};
const
  PopoverTrigger = ({ children }: { children: React.ReactNode }) => {
  return (
    <RdxPopover.Trigger className='outline-none' asChild>
      {children}
    </RdxPopover.Trigger>
  );
};

const PopoverContent = ({ children, className }: PopoverContentProps) => {
  return (
    <RdxPopover.Portal>
      <RdxPopover.Content
        className={cn(
          'bg-white outline-none rounded-xl space-y-1 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-50',
          'data-[side=bottom]:animate-slideUpAndFade data-[side=top]:animate-slideDownAndFade ',
          className
        )}
      >
        {children}
      </RdxPopover.Content>
    </RdxPopover.Portal>
  );
};

// export const Popover = () => (
//   <RdxPopoverRoot>
//     <RdxPopoverTrigger>
//       <button
//         className='rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-violet11 bg-white shadow-[0_2px_10px] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black cursor-default outline-none'
//         aria-label='Update dimensions'
//       >
//         <MixerHorizontalIcon />
//       </button>
//     </RdxPopoverTrigger>
//       <PopoverContent
//         className='rounded p-5 w-[260px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade'
//         sideOffset={5}
//       >
//         <div className='flex flex-col gap-2.5'>
//           <p className='text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5'>
//             Dimensions
//           </p>
//           <fieldset className='flex gap-5 items-center'>
//             <label
//               className='text-[13px] text-violet11 w-[75px]'
//               htmlFor='width'
//             >
//               Width
//             </label>
//             <input
//               className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
//               id='width'
//               defaultValue='100%'
//             />
//           </fieldset>
//           <fieldset className='flex gap-5 items-center'>
//             <label
//               className='text-[13px] text-violet11 w-[75px]'
//               htmlFor='maxWidth'
//             >
//               Max. width
//             </label>
//             <input
//               className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
//               id='maxWidth'
//               defaultValue='300px'
//             />
//           </fieldset>
//           <fieldset className='flex gap-5 items-center'>
//             <label
//               className='text-[13px] text-violet11 w-[75px]'
//               htmlFor='height'
//             >
//               Height
//             </label>
//             <input
//               className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
//               id='height'
//               defaultValue='25px'
//             />
//           </fieldset>
//           <fieldset className='flex gap-5 items-center'>
//             <label
//               className='text-[13px] text-violet11 w-[75px]'
//               htmlFor='maxHeight'
//             >
//               Max. height
//             </label>
//             <input
//               className='w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none'
//               id='maxHeight'
//               defaultValue='none'
//             />
//           </fieldset>
//         </div>
//         <RdxPopover.Close
//           className='rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 outline-none cursor-default'
//           aria-label='Close'
//         >
//           <Cross2Icon />
//         </RdxPopover.Close>
//         <RdxPopover.Arrow className='fill-white' />
//       </PopoverContent>
//   </RdxPopoverRoot>
// );


export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Content: PopoverContent,
}
