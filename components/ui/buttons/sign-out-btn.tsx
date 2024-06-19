"use client";

import { useClerk } from "@clerk/nextjs";

interface SignOutButtonProps {
  redirectUrl: string;
}

export const SignOutButton = ({ redirectUrl }: SignOutButtonProps) => {
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    await signOut();
    window.location.href = redirectUrl;
  };

  return (
    // Clicking on this button will sign out a user
    // and reroute them to the specified redirectUrl.

    // @ts-ignore
    <button onClick={() => signOut({ redirectUrl: "/" })}>Sign out</button>
  );
};
// and reroute them to the specified redirectUrl.
