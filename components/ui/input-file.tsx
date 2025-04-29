import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface InputFileLabel {
    label: string;
    description: string;
}

export function InputFile({ label, description }: InputFileLabel) {
    return (
        <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="file-input">{label}</Label>
            <Input id="file-input" type="file" />
            <p>{description}</p>
        </div>
    );
}
