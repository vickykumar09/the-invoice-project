import { FormErrors } from "@/form/types";


type CustomerActivity = {
  id: string;
  customer_id: string;

  type: string;
  actor: 'business' | 'customer' | 'system';

  title: string;
  created_at: string;
  entity_id: string;
};

export type ValueType =
  | 'fixed' 
  | 'percentage'

export type BreadCrumb = {
  id: number;
  label: string;
}


export type ValidationResult = {
  isValid: boolean;
  value?: number;
  error?: string;
};


export type ActionError<T> = { 
  code: "VALIDATION_ERROR" | "DATABASE_ERROR" | "NOT_FOUND_ERROR";
  message: string;
  fields?: FormErrors<T>; 
}; 

export type Result<T> = 
  | { success: true; data: T; }
  | { success: false; error: ActionError<T>; };
