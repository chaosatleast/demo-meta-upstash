import React from "react";
import { getProviders, signIn } from "next-auth/react";
import SignInComponent from "./SignInComponent";
import Image from "next/image";

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center pt-8">
      <div>
        <Image
          className="mx-2 object-cover"
          width={300}
          height={300}
          src="https://upload.wikimedia.org/wikipedia/commons/b/be/Facebook_Messenger_logo_2020.svg"
          alt="Profile Picture"
        />
      </div>

      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
