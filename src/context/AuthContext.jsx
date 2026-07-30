import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log("AUTH USER:", user);

    if (user) {
      setUser(user);

      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      console.log("PROFILE:", profileData);
      console.log("PROFILE ERROR:", error);

      setProfile(profileData);
    } else {
      setUser(null);
      setProfile(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      getUser();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}