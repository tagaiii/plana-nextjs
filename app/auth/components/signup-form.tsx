'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useActionState, useEffect } from 'react';
import { signup } from '../actions';
import { ActionState } from '../types';

const initialState: ActionState = {
  success: false,
  error: '',
};

export default function SignupForm() {
  const [state, formAction] = useActionState(signup, initialState);

  useEffect(() => {
    if (state.success) {
      window.location.href = '/';
    }
  }, [state]);

  return (
    <form action={formAction}>
      <div className="space-y-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" name="email" required />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" name="password" required />
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <Input
            id="confirm-password"
            type="password"
            name="confirm-password"
            required
          />
        </div>
      </div>
      <Button type="submit" className="mt-4 w-full">
        Sign Up
      </Button>
      {state.error && <p className="text-red-500 mt-2">{state.error}</p>}
    </form>
  );
}
