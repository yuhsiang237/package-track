// src/api/demo.ts
import service from "./index";
import type { DemoItem, DemoRsp, Demo2Req, Demo3Req } from "./models/demoModel";

// GET demo1
export const getDemo1 = () => {
  return service.get<DemoRsp<DemoItem[]>>("/demo1");
};

// POST demo2
export const postDemo2 = (payload: Demo2Req) => {
  return service.post<DemoRsp<DemoItem[]>>("/demo2", payload);
};

// GET demo3/:id
export const getDemo3ById = (params: Demo3Req) => {
  return service.get<DemoRsp<DemoItem>>(`/demo3/${params.id}`);
};
