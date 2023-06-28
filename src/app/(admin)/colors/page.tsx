import { Suspense } from "react";
import { columns } from "./components/columns";
import { LoadingLogo } from "@client/components/ui/LoadingLogo";
import { DataTable } from "./components/DataTable";
import { Color } from "@/client/model/color";
import { colorActions } from "@/client/actions/colorAction";


export default async function Colors() {
  const colors = await colorActions.get()

  return (
    <div className="container mx-auto sm:max-w-2xl">
      <Suspense fallback={<LoadingLogo />}>
        <DataTable columns={columns} data={colors} />
      </Suspense>
    </div>
  );
}
