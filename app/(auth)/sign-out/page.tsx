'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignIn() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      if (session) {
        await signOut({
          redirect: false,
        });
      }
      router.push('/sign-in');
    })();
  }, [session]);

  return (
    <div />
  );
}
