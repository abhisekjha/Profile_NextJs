'use client';

import Link from "next/link";
import Logout from "@/components/Logout";
export default function Home() {
  return (
      <>
          <p>This is a home page! Hello world!</p>
          <Link href={"/register"}>
              <button>Register an account</button>
          </Link>
          <br/><br/><hr/>

          <Link href={"/login"}>
              <button>Login to existing account</button>
          </Link>
          <br/><br/><hr/>

          <Logout/>
      </>
  );
}
