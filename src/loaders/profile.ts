// import { supabase } from "@/services/supabase";

import { supabase } from "@lib/supabase";

export const uploadAvatar = async (
  avatar: Blob,
  userId: string | undefined
) => {
  if (avatar) {
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(`profile/${userId}/${new Date()}`, avatar, {
        cacheControl: "3600",
        upsert: true,
      });

    if (error || data == null) {
      return Promise.reject(error);
    }

    const avatar_url: any = data;

    console.log("avatar response: ", data);

    return Promise.resolve(avatar_url);
  }
};
