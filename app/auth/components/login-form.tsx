'use client';

import { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { login } from '../actions';
import { ActionState } from '../types';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const initialState: ActionState = {
  success: false,
  error: '',
};

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: 'Email is required',
    password: 'Password is required',
  });
  const router = useRouter();

  const checkErrors = () => {
    return Object.values(errors).some((error) => error);
  };

  const validate = (name: string, value: string) => {
    let error = '';
    if (name === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) {
        error = 'Email is required';
      } else if (!emailPattern.test(value)) {
        error = 'Invalid email format';
      }
    } else if (name === 'password') {
      if (!value) {
        error = 'Password is required';
      } else if (value.length < 6) {
        error = 'Password must be at least 6 characters';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    validate(name, value);
  };

  useEffect(() => {
    if (state.success) {
      toast.success('You have logged in successfully!', {
        duration: 3000,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
      router.push('/');
    }
  }, [router, state]);

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
          />
          {touched.email && errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            required
            onChange={handleChange}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          />
          {touched.password && errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={isPending || checkErrors()}
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : null}
        Login
      </Button>
      {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
    </form>
  );
}
