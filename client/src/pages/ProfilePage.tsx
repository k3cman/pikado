import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useUpdateUser, useUser } from "@/store/useAuthStore";
import { useForm } from "react-hook-form";

export default function ProfilePage() {
  const user = useUser();
  const updateUser = useUpdateUser();
  const { register, handleSubmit, reset } = useForm<{ displayName: string }>({
    values: {
      displayName: user?.user_metadata?.display_name ?? "",
    },
  });

  const onSubmit = async (data: { displayName: string }) => {
    const { error } = await updateUser({
      displayName: data.displayName,
    });
    if (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl text-center font-black text-gray-400 uppercase tracking-widest mb-4">
        Welcome{" "}
        {user?.user_metadata?.display_name
          ? user.user_metadata.display_name
          : user?.email}
      </h1>
      <Separator className="my-4" />
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <Label>Display Name</Label>
            <Input {...register("displayName")} type="text" />
          </Field>
        </FieldGroup>
        <Button variant="primary" type="submit" className="w-full mt-8">
          Update
        </Button>
      </form>
    </div>
  );
}
