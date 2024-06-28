
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import  {socialMedia} from '../../data/index'
import { Button } from '../components/ui/button'
import React, { useState } from 'react';
import { login } from '../../app/api'
import { useNavigate } from 'react-router-dom';
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { GoogleLogin } from '@react-oauth/google';

const LoginPage: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await login(email, password);
      if (response.data.sucess) {
        localStorage.setItem('token:', response.data.token);
      }
      navigate("/auth/user");
    } catch (error) {
      console.log('Login failed:', error);
      setError('Usuário ou senha inválidos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex flex-col justify-between h-screen">
        <div className="flex flex-wrap items-center justify-center py-12 flex-1">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Entre com o seu email para logar na sua conta.
              </p>
            </div>
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Nome@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <a
                    href="/"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
              {error && (
                <div className="grid gap-2">
                  <Alert variant="destructive">
                    <ExclamationTriangleIcon className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                </div>
              )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                Entrar
              </Button>
              <GoogleLogin
                width='400px'
                height='36px'
                logo_alignment='center'
                onSuccess={() => (
                  navigate('/auth/user')
                )}
                onError={() => {
                  console.log('Login Failed');
                }}
              />
            </form>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{" "}
              <a href='/auth/register' className="underline">
                Crie uma
              </a>
            </div>
          </div>
        </div>

        <footer className="w-full p-6">
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <p className='md:text-base text-sm md:font-normal font-light'>Copyright © 2024 Lucas Mendes</p>
            <div className='flex items-center md:gap-3 gap-6'>
              {socialMedia.map((profile) => (
                <div key={profile.id} className='w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-full border border-black-300 mt-6 md:mt-0'>
                  <a href={profile.link} target='_blank'>
                    <img
                      src={profile.img}
                      alt={profile.des}
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </footer>
      </div>

      <div className="hidden lg:flex lg:min-h-screen">
        <img
          src='/loginImg.svg'
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
};

export default LoginPage;