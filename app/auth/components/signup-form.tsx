'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect, useState } from 'react';
import { signup } from '../actions';
import { ActionState } from '../types';
import { useRouter } from 'next/navigation';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

const initialState: ActionState = {
  success: false,
  error: '',
};

export default function SignupForm() {
  const [state, formAction, isPending] = useActionState(signup, initialState);
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false,
    'confirm-password': false,
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    'confirm-password'?: string;
  }>({});
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      toast.success('You have signed up successfully!', {
        description: 'Please check your email to verify your account.',
        duration: 6000,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(),
        },
      });
      router.push('/');
    }
  }, [router, state]);

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
    } else if (name === 'confirm-password') {
      if (!value) {
        error = 'Confirm password is required';
      } else if (value !== password) {
        error = 'Passwords do not match';
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    }
    validate(name, value);
  };

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
        {password && !errors.password && (
          <div className="flex flex-col gap-3">
            <Label htmlFor="confirm-password">Confirm password</Label>
            <Input
              id="confirm-password"
              type="password"
              name="confirm-password"
              required
              onChange={handleChange}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, 'confirm-password': true }))
              }
            />
            {touched['confirm-password'] && errors['confirm-password'] && (
              <p className="text-red-500 text-sm">
                {errors['confirm-password']}
              </p>
            )}
          </div>
        )}
      </div>
      <Button
        type="submit"
        className="mt-4 w-full"
        disabled={isPending || !!errors}
      >
        {isPending ? <LoaderCircle className="animate-spin" /> : null}
        Sign Up
      </Button>
      {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
    </form>
  );
}
