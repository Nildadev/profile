
import { createClient } from '@supabase/supabase-js';
import { UserProfile, BlogPost, DesignSettings } from '../types';

// LƯU Ý: Bạn cần tạo project trên Supabase và điền thông tin vào đây
// Nếu không có thông tin này, hệ thống sẽ tự động dùng LocalStorage làm fallback
const SUPABASE_URL = 'https://zkipacxygjskmbyqqcqm.supabase.co'; 
const SUPABASE_ANON_KEY = 'sb_publishable_8Rg-efh8yboO6kyAToEcwA_uL06XDB7';

const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) 
  : null;

export const cloudService = {
  isAvailable: () => !!supabase,

  async fetchAllData() {
    if (!supabase) return null;
    
    // Giả định bạn có bảng 'nilspace_store' với 1 hàng chứa JSON data
    // Hoặc bạn có thể tạo 3 bảng riêng: profile, posts, design
    const { data, error } = await supabase
      .from('nilspace_store')
      .select('*')
      .single();

    if (error) {
      console.warn("Cloud Fetch Error (Check if table exists):", error);
      return null;
    }
    return data.json_content;
  },

  async syncToCloud(data: { profile: UserProfile, posts: BlogPost[], design: DesignSettings }) {
    if (!supabase) return false;

    const { error } = await supabase
      .from('nilspace_store')
      .upsert({ id: 1, json_content: data, updated_at: new Date() });

    if (error) {
      console.error("Cloud Sync Error:", error);
      return false;
    }
    return true;
  }
};
