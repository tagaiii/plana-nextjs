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
import { useSupabaseUser } from '@/hooks/useSupabaseUser';

export default function Navbar() {
  const { user, handleSignOut } = useSupabaseUser();

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
                        <Button
                          onClick={handleSignOut}
                          variant="ghost"
                          className="pr-4"
                        >
                          Sign Out
                        </Button>
                      </NavigationMenuLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/auth?tab=${AuthTabs.LOGIN}`}
                          className="pr-4"
                        >
                          Login
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href={`/auth?tab=${AuthTabs.SIGNUP}`}
                          className="pr-4"
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
