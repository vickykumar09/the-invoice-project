import { FieldRenderer } from "@/form/types";
import { ItemForm } from "../types";
import { FontAwesome5 } from "@expo/vector-icons";

export const itemFieldRenderer: FieldRenderer<ItemForm> = (
  key,
  data
) => {
  if (key === "rate") {
    return {
      prefix: <FontAwesome5 name='rupee-sign' style={{marginTop: 3}} size={14} />
    };
  }

  if(key === "cess_value") {
    return {
      prefix: data.cess_type === 'fixed' && <FontAwesome5 name='rupee-sign' style={{marginTop: 3}} size={14} />,
      suffix: data.cess_type === 'percentage' && <FontAwesome5 name='percent' style={{marginTop: 3}} size={14} />,
    }
  }

  if(key === "discount_value") {
    return {
      prefix: data.discount_type === 'fixed' && <FontAwesome5 name='rupee-sign' style={{marginTop: 3}} size={14} />,
      suffix: data.discount_type === 'percentage' && <FontAwesome5 name='percent' style={{marginTop: 3}} size={14} />,
    }
  }

  return {};
}