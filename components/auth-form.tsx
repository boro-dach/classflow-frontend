"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import axios from 'axios'
import { setCookie } from 'cookies-next'

const AuthForm = () => {

  const [authType, setAuthType] = useState<'register' | 'login'>('register')
  const [role, setRole] = useState<'student' | 'teacher'>('student')

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [surname, setSurname] = useState<string>('')

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (authType === 'register') {
      try {
        const response = await axios.post(
          `http://localhost:5000/auth/register-${role}`,
          {
            email,
            password,
            name,
            surname
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        setSuccess(`Регистрация успешна! Токен: ${response.data.token}`);
        setCookie("token", response.data.token, {
          maxAge: 60 * 60 * 24 * 7, // 7 дней
          path: "/",
          secure: process.env.NODE_ENV === "production", // Только HTTPS в продакшене
          httpOnly: false,
        });
      } catch (err) {
        setError("Ошибка при регистрации. Проверьте данные.");
      } finally {
        setLoading(false);
      }
    }
    else {
      try {
        const response = await axios.post(
          `http://localhost:5000/auth/login-${role}`,
          {
            email,
            password
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        setSuccess(`Вход успешен! Токен: ${response.data.token}`);
        setCookie("token", response.data.token, {
          maxAge: 60 * 60 * 24 * 7, // 7 дней
          path: "/",
          secure: process.env.NODE_ENV === "production", // Только HTTPS в продакшене
          httpOnly: false,
        });
      } catch (err) {
        setError("Ошибка при входе. Проверьте данные.");
      } finally {
        setLoading(false);
      }
    }
  }

  function handleRoleChange (role: string, e: any) {
    e.preventDefault();
    if (role === 'student') {
      setRole('teacher')
    }
    else {
      setRole('student')
    }
  }

  function handleAuthType (authType: string) {
    if (authType === 'register') {
      setAuthType('login');
    }
    else {
      setAuthType('register')
    }
  }

  return (
    <div className="flex flex-col gap-6 lg: mx-16">
    <Card className="border-none">
      <CardHeader>
        <CardTitle className="text-2xl">{authType.charAt(0).toUpperCase() + authType.slice(1)}</CardTitle>
        <CardDescription>
          Enter your credentials below to {authType === 'register' ? 'register' : 'log in to'} your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                className='rounded-xl'
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                className='rounded-xl'
                id="password" 
                type="password" 
                required
                onChange={(e) => {setPassword(e.target.value)}}
              />
            </div>
            <div className={`grid gap-2 ${authType === 'login' ? 'hidden' : ''}`}>
              <Label htmlFor="name">Name</Label>
              <Input
                className='rounded-xl'
                id="name"
                type="text"
                placeholder="Alexandr"
                required
                onChange={(e) => {setName(e.target.value)}}
              />
            </div>
            <div className={`grid gap-2 ${authType === 'login' ? 'hidden' : ''}`}>
              <Label htmlFor="surname">Surname</Label>
              <Input
                className='rounded-xl'
                id="surname"
                type="text"
                placeholder="Pushkin"
                required
                onChange={(e) => {setSurname(e.target.value)}}
              />
            </div>
            <div className={`grid grid-cols-2 gap-2 ${authType === 'login' ? 'hidden' : ''}`}>
              <Button 
                variant={'outline'}
                className={`transition-all duration-300 rounded-xl bg-zinc-950 text-white py-8  ${role === 'student' ? 'border-white border-2' : ''}`}
                type='button'
                onClick={(e) => handleRoleChange(role, e)}
                
              >
                I'm a student
              </Button>
              <Button 
                variant={'outline'}
                className={`transition-all duration-300 rounded-xl bg-zinc-950 text-white py-8  ${role === 'teacher' ? 'border-white border-2' : ''}`}
                type='button'
                onClick={(e) => handleRoleChange(role, e)}
                
              >
                I'm a teacher
              </Button>
            </div>
            <Button type="submit" className="w-full rounded-xl" onClick={handleSubmit}>
              {authType.charAt(0).toUpperCase() + authType.slice(1)}
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            {authType === 'login' ? "Don't have an account?" : 'Already have an account?'}
            {" "}
            <a 
            href="#" 
            className="underline underline-offset-4"
            onClick={() => {handleAuthType(authType)}}
            >
              {authType === 'register' ? 'Log in' : 'Sign up'}
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
  )
}

export default AuthForm