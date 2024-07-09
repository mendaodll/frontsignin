
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import { Checkbox } from '../components/ui/checkbox'
import { Button } from '../components/ui/button'
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { socialMedia } from '../../data/index';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { registerFn } from '../../app/api';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const UserRegisterSchema = z.object({
    name: z.string()
        .min(3, 'Nome precisa de no mínimo três caracteres'),
    email: z.string()
        .email('Formato de e-mail inválido'),
    password: z.string()
        .min(6, 'a senha precisa ter no minimo 6 digitos'),
    confirmPassword: z.string()
        .min(6, 'a senha precisa ter no minimo 6 digitos'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'As senhas não são iguais',
        path: ['confirmPassword'],
    })
   
    type UserRegisterData = z.infer < typeof UserRegisterSchema >


const RegisterPage: React.FC = () => {
  
    const {
        register,
        handleSubmit,
        formState: {errors}
     } = useForm<UserRegisterData>({
        resolver:zodResolver(UserRegisterSchema),
    }
);

let navigate = useNavigate();
const [error, setError] = useState('');

    const createUser = async (data: UserRegisterData) => {
        try {
            const response = await registerFn(data.name, data.email, data.password)

            if(response.data.token) {
                localStorage.setItem('token:', response.data.token)
                navigate('/auth/login')
            }
        } catch (error) {
            setError('Preencha os campos corretamente')
            console.log('erro:', error);
        }
    }

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            <div className="flex flex-col justify-between h-screen">
                <div className="flex items-center justify-center py-12 flex-1">
                    <div className="mx-auto grid w-[350px] gap-6">
                        <div className="grid gap-2 text-center">
                            <h1 className="text-3xl font-bold">Cadastro</h1>
                            <p className="text-balance text-muted-foreground">
                                Insira suas credenciais para criar sua conta.
                            </p>
                        </div>
                        <form className="grid gap-4" onSubmit={handleSubmit(createUser)}>
                            <div className="grid gap-2">
                                <Label htmlFor="name">Nome</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Nome Completo"
                                    {...register('name')}
                                />
                                {errors.name &&
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {errors.name.message}
                                        </AlertDescription>
                                    </Alert>
                                }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Nome@exemplo.com"
                                    {...register('email')}
                                />
                                {errors.email &&
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle className='font-medium'>Error</AlertTitle>
                                        <AlertDescription>
                                            {errors.email.message}
                                        </AlertDescription>
                                    </Alert>
                                }
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Senha</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder='Senha'
                                    {...register('password')}
                                />
                                {errors.password &&
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle className='font-medium'>Error</AlertTitle>
                                        <AlertDescription>
                                            {errors.password.message}
                                        </AlertDescription>
                                    </Alert>
                                }
                                <div className="grid gap-2">
                                    <Label htmlFor="confirmPassword">Confirmação de Senha</Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Confirme sua senha"
                                        {...register('confirmPassword')}
                                    />
                                    {errors.confirmPassword &&
                                    <Alert variant="destructive">
                                        <ExclamationTriangleIcon className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        <AlertDescription>
                                            {errors.confirmPassword.message}
                                        </AlertDescription>
                                    </Alert>
                                    }
                                </div>
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
                            <Button type="submit" className="w-full mt-1">
                                Cadastrar
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            Já possui uma conta?{" "}
                            <a href='/auth/login' className="underline">
                                Entre por aqui.
                            </a>
                        </div>
                        <div className="flex text-center text-sm">
                            <Checkbox className='mt-[3px]' />
                            <p>Ao marcar esta opção você concorda com os Termos de Uso e Política de Privacidade.</p>
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

            <div className="hidden lg:block lg:min-h-screen">
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

}

export default RegisterPage;
