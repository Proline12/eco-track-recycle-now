export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      ewaste_submissions: {
        Row: {
          brand: string | null
          category: Database["public"]["Enums"]["device_category"]
          condition: Database["public"]["Enums"]["device_condition"]
          created_at: string | null
          description: string | null
          device_name: string
          estimated_value: number | null
          id: string
          model: string | null
          pickup_address: string | null
          pickup_city: string | null
          pickup_postal_code: string | null
          preferred_pickup_date: string | null
          quantity: number | null
          recycling_center_id: string | null
          status: Database["public"]["Enums"]["pickup_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          brand?: string | null
          category: Database["public"]["Enums"]["device_category"]
          condition: Database["public"]["Enums"]["device_condition"]
          created_at?: string | null
          description?: string | null
          device_name: string
          estimated_value?: number | null
          id?: string
          model?: string | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_postal_code?: string | null
          preferred_pickup_date?: string | null
          quantity?: number | null
          recycling_center_id?: string | null
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          brand?: string | null
          category?: Database["public"]["Enums"]["device_category"]
          condition?: Database["public"]["Enums"]["device_condition"]
          created_at?: string | null
          description?: string | null
          device_name?: string
          estimated_value?: number | null
          id?: string
          model?: string | null
          pickup_address?: string | null
          pickup_city?: string | null
          pickup_postal_code?: string | null
          preferred_pickup_date?: string | null
          quantity?: number | null
          recycling_center_id?: string | null
          status?: Database["public"]["Enums"]["pickup_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ewaste_submissions_recycling_center_id_fkey"
            columns: ["recycling_center_id"]
            isOneToOne: false
            referencedRelation: "recycling_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ewaste_submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      pickup_schedules: {
        Row: {
          completed_at: string | null
          completion_notes: string | null
          created_at: string | null
          driver_notes: string | null
          id: string
          pickup_address: string
          scheduled_date: string
          status: Database["public"]["Enums"]["pickup_status"] | null
          submission_id: string
          time_slot: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          driver_notes?: string | null
          id?: string
          pickup_address: string
          scheduled_date: string
          status?: Database["public"]["Enums"]["pickup_status"] | null
          submission_id: string
          time_slot: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          completion_notes?: string | null
          created_at?: string | null
          driver_notes?: string | null
          id?: string
          pickup_address?: string
          scheduled_date?: string
          status?: Database["public"]["Enums"]["pickup_status"] | null
          submission_id?: string
          time_slot?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pickup_schedules_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "ewaste_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          phone: string | null
          postal_code: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          phone?: string | null
          postal_code?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          postal_code?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recycling_centers: {
        Row: {
          address: string
          certified: boolean | null
          city: string
          created_at: string | null
          distance_miles: number | null
          email: string | null
          hours: string | null
          id: string
          name: string
          phone: string | null
          rating: number | null
          specialties: string[] | null
          updated_at: string | null
        }
        Insert: {
          address: string
          certified?: boolean | null
          city: string
          created_at?: string | null
          distance_miles?: number | null
          email?: string | null
          hours?: string | null
          id?: string
          name: string
          phone?: string | null
          rating?: number | null
          specialties?: string[] | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          certified?: boolean | null
          city?: string
          created_at?: string | null
          distance_miles?: number | null
          email?: string | null
          hours?: string | null
          id?: string
          name?: string
          phone?: string | null
          rating?: number | null
          specialties?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      recycling_records: {
        Row: {
          certificate_url: string | null
          created_at: string | null
          environmental_impact: string | null
          id: string
          materials_recovered: string[] | null
          processed_at: string | null
          recycling_center_id: string
          submission_id: string
          weight_kg: number | null
        }
        Insert: {
          certificate_url?: string | null
          created_at?: string | null
          environmental_impact?: string | null
          id?: string
          materials_recovered?: string[] | null
          processed_at?: string | null
          recycling_center_id: string
          submission_id: string
          weight_kg?: number | null
        }
        Update: {
          certificate_url?: string | null
          created_at?: string | null
          environmental_impact?: string | null
          id?: string
          materials_recovered?: string[] | null
          processed_at?: string | null
          recycling_center_id?: string
          submission_id?: string
          weight_kg?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "recycling_records_recycling_center_id_fkey"
            columns: ["recycling_center_id"]
            isOneToOne: false
            referencedRelation: "recycling_centers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recycling_records_submission_id_fkey"
            columns: ["submission_id"]
            isOneToOne: false
            referencedRelation: "ewaste_submissions"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      device_category:
        | "smartphones"
        | "tablets"
        | "laptops"
        | "desktops"
        | "monitors"
        | "televisions"
        | "gaming_consoles"
        | "printers"
        | "cameras"
        | "audio_equipment"
        | "kitchen_appliances"
        | "batteries"
        | "cables_accessories"
        | "other"
      device_condition:
        | "working"
        | "partially_working"
        | "not_working"
        | "damaged"
      pickup_status:
        | "pending"
        | "scheduled"
        | "in_progress"
        | "completed"
        | "cancelled"
      user_role: "user" | "admin" | "recycling_center"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      device_category: [
        "smartphones",
        "tablets",
        "laptops",
        "desktops",
        "monitors",
        "televisions",
        "gaming_consoles",
        "printers",
        "cameras",
        "audio_equipment",
        "kitchen_appliances",
        "batteries",
        "cables_accessories",
        "other",
      ],
      device_condition: [
        "working",
        "partially_working",
        "not_working",
        "damaged",
      ],
      pickup_status: [
        "pending",
        "scheduled",
        "in_progress",
        "completed",
        "cancelled",
      ],
      user_role: ["user", "admin", "recycling_center"],
    },
  },
} as const
