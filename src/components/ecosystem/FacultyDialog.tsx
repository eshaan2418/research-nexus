import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { Faculty } from "@/data/faculty";

interface FacultyDialogProps {
  faculty: Faculty | null;
  onOpenChange: (open: boolean) => void;
}

export function FacultyDialog({ faculty, onOpenChange }: FacultyDialogProps) {
  const open = !!faculty;
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-[950px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl bg-white shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">
            {faculty ? `${faculty.name} — profile` : "Faculty profile"}
          </DialogPrimitive.Title>
          {faculty && (
            <img
              src={faculty.profileImage}
              alt={`${faculty.name} profile`}
              className="block h-auto w-full select-none"
              draggable={false}
            />
          )}
          <DialogPrimitive.Close
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[color:var(--ecosystem-ink)] shadow-md ring-1 ring-black/10 transition hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
