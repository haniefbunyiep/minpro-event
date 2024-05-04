'use client';
import { useVerificationEmail } from './../../../hooks/useVerificationEmail';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Verification({ params }) {
  // console.log(params.token);
  const token = params.token;
  const { mutationVerificationEmail } = useVerificationEmail();

  useEffect(() => {
    mutationVerificationEmail({
      accesstoken: token,
    });
  }, []);

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-2">
      <div>Verify Success</div>
      <Link href="/">Back to Home</Link>
    </div>
  );
}
