// src/app/components/EmailPasswordLogin.js
"use client";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
   // Update the import statement
} from "firebase/auth"; // Update the import path
import { auth } from "@/app/firebase";
import { signOut } from "firebase/auth";

const EmailPasswordLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userToken, setUserToken] = useState(""); // Added state to store user token

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access the signed-in user
      const user = userCredential.user;

      // Access the user's authentication token and save it to state
      const token = await user.getIdToken();
      setUserToken(token);

      console.log("User signed in successfully:", user);
      console.log("User authentication token:", token);

      // Reset error message and set success message
      setErrorMessage("");
      setSuccessMessage("Login successful!");
    } catch (error) {
      console.error(error);

      // Reset success message and set error message
      setSuccessMessage("");
      setErrorMessage("Invalid email or password");
    }
  };

  const handleLogout = async () => {
    try {
      // Check if there's a user token before calling signOut
      if (userToken) {
        // Perform custom logout logic, e.g., using the user token
        console.log("Custom logout logic with user token:", userToken);
      }

      // Call the signOut function from Firebase auth to log the user out
      await auth.signOut();

      // Reset user token state on logout
      setUserToken("");

      console.log("User signed out successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign In</button>

      {userToken && <p>User Token: {userToken}</p>}

      <button onClick={handleLogout}>Logout</button>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default EmailPasswordLogin;
