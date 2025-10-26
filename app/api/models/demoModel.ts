// src/api/models/demo.ts

// 單筆資料結構
export interface DemoItem {
  id: number;
  title: string;
  description?: string;
}

// ----------------------
// Request Models
// ----------------------
export interface Demo2Req {
  name: string;
  age: number;
}

export interface Demo3Req {
  id: number;
}

// ----------------------
// Response Models
// ----------------------
export interface DemoRsp<T = any> {
  success: boolean;
  data: T;
  message?: string;
}
