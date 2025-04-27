"use client";

import React from "react";
import { registerSchema } from "../model/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { UserRoles } from "../../model/enums";
import Link from "next/link";
import { register } from "../api/register";

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      login: "",
      password: "",
      age: 0,
      parentCode: "",
      role: UserRoles.STUDENT,
    },
  });

  function onSubmit(data: z.infer<typeof registerSchema>) {
    console.log(register(data));
  }

  return (
    <Form {...form}>
      <h3 className="text-2xl font-bold">Register</h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>Your first name</FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} />
              </FormControl>
              <FormDescription>Your last name</FormDescription>
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
                <Input type="email" placeholder="example@mail.com" {...field} />
              </FormControl>
              <FormDescription>Your email</FormDescription>
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
              <FormDescription>
                Unique username you will use for logging in
              </FormDescription>
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
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Your age</FormDescription>
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
        {form.watch("role") === UserRoles.STUDENT && form.watch("age") < 18 && (
          <FormField
            control={form.control}
            name="parentCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent code</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Minors have to provide parent code for registration
                </FormDescription>
              </FormItem>
            )}
          />
        )}
        <Button className="mt-2 cursor-pointer" type="submit">
          Register
        </Button>
      </form>
      <div className="flex gap-1 mt-4">
        <p>Already have an account?</p>
        <Link className="underline" href={"/auth/login"}>
          Log in
        </Link>
      </div>
    </Form>
  );
};

export default RegisterForm;
