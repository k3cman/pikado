import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useAddPlayer } from "./store/usePlayersStore";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export const AddPlayerPage = () => {
  const addPlayer = useAddPlayer();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{ name: string }>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = (data: { name: string }) => {
    addPlayer(data.name);
    navigate("/players");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-8">
        Add player
      </h1>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <Label>Name</Label>
            <Input {...register("name")} type="text" />
          </Field>
        </FieldGroup>
        <Button variant="primary" type="submit" className="w-full mt-8">
          Add
        </Button>
      </form>
    </div>
  );
};
