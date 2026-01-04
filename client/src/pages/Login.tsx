import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignIn } from "@/store/useAuthStore";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const signIn = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    const { error, success } = await signIn(data.email, data.password);
    if (error) {
      console.error(error);
    }
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-black text-gray-400 uppercase tracking-widest mb-4">
        Sign In
      </h1>
      <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <Label>Email</Label>
            <Input type="email" {...register("email")} />
          </Field>
          <Field>
            <Label>Password</Label>
            <Input type="password" {...register("password")} />
          </Field>
        </FieldGroup>
        <Button variant="primary" type="submit" className="w-full mt-12">
          Sign In
        </Button>
      </form>
    </div>
  );
}
