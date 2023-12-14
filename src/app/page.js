// src/app/page.js
"use client";
import S3UploadForm from "@/app/components/S3UploadForm";
import EmailPasswordLogin from "@/app/components/EmailPasswordLogin";
import { useAuthState } from "react-firebase-hooks/auth"; // Import the necessary hook
import { auth } from "@/app/firebase";

const Home = () => {
  const [user] = useAuthState(auth); // Use the hook on the client side

  return (
    <main>
      {user ? (
        <div>
          <S3UploadForm />
        </div>
      ) : (
        <div>
          <EmailPasswordLogin />
        </div>
      )}
    </main>
  );
};

export default Home;
