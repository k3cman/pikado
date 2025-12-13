import { Field, FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const GameForm = ({mode}: {mode: '501' | 'cricket'}) => {
    return (
        <form className="w-full max-w-lg">
            <FieldGroup>
                {mode === '501' ? 
            (<>
            <Field>
                <Label>Input Format</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a format" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="score">Score</SelectItem>
                        <SelectItem value="single">Single</SelectItem>
                    </SelectContent>
                </Select>
            </Field>
            
            <Field>
                <Label>Start Score</Label>
                <Select defaultValue="501">
                    <SelectTrigger>
                        <SelectValue placeholder="Select a start score" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="301">301</SelectItem>
                        <SelectItem value="501">501</SelectItem>
                        <SelectItem value="701">701</SelectItem>
                    </SelectContent>
                </Select>
            </Field>
            </>
        ) : (
            <></>
        )    
            }

            <div className="flex gap-4">
                    <Field>
                        <Label>Best of Legs</Label>
                        <Input type="number" min={1} max={10} defaultValue={3} />
                    </Field>
                    <Field>
                        <Label>Best of Sets</Label>
                        <Input type="number" min={1} max={10} defaultValue={3} />
                    </Field>
            </div>
            </FieldGroup>
        </form>
    )
}