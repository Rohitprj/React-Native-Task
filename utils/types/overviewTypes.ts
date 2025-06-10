// TypeScript interfaces for API data
export interface LeadSource {
  name: string;
  leadsCount: number;
}

export interface LeadStage {
  name: string;
  leadsCount: number;
}

export interface Revenue {
  storeId: number;
  storeName: string;
  total: number;
  month: number;
}

export interface DashboardData {
  valid: boolean;
  stores: number;
  employees: number;
  bookings: number;
  packages: number;
  customers: number;
  todayLeads: number;
  monthLeads: number;
  sources: LeadSource[];
  stages: LeadStage[];
  todayFollowUps: number;
  revenue: Revenue[];
}

export interface CardItem {
  id: string;
  count: number | string;
  label: string;
  isRevenue?: boolean;
}
