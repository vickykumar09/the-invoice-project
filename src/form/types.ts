import { MasterDataContextValue } from "@/contexts/MasterDataContext";
import { KeyboardType } from "react-native";

export type Option = {
  id: number;
  label: string;
  value: string;
  parent_id?: number | null;
};

export type FieldKey<T> = Extract<keyof T, string>;

export type FocusedField<T> = FieldKey<T> | null;

export type FormErrors<T> = Partial<Record<FieldKey<T>, string>>;

export type FormValues<T> = Record<FieldKey<T>, string>

export type FormSection<T> = {
  title?: string;
  fields: FormField<T>[];
  showSection?: (data: FormValues<T>) => boolean;
}

export type Sanitizer =
  | 'trim'
  | 'digitsOnly'
  | 'decimalFormat';

export type InputFormat = 
  | "email"
  | "phone"
  | "gstin"
  | "pan"
  | "ifsc"
  | "pincode"

export type FieldSanitization = {
  onChange?: Sanitizer[];
  transform?: 'lowercase' | 'uppercase' | 'capitalize';
};

export type FieldConstraints = {
  type: 'string' | 'integer' | 'decimal';
  required: boolean;

  exactLength?: number;
  minLength?: number;
  maxLength?: number;
  
  minValue?: number;
  maxValue?: number;

  allowedValues?: readonly string[];
  format?: InputFormat;
};

export type FieldValidator<T> = (
  value: string,
  data: FormValues<T>
) => string | null;

export type FormField<T> = {
  key: FieldKey<T>;
  label: string;
  sanitization?: FieldSanitization;
  constraints: FieldConstraints;
  validator?: FieldValidator<T>;
} & (
  | {
      type: 'TextInput';
      props: {
        placeholder?: string;
        keyboardType?: KeyboardType;
        editable?: boolean;
        mulitline?: boolean;
        numberofLines?: number;
      }
    }
  | {
      type: 'AppCamera';
      props : {
        cameraMode: 'scan' | 'capture';
      }
    }
  | {
      type: 'AppSlider';
      props : {
        minValue: number;
        maxValue: number;
        step: number;
      }
    }
  | {
      type: 'AppSwitch';
      props : {
        description: string;
      }
    }
  | {
      type: 'Selector';
      props : {
        options: readonly Option[];
        clearable?: boolean; 
      }
    } 
  | {
      type: 'Picker';
      props : {
        options_key?: keyof MasterDataContextValue;
        options?: readonly Option[];
      }
    }
  | {
      type: 'StepPicker';
      props : {
        options_key?: keyof MasterDataContextValue;
        options?: readonly Option[];
      }
    }
  | {
      type: 'DatePicker';
      props : {
        minimumDate: Date,
        maximumDate: Date,
      }
    }
  | {
      type: 'TimePicker';
      props : {
        minimumTime?: TimeRanges;
      }
    }
  )


export type FieldExtras = {
  label?: React.ReactNode;
  labelRight?: React.ReactNode;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export type FieldRenderer<T> = (
  key: FieldKey<T>,
  data: FormValues<T>
) => FieldExtras;

export type FormController<T> = {
  data: FormValues<T>;
  setErrors: React.Dispatch<React.SetStateAction<FormErrors<T>>>;
};

export type FormProps<T> = {
  initialData: T;
  sections: FormSection<T>[];
  fieldRenderer: FieldRenderer<T>;
  renderFooter: (controller: FormController<T>) => React.ReactNode;
};