import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function ResetModal({
  open,
  setOpen,
  confirmReset,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  confirmReset: () => void;
}) {
  return (
    <AlertDialog.Root open={open} onOpenChange={setOpen}>
      <AlertDialog.Trigger />
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/70" />
        <AlertDialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-screen-xs translate-x-[-50%] translate-y-[-50%] flex flex-col items-center p-4 rounded-lg overflow-hidden bg-neutral-900 focus:outline-none">
          <AlertDialog.Title>
            <div className="text-lg font-semibold mb-1">Are you sure?</div>
          </AlertDialog.Title>
          <AlertDialog.Description>
            <div className="font-medium opacity-75">
              Your progress will be permanently lost.
            </div>
          </AlertDialog.Description>
          <div className="mt-5 w-full flex justify-between space-x-2">
            <AlertDialog.Cancel className="w-full">
              <button className="w-full p-2 rounded-lg bg-neutral-800 border border-neutral-700">
                Cancel
              </button>
            </AlertDialog.Cancel>
            <AlertDialog.Action className="w-full">
              <button
                onClick={confirmReset}
                className="w-full p-2 rounded-lg bg-neutral-700 border border-neutral-600"
              >
                OK
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
