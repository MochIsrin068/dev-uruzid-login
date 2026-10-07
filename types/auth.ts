export type UserData =  {
  login_time: string;
  jabatan_name: string;
  id: string;
  branch_id: string;
  branch_name: string;
  branch_latitude: string;
  branch_longitude: string;
  branch_active: number;
  pakai_harga: number;
  branch_address: string;
  branch_tel1: string;
  branch_fax: string;
  branch_picpath: string;
  branch_picpath_thumb: string;
  default_warehouse_id: string;
  position: number;
  total_marketing_active: number;
  group_id: string;
  name: string;
  email: string;
  mobile: string;
  active: number;
  is_login: number;
  is_login_bo: number;
  status_absen: number;
  supervisor_hotel: string | null;
  user_printer_server_ip: string;
  user_printer_pos_ip: string;
  user_printer_pos_checker_ip: string;
  user_printer_pos_type: string;
  branch_printer_server_ip: string;
  branch_printer_pos_ip: string;
  branch_printer_pos_type: string;
}

export type UserPrivilege = {
  user_id: string;
  priviledge: string;
  active: number;
  updated_by: string;
  updated_date: string;
  mas_priv_child_name: string | null;
}

export type AppConfig = {
  id: string;
  description: string;
  onoff: number;
  value: string;
  updated_by: string;
  updated_time: string;
}

export type LoginResponse = {
  status: "OK" | "NOT OK";
  message?: string;
  token?: string;
  data: UserData[];
  data2: UserPrivilege[];
  data3: AppConfig[];
}

export type AuthState = {
  user: UserData | null;
  privileges: UserPrivilege[];
  config: AppConfig[];
  token: string | null;
  isAuthenticated: boolean;
}

export type TLoginPayload = {
  from_origin: string;
  userServer: string;
  userId: string;
  userPassword: string;
  envServer: string;
  referrer: string;
};