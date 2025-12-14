import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Controller, type Control, type UseFormRegister } from "react-hook-form"
import type { GameFormData } from "../types"



export const GameForm = ({mode, control, register}: {mode: '501' | 'cricket', control: Control<GameFormData>, register: UseFormRegister<GameFormData>}) => {
    

    // const values = useWatch({control});

    // useEffect(() => {
    //     console.log(values);
    //     onFormChange(values);
    // }, [values, onFormChange]);

    return (
        <form className="w-full max-w-lg">
            <FieldGroup>
                {mode === '501' ? 
            (<>
            <Field>
                <Label>Input Format</Label>
                <Controller
                    name="inputFormat"
                    control={control}
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
            </Field>
            
            <Field>
                <Label>Start Score</Label>
                <Controller
                    name="startScore"
                    control={control}
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
            </Field>
            </>
        ) : (
            <></>
        )    
            }

            <div className="flex gap-4">
                    <Field>
                        <Label>Best of Legs</Label>
                        <Input type="number" min={1} max={10} {...register("bestOfLegs")} defaultValue={3} />
                    </Field>
                    <Field>
                        <Label>Best of Sets</Label>
                        <Input type="number" min={1} max={10} {...register("bestOfSets")} defaultValue={3} />
                    </Field>
            </div>
            </FieldGroup>
        </form>
    )
}