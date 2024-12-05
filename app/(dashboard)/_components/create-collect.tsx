"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Id } from "@/convex/_generated/dataModel";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
const formSchema = z.object({
  collectName: z.string().min(2).max(50),
  badge: z.string().min(2).max(15),
});

export const CreateCollect = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate: createCollect, pending } = useApiMutation(api.collect.create);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      collectName: "",
      badge: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    createCollect({
      collectName: values.collectName,
      badge: values.badge,
    }).then((collectId: Id<"collect">) => {
      setLoading(false);
      router.push(`/collect/${collectId}/collect-item`);
    });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="collectName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your Collect List name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="badge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Badge</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your badge.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {loading && <Loader2 className="animate-spin" />}
          Submit
        </Button>
      </form>
    </Form>
  );
};
