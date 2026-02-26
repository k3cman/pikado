import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type { GameFormData } from "../types";

interface GameFormProps {
  mode: "501" | "cricket";
  control: Control<GameFormData>;
  register: UseFormRegister<GameFormData>;
  errors: FieldErrors<GameFormData>;
}

export const GameForm = ({ mode, control, register, errors }: GameFormProps) => {

    // const values = useWatch({control});

    // useEffect(() => {
    //     console.log(values);
    //     onFormChange(values);
    // }, [values, onFormChange]);

  return (
    <form className="w-full max-w-lg">
      <FieldGroup>
        {mode === "501" ? (
          <>
            <Field>
              <Label>Input Format</Label>
              <Controller
                name="inputFormat"
                control={control}
                rules={{ required: "Input format is required." }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="score">Score</SelectItem>
                      <SelectItem value="single">Single</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.inputFormat && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.inputFormat.message as string}
                </p>
              )}
            </Field>

            <Field>
              <Label>Start Score</Label>
              <Controller
                name="startScore"
                control={control}
                rules={{
                  required: "Start score is required.",
                  validate: (value) =>
                    value === "301" || value === "501" || value === "701"
                      ? true
                      : "Start score must be 301, 501 or 701.",
                }}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a start score" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="301">301</SelectItem>
                      <SelectItem value="501">501</SelectItem>
                      <SelectItem value="701">701</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.startScore && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.startScore.message as string}
                </p>
              )}
            </Field>
          </>
        ) : (
          <></>
        )}

        <div className="flex gap-4">
          <Field>
            <Label>Best of Legs</Label>
            <Input
              type="number"
              min={1}
              max={10}
              {...register("bestOfLegs", {
                required: "Best of legs is required.",
                valueAsNumber: true,
                min: { value: 1, message: "Must be at least 1." },
                max: { value: 10, message: "Must be at most 10." },
              })}
              defaultValue={3}
            />
            {errors.bestOfLegs && (
              <p className="mt-1 text-xs text-red-400">
                {errors.bestOfLegs.message as string}
              </p>
            )}
          </Field>
          <Field>
            <Label>Best of Sets</Label>
            <Input
              type="number"
              min={1}
              max={10}
              {...register("bestOfSets", {
                required: "Best of sets is required.",
                valueAsNumber: true,
                min: { value: 1, message: "Must be at least 1." },
                max: { value: 10, message: "Must be at most 10." },
              })}
              defaultValue={3}
            />
            {errors.bestOfSets && (
              <p className="mt-1 text-xs text-red-400">
                {errors.bestOfSets.message as string}
              </p>
            )}
          </Field>
        </div>
        <p className="mt-2 text-xs text-gray-400">
          Multi-leg and multi-set logic is not yet implemented – the game
          currently plays as a single leg.
        </p>
      </FieldGroup>
    </form>
  );
}