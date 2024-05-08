'use client';
import { useVerificationEmail } from './../../../../hooks/useVerificationEmail';
import Link from 'next/link';

export default function Verification({ params }) {
  const token = params.token;
  const { mutationVerificationEmail } = useVerificationEmail();

  const handleVerify = async () => {
    mutationVerificationEmail({
      accesstoken: token,
    });
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="btn w-[300px]" onClick={handleVerify}>
        Verify
      </div>
      <Link className="btn w-[300px]" href="/">
        Back to Home
      </Link>
      <Link className="btn w-[300px]" href="/login">
        Login now
      </Link>
    </div>
  );
}
