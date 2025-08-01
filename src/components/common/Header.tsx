'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/store/authStore';
import { useFavoritesStore } from '@/store/favouritesStore';
import { useCartStore } from '@/store/cartStore';

import { Button } from '@/components/ui/button';
import { Heart, LogOut, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import CartSheet from "../cart/CartSheet";

const IconBadge = ({ count }: { count: number }) => {
  if (count === 0) return null;
  return (
    <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
      {count}
    </span>
  );
};

export default function Header() {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const favoritesCount = useFavoritesStore((state) => state.favorites.length);

  const logout = useAuthStore((state) => state.logout);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);
  const clearCart = useCartStore((state) => state.clearCart);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    logout();
    clearFavorites();
    clearCart();
    router.push('/login');
  };

  return (
    <header className="bg-navy text-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-2xl font-bold text-teal-accent">
          Product-Catalogue
        </Link>
        <div className="flex items-center gap-4">
          {isMounted && (
            <>
              <div className="relative">
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                  <IconBadge count={favoritesCount} />
                </Button>
              </div>

              <CartSheet />

              <div className="h-6 w-px bg-slate-gray" />
              {isAuthenticated ? (
                <>
                  <Button variant="ghost" className="hidden sm:flex items-center gap-2">
                    <User className="h-5 w-5" /> Admin User
                  </Button>
                  <Button onClick={handleLogout} variant="destructive" className="flex items-center gap-2">
                    <LogOut className="h-5 w-5" /> Logout
                  </Button>
                </>
              ) : (
                <Link href="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
    </header>
  );
}