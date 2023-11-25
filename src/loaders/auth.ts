import { supabase } from "@lib/supabase";
import { Session } from "@supabase/supabase-js";

export const createAccount = async (email: string, password: string) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    return Promise.reject(error);
  }
};

export const verifyEmail = async (code: string, email: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token: code,
    type: "email",
    email,
  });

  if (error || data == null) {
    return Promise.reject(error);
  }

  return Promise.resolve(data);
};

export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error || data == null) {
    return Promise.reject(error);
  }

  const session: Session = data.session;
  return Promise.resolve(session);
};
