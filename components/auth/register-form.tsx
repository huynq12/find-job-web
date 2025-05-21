"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z
    .object({
        username: z.string().min(4, {
            message: "Please enter username that has at least 4 characters.",
        }),
        fullname: z.string().min(1, { message: "Please enter fullname." }),
        email: z.string(),
        phone_number: z.string(),
        password: z
            .string()
            .min(6, { message: "Password has at least 6 characters." }),
        confirm_password: z.string(),
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match.",
        path: ["confirm_password"],
    });

export function FormRegister({
    submit,
}: {
    submit: (
        username: string,
        fullname: string,
        email: string,
        phone_number: string,
        password: string,
        confirm_password: string
    ) => void;
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            fullname: "",
            email: "",
            phone_number: "",
            password: "",
            confirm_password: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        submit(
            values.username,
            values.fullname,
            values.email,
            values.phone_number,
            values.password,
            values.confirm_password
        );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                You can type company name or job title.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fullname</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                You can type company name or job title.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                You can type company name or job title.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phone_number"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone number</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                You can type company name or job title.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                You can type company name or job title.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirm_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                You can type company name or job title.
                            </FormDescription> */}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
}
