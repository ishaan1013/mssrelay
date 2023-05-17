import * as Toast from "@radix-ui/react-toast";

export default function Notification({
  toasted,
  setToasted,
  message,
}: {
  toasted: boolean;
  setToasted: (toasted: boolean) => void;
  message: string;
}) {
  return (
    <>
      <Toast.Root
        className="bg-neutral-800 border border-neutral-700 flex-col rounded-lg py-3 flex items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=end]:animate-swipeOut"
        open={toasted}
        onOpenChange={setToasted}
      >
        <Toast.Title className=" mb-1 font-semibold">{message}</Toast.Title>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-2 pb-4 gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </>
  );
}
