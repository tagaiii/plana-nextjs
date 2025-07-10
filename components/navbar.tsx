'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { AuthTabs } from '@/app/auth/types';
import Link from 'next/link';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { logout } from '@/app/auth/actions';
import type { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function Navbar({ user }: { user: User | null }) {
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await logout();
    if (error) {
      console.error('Error during signing out:', error);
    }
    toast.success('You have signed out successfully!', {
      duration: 3000,
      action: {
        label: 'Close',
        onClick: () => toast.dismiss(),
      },
    });
    router.refresh();
  };

  return (
    <div className="m-auto flex justify-end p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Account</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-max">
                {user ? (
                  <>
                    <li>
                      <NavigationMenuLink className="p-0">
                        <Button onClick={handleSignOut} variant="ghost">
                          Sign out
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavigationMenuLink asChild className="p-0">
                        <Link
                          href={`/auth?tab=${AuthTabs.LOGIN}`}
                          className="font-medium px-4 py-2"
                        >
                          Login
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild className="p-0">
                        <Link
                          href={`/auth?tab=${AuthTabs.SIGNUP}`}
                          className="font-medium px-4 py-2"
                        >
                          Sign up
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </>
                )}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
