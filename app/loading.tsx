import { LoadingBlock } from "@/components/ui/LoadingBlock";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
      <LoadingBlock label="Loading PRISM page" />
    </div>
  );
}
