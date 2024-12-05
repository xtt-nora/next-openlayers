"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { CreateForm } from "./createForm";
import { CreateCollect } from "./create-collect";
import { ComponentType } from "react";
interface Props {
  value: string;
}
type valueReflex = {
  [key: string]: {
    str: string;
    component: ComponentType;
  };
};
export const CreateDialog = ({ value }: Props) => {
  const { mutate, pending } = useApiMutation(api.map.create);
  const valueName: valueReflex = {
    我的地图: { str: "Create Map", component: CreateForm },
    收藏: { str: "Create Collect List", component: CreateCollect },
    足迹: { str: "Create Footer List", component: CreateCollect },
  };
  const SelectedComponent = valueName[value].component;
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" className="bg-[#2383E2] h-8">
            <Plus />
            New
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{valueName[value].str}</DialogTitle>
            <DialogDescription>Do you want to {valueName[value].str}?</DialogDescription>
          </DialogHeader>
          <SelectedComponent />
        </DialogContent>
      </Dialog>
    </div>
  );
};
