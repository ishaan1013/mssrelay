import * as Dialog from "@radix-ui/react-dialog";
import { QrScanner } from "@yudiel/react-qr-scanner";
import codes from "../utils/codes";

export default function ScannerModal({
  open,
  setOpen,
  scanned,
  onSuccess,
  cams,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  scanned: number;
  onSuccess: () => void;
  cams: object[];
}) {
  const code = codes[scanned % 4];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-screen-xs translate-x-[-50%] translate-y-[-50%] rounded-lg overflow-hidden bg-neutral-900 focus:outline-none">
          {cams.length > 0 ? (
            <QrScanner
              onDecode={(result) => {
                if (result === code) {
                  onSuccess();
                }
              }}
              onError={(error) => console.log(error?.message)}
            />
          ) : (
            <div className="p-8 text-lg !leading-6 font-medium text-red-600">
              No camera device found / permissions not granted.
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
