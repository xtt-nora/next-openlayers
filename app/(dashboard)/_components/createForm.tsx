import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
// import { auth } from "@clerk/nextjs/server";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { generateUploadUrl } from "@/convex/mapMedia";
import { useMutation } from "convex/react";

export const CreateForm = () => {
  const generateUploadUrl = useMutation(api.mapMedia.generateUploadUrl);
  const router = useRouter();
  const { mutate, pending } = useApiMutation(api.map.create);
  const { mutate: setImage, pending: imagePending } = useApiMutation(api.mapMedia.sendImage);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const FormSchema = z.object({
    title: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    description: z.string(),
    bgImg: z.string(),
    badge: z.string().min(2, {
      message: "badge must be at least 2 characters.",
    }),
    isLocked: z.boolean().default(false).optional(),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      description: "",
      bgImg: "",
      badge: "",
      isLocked: false,
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedImage!.type },
      body: selectedImage,
    });
    const { storageId } = await result.json();
    const mediaId = await setImage({ storageId, format: "image", userId: "j57fr3sdx1e2t2acp7c3ecypm5741nam" });
    console.log(mediaId, "mediaId");

    mutate({
      title: data.title,
      description: data.description,
      bgImg: mediaId,
      badge: data.badge,
      isLocked: data.isLocked,
      img: "https://github.com/shadcn.png",
      userId: "j57fr3sdx1e2t2acp7c3ecypm5741nam",
    })
      .then((mapId: Id<"map">) => {
        toast.info("Gig created successfully");
        router.push(`/map/${mapId}/map-item`);
      })
      .catch(() => {
        toast.error("Failed to create gig");
      });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MapName</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MapDesp</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bgImg"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picture</FormLabel>
              <FormControl>
                <Input
                  id="picture"
                  type="file"
                  placeholder="请选择照片"
                  {...field}
                  onChange={(event) => setSelectedImage(event.target.files![0])}
                />
              </FormControl>
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
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isLocked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Locked</FormLabel>
              <FormControl>
                <Switch checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
