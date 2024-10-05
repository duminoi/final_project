import { Button } from "@mui/material";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="mx-[5rem] flex justify-center items-center flex-col">
      <Button>
        <Link href={"/admin/product"}>Product</Link>
      </Button>

      <Button>
        <Link className="mt-5" href={"/admin/category"}>
          Category
        </Link>
      </Button>
    </div>
  );
}
