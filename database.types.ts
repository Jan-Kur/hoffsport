export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      groups: {
        Row: {
          id: string
          league_id: string
          name: string
        }
        Insert: {
          id?: string
          league_id?: string
          name: string
        }
        Update: {
          id?: string
          league_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "groups_league_id_fkey"
            columns: ["league_id"]
            isOneToOne: false
            referencedRelation: "leagues"
            referencedColumns: ["id"]
          },
        ]
      }
      leagues: {
        Row: {
          end_date: string | null
          id: string
          is_active: boolean
          name: string
          start_date: string
        }
        Insert: {
          end_date?: string | null
          id?: string
          is_active?: boolean
          name: string
          start_date: string
        }
        Update: {
          end_date?: string | null
          id?: string
          is_active?: boolean
          name?: string
          start_date?: string
        }
        Relationships: []
      }
      matches: {
        Row: {
          id: string
          place: string
          score_a: number
          score_b: number
          stage: string
          team_season_a_id: string | null
          team_season_b_id: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          place: string
          score_a?: number
          score_b?: number
          stage: string
          team_season_a_id?: string | null
          team_season_b_id?: string | null
          timestamp: string
        }
        Update: {
          id?: string
          place?: string
          score_a?: number
          score_b?: number
          stage?: string
          team_season_a_id?: string | null
          team_season_b_id?: string | null
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_team_season_a_id_fkey"
            columns: ["team_season_a_id"]
            isOneToOne: false
            referencedRelation: "team_seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_team_season_b_id_fkey"
            columns: ["team_season_b_id"]
            isOneToOne: false
            referencedRelation: "team_seasons"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          grade: string | null
          id: string
          is_admin: boolean
          is_deleted: boolean
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          grade?: string | null
          id: string
          is_admin?: boolean
          is_deleted?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          grade?: string | null
          id?: string
          is_admin?: boolean
          is_deleted?: boolean
        }
        Relationships: []
      }
      team_season_players: {
        Row: {
          id: string
          team_season_id: string
          user_id: string
        }
        Insert: {
          id?: string
          team_season_id: string
          user_id: string
        }
        Update: {
          id?: string
          team_season_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_registration_members_team_registration_id_fkey"
            columns: ["team_season_id"]
            isOneToOne: false
            referencedRelation: "team_seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_registration_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_seasons: {
        Row: {
          captain_user_id: string
          group_id: string | null
          id: string
          stage_reached: string | null
          status: string
          team_id: string
        }
        Insert: {
          captain_user_id: string
          group_id?: string | null
          id?: string
          stage_reached?: string | null
          status: string
          team_id: string
        }
        Update: {
          captain_user_id?: string
          group_id?: string | null
          id?: string
          stage_reached?: string | null
          status?: string
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_registrations_captain_user_id_fkey"
            columns: ["captain_user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_registrations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_registrations_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string
          grade: string
          id: string
          is_deleted: boolean
          league: string | null
          name: string
        }
        Insert: {
          created_at?: string
          grade: string
          id?: string
          is_deleted?: boolean
          league?: string | null
          name: string
        }
        Update: {
          created_at?: string
          grade?: string
          id?: string
          is_deleted?: boolean
          league?: string | null
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
