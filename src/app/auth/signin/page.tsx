'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import ButtonForm from '@/components/Form/ButtonForm';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { LoginFormData, loginSchema } from '@/schema/login.schema';


 export default function  LoginPage() {

      const searchParams = useSearchParams();

      const isErrorLogin = searchParams.get('error');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: true,
      callbackUrl: '/',
    });
  };

  return (
    <div className=" h-[90lvh] flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="px-7 py-4 pb-8 shadow bg-gray-100 rounded-md flex flex-col gap-2 w-[80%]">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-2xl font-bold">Sign in</h1>
          <p className="text-sm text-gray-600">Sign in to access your account</p>
        </div>

        <div className="space-y-4">
          {!!isErrorLogin && (
            <div className="bg-red-100 border border-red-500 rounded pt-1 pb-2 px-3 text-red-500 text-sm">
              <span>Email or Password is wrong</span>
            </div>
          )}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm">
              Email address
            </label>
            <input type="email" {...register('email')} name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input type="password" {...register('password')} name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-50 text-gray-800" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <ButtonForm type="submit" className="m-0 w-full lg:w-full lg:!px-5 bg-[var(--primary-color)]" label="Sign in" />
        </div>
      </form>
    </div>
  );
};

