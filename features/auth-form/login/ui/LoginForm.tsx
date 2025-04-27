"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "../model/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRoles } from "../../model/enums";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Button } from "@/shared/ui/button";
import Link from "next/link";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      login: "",
      password: "",
      role: UserRoles.STUDENT,
    },
  });

  function onSubmit(data: z.infer<typeof loginSchema>) {
    console.log("data", data);
  }

  return (
    <Form {...form}>
      <h3 className="text-2xl font-bold">Log in</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormDescription>Your email address</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="login"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Login</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your unique username</FormDescription>
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
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your strong password</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={UserRoles.STUDENT}>Student</SelectItem>
                  <SelectItem value={UserRoles.TEACHER}>Teacher</SelectItem>
                  <SelectItem value={UserRoles.PARENT}>Parent</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Your role</FormDescription>
            </FormItem>
          )}
        />
        <Button className="mt-2 cursor-pointer" type="submit">
          Log in
        </Button>
      </form>
      <div className="flex gap-1 mt-4">
        <p>Don't have an account?</p>
        <Link className="underline" href={"/auth/register"}>
          Register
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;
