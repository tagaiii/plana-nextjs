'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from './components/login-form';
import SignupForm from './components/signup-form';
import { AuthTabs } from './types';

function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || AuthTabs.LOGIN;

  const changeTab = (value: AuthTabs) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);
    router.push(`/auth?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={currentTab} className="w-[400px] m-auto mt-10">
      <TabsList className="w-full">
        <TabsTrigger
          value={AuthTabs.LOGIN}
          onClick={() => changeTab(AuthTabs.LOGIN)}
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value={AuthTabs.SIGNUP}
          onClick={() => changeTab(AuthTabs.SIGNUP)}
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value={AuthTabs.LOGIN}>
        <LoginForm />
      </TabsContent>
      <TabsContent value={AuthTabs.SIGNUP}>
        <SignupForm />
      </TabsContent>
    </Tabs>
  );
}

export default AuthPage;
