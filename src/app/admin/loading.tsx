import { Spinner } from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="w-full h-full bg-zinc-100">
      <Spinner />
    </div>
  );
}
