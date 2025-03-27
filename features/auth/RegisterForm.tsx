"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerStudent } from "@/entities/auth/api/register";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const registerSchema = z.object({
  name: z.string(),
  surname: z.string(),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  age: z.coerce.number().min(1, "Age must be a positive number"),
});

const RegisterForm = () => {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      age: 0,
    },
  });

  async function handleSubmit(values: z.infer<typeof registerSchema>) {
    try {
      const responseData = await registerStudent(values);
      console.log("Успешная регистрация", responseData);
    } catch (err) {
      console.error("Ошибка при регистрации (в компоненте)", err);
    }
  }

  return (
    <main>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-4 mt-8 mx-16"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Surname" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email" type="email" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Age" {...field} />
                  </FormControl>
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="cursor-pointer">
            Register
          </Button>
        </form>
      </Form>
    </main>
  );
};

export default RegisterForm;
