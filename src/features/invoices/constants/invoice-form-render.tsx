import { FieldRenderer } from "@/form/types";
import { FontAwesome5 } from "@expo/vector-icons";
import { InvoiceInfoProps } from "../types/invoice";

export const invoiceFormRenderer: FieldRenderer<InvoiceInfoProps> = (
  key,
  data
) => {
  if (key === "invoice_date") {
    return {
      prefix: <FontAwesome5 name='rupee-sign' style={{marginTop: 3}} size={14} />
    };
  }

  return {};
}



// const renderLabelSuffix = (key: keyof InvoiceItem) => {
//     switch (key) {
//       case 'rate':
//         return (
//           <Text>
//             {invoice_pricing_mode === 'exclusive' && '(Excl. GST)'}
//             {invoice_pricing_mode === 'inclusive' && '(Incl. GST)'}
//           </Text>
//         )
//     }
//   };

//   const renderPrefix = (key: keyof InvoiceItem) => {
//     switch (key) {
//       case 'discount_value':
//         if(data.discount_type === 'fixed') {
//           return (
//             <View style={{ marginTop: 2 }}>
//               <FontAwesome5 name="rupee-sign" size={15} />
//             </View>
//           )
//         }
//         return null;
      
//       case 'cess_value':
//         if(data.cess_type === 'fixed') {
//           return (
//             <View style={{ marginTop: 2 }}>
//               <FontAwesome5 name="rupee-sign" size={15} />
//             </View>
//           )
//         }
//         return null;


//       default:
//         return null;
//     }
//   };

//   const renderSuffix = (key: keyof InvoiceItem) => {
//     switch (key) {
//       case 'discount_value':
//         if(data.discount_type === 'percentage') {
//           return (
//             <View style={{ marginTop: 2 }}>
//               <FontAwesome5 name="percent" size={15} />
//             </View>
//           )
//         }
//         return null;
      
//       case 'cess_value':
//         if(data.cess_type === 'percentage') {
//           return (
//             <View style={{ marginTop: 2 }}>
//               <FontAwesome5 name="percent" size={15} />
//             </View>
//           )
//         }
//         return null;

//       case 'quantity':
//         return(
//           <View>
//             <Text>{data.measure_unit}</Text>
//           </View>
//         )
      
//       case 'rate':
//         return(
//           <View>
//             <Text>per {data.measure_unit}</Text>
//           </View>
//         )
        
//       default:
//         return null;
//     }
//   };


// Invoice Discount
  const renderPrefix = (key: string) => {
    switch (key) {
      case 'invoice_discount_value':
        if(data.invoice_discount_type === 'fixed') {
          return (
            <View style={{ marginTop: 2 }}>
              <FontAwesome5 name="rupee-sign" size={15} />
            </View>
          )
        }
        return null;
      
      default:
        return null;
    }
  };

  const renderSuffix = (key: string) => {
    switch (key) {
      case 'invoice_discount_value':
        if(data.invoice_discount_type === 'percentage') {
          return (
            <View style={{ marginTop: 2 }}>
              <FontAwesome5 name="percent" size={15} />
            </View>
          )
        }
        return null;

      default:
        return null;
    }
  };
