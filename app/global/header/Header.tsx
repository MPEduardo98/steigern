// app/global/header/Header.tsx
import { auth } from "@/auth";
import NavbarShell from "./NavbarShell";

export default async function Header() {
  const session = await auth();
  return <NavbarShell user={session?.user ?? null} />;
}