import { Label } from "@/components/ui/Form/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";

export function RadioSizes() {
  return (
    <RadioGroup defaultValue="1" className="grid grid-cols-4 gap-4">
      <Label
        htmlFor="S"
        className="flex flex-col text-zinc-300 items-center justify-between rounded-md cursor-pointer border-2 border-zinc-300 bg-transparent p-4 hover:bg-zinc-100 hover:text-zinc-400  [&:has([data-state=checked])]:border-zinc-900 [&:has([data-state=checked])]:text-zinc-900"
      >
        <RadioGroupItem value="1" id="S" className="sr-only" />S
      </Label>
      <Label
        htmlFor="M"
        className="flex flex-col text-zinc-300 items-center justify-between rounded-md cursor-pointer border-2 border-zinc-300 bg-transparent p-4 hover:bg-zinc-100 hover:text-zinc-400  [&:has([data-state=checked])]:border-zinc-900 [&:has([data-state=checked])]:text-zinc-900"
      >
        <RadioGroupItem value="2" id="M" className="sr-only" />M
      </Label>
      <Label
        htmlFor="X"
        className="flex flex-col text-zinc-300 items-center justify-between rounded-md cursor-pointer border-2 border-zinc-300 bg-transparent p-4 hover:bg-zinc-100 hover:text-zinc-400  [&:has([data-state=checked])]:border-zinc-900 [&:has([data-state=checked])]:text-zinc-900"
      >
        <RadioGroupItem value="3" id="X" className="sr-only" />X
      </Label>
      <Label
        htmlFor="XL"
        className="flex flex-col text-zinc-300 items-center justify-between rounded-md cursor-pointer border-2 border-zinc-300 bg-transparent p-4 hover:bg-zinc-100 hover:text-zinc-400  [&:has([data-state=checked])]:border-zinc-900 [&:has([data-state=checked])]:text-zinc-900"
      >
        <RadioGroupItem value="4" id="XL" className="sr-only" />
        XL
      </Label>
    </RadioGroup>
  );
}
