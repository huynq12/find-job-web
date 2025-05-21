"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
    resume: z.instanceof(File),
});

export function FormUploadMini({
    onUpload,
}: {
    onUpload: (resume: File | undefined) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            resume: undefined,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        onUpload(values.resume);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Resume</FormLabel>
                            <FormControl>
                                <Input
                                    id="resume"
                                    type="file"
                                    onChange={(e) =>
                                        field.onChange(e.target.files?.[0])
                                    }
                                />
                            </FormControl>
                            <FormDescription>
                                Upload your resume to find suitable jobs
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
