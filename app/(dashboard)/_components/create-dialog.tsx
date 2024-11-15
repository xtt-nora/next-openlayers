"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { CreateForm } from "./createForm";
export const CreateDialog = () => {
  const { mutate, pending } = useApiMutation(api.map.create);
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
            <DialogTitle>Create Map</DialogTitle>
            <DialogDescription>Do you want to create new map?</DialogDescription>
          </DialogHeader>
          <CreateForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
