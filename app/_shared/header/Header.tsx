// app/_shared/header/Header.tsx
import { auth } from "@root/auth";
import NavbarShell from "./NavbarShell";

export default async function Header() {
  const session = await auth();
  return <NavbarShell user={session?.user ?? null} />;
}

