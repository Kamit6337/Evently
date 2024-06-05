import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import NavItems from "./NavItems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header>
      <div className="wrapper flex items-center justify-between">
        <Link href={`/`}>
          <Image
            src={`/assets/images/logo.svg`}
            width={128}
            height={38}
            alt="Evently Logo"
          />
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          {/* MARK: IF USER IS SIGNIN THEN SIGNEDIN COMPONENT WILL SHOW */}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <MobileNav />
          </SignedIn>

          {/* MARK: IF USER IS NOT SIGNIN THEN SIGNEDOUT COMPONENT WILL SHOW */}
          <SignedOut>
            <Button asChild>
              <Link href={`/sign-in`}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
