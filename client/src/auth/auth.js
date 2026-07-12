
import { supabase } from "../lib/supabase";

const MAX_LOGIN_ATTEMPTS = 5;

// Sign Up
export async function signUp(email, password, fullName, role) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error };

  const userId = data.user.id;

  await supabase.from("users").insert({
    id: userId,
    email,
    full_name: fullName,
    role,
  });

  return { data };
}

// Sign In
export async function signIn(email, password) {

  const { data: existingUser } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (existingUser?.is_locked) {
    return {
      error: {
        message: "Account locked. Contact administrator.",
      },
    };
  }

  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (result.error) {

    if (existingUser) {

      const attempts =
        existingUser.failed_login_attempts + 1;

      await supabase
        .from("users")
        .update({
          failed_login_attempts: attempts,
          is_locked: attempts >= MAX_LOGIN_ATTEMPTS,
        })
        .eq("id", existingUser.id);
    }

    return result;
  }

  await supabase
    .from("users")
    .update({
      failed_login_attempts: 0,
    })
    .eq("id", existingUser.id);

  return result;
}

// Sign Out
export async function signOut() {
  return await supabase.auth.signOut();
}

// Current User
export async function getCurrentUser() {

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

// User Role
export async function getUserRole() {

  const user = await getCurrentUser();

  if (!user) return null;

  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  return data?.role;
}