'use client';

import { SignInResponse, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password');

  const submit = async () => {
    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    }) as SignInResponse;
    if (response.error) {
      alert(response.error);
      return;
    }
    router.push('/dashboard');
  };

  return (
    <main className="min-h-screen flex flex-col bg-violet-300 p-24">
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Email"
          defaultValue={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={submit}
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
