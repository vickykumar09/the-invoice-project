import * as Print from 'expo-print'

export const generateInvoicePdf = async () => {
  const items = Array.from({ length: 100 }, (_, index) => {
    const id = index + 1;

    const quantity = (id % 5) + 1;
    const price = 100 + id * 10;
    const discount = (id % 3) * 5;

    const taxableValue = quantity * price - discount;
    const cgst = taxableValue * 0.09;
    const sgst = taxableValue * 0.09;

    return {
      id,
      name: `Sample Product ${id}`,
      hsnSacCode: "85171290",
      taxRate: 18,

      quantity,
      unit: "PCS",

      price,
      discount,

      taxableValue,

      cgstAmount: cgst,
      sgstAmount: sgst,

      totalAmount: taxableValue + cgst + sgst,
    };
  });

  const html = `
    <!DOCTYPE html>
      <html>
      <head>
      <meta charset="utf-8">
      <title>Tax Invoice</title>

      <style>
      body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #000;
      }

      table {
        width: 100%;
        border-collapse: collapse;
      }

      thead {
        display: table-header-group;
      }

      th {
        border-bottom: 1px solid #000;
        padding: 6px;
        vertical-align: bottom;
      }
      td {
        padding: 6px;
        vertical-align: top;
      }
      tr:nth-child(even) {
        background-color: #eee;
      }


      .no-border {
        border: none;
      }

      .text-right {
        text-align: right;
      }

      .text-center {
        text-align: center;
      }

      .mb {
        margin-bottom: 12px;
        width: 100%
      }

      .section-title {
        font-weight: bold;
        margin-bottom: 4px;
        page-break-before: always;
      }
      .invoice-item {
        page-break-inside: avoid;
        break-inside: avoid;
      }

      .invoice-bottom {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 20px;
}

.summary-box,
.tax-box {
  width: 48%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 12px;
}

.summary-box h3,
.tax-box h3 {
  margin-bottom: 8px;
  font-size: 14px;
}

.grand-total {
  margin-top: 15px;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
  border-top: 2px solid #000;
}

td.description {
  min-width: 150px;
  max-width: 300px;
  word-wrap: break-word; /* old but still used */
  overflow-wrap: break-word; /* modern */
  white-space: normal;   /* IMPORTANT: allows wrapping */
}

/* IMPORTANT for print stability */
@media print {
  .invoice-bottom {
    page-break-inside: avoid;
  }

  .summary-box,
  .tax-box {
    page-break-inside: avoid;
  }
}
      </style>
      </head>

      <body>

      <h1 style="text-align:center;">TAX INVOICE</h1>

      <!-- Company & Invoice Info -->
      <table class="mb">
        <tr>
          <td width="60%">
            <strong>ABC Enterprises</strong><br>
            Patna, Bihar - 800001<br>
            GSTIN: 10ABCDE1234F1Z5<br>
            Phone: +91 9876543210<br>
            Email: info@abc.com
          </td>

          <td width="40%">
            Invoice No: INV-2026-001<br>
            Invoice Date: 11-Jun-2026<br>
            Due Date: 26-Jun-2026<br>
            Place of Supply: Bihar (10)
          </td>
        </tr>
      </table>

      <!-- Buyer Details -->
      <table class="mb">
        <tr>
          <td>
            <strong>Bill To</strong><br>
            XYZ Traders<br>
            Mithapur, Patna, Bihar<br>
            GSTIN: 10AAACX1234A1Z9<br>
            State: Bihar (10)
          </td>
        </tr>
      </table>


      <p>All amounts are in ₹ (INR)</p>

      <!-- Items -->
      <table class="mb">
        <thead>
          <tr>
            <th style="text-align: center">S.No.</th>
            <th style="text-align: left">Item Description</th>
            <th style="text-align: center">Quantity</th>
            <th style="text-align: right">Rate</th>
            <th style="text-align: right">Discount</th>
            <th style="text-align: right">Taxable<br>Value</th>
            <th style="text-align: right">CGST</th>
            <th style="text-align: right">SGST/<br>UTGST</th>
            <th style="text-align: right">CESS</th>
            <th style="text-align: right">Total<br>Amount</th>
          </tr>
        </thead>

        <tbody>
          ${items
          .map(
            (item) => `
          <tr>
            <td style="text-align: center">${item.id}</td>
            <td class="description">
              <div class="invoice-item">
                <strong>${item.name} and two ounces of of beer afdsfoisaffjsslljfaaofius fsaajdf fsaddfkdsajl</strong><br>
                <p style="color: #555, background-color: green">CGST: ${item.taxRate / 2}% SGST: ${item.taxRate / 2}%</p>
                <p>HSN/SAC: ${item.hsnSacCode}</p>
              </div>
            </td>

            <td style="text-align: center">${item.quantity}<br>pcs</td>
            <td style="text-align: right">${item.price.toFixed(2)}</td>
            <td style="text-align: right">${item.discount.toFixed(2)}</td>
            <td style="text-align: right">${item.taxableValue.toFixed(2)}</td>

            <td style="text-align: right">${item.cgstAmount.toFixed(2)}</td>
            <td style="text-align: right">${item.sgstAmount.toFixed(2)}</td>
            <td style="text-align: right">0</td>

            <td style="text-align: right">${item.totalAmount.toFixed(2)}</td>
          </tr>
        `
          )
          .join("")}
        </tbody>
      </table>

      <!-- Tax Summary -->
      <div class="section-title">Tax Summary</div>

      <table class="mb">
        <thead>
          <tr>
            <th>GST Rate</th>
            <th>Taxable Value</th>
            <th>CGST</th>
            <th>SGST</th>
            <th>IGST</th>
            <th>CESS</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>5%</td>
            <td>7,800</td>
            <td>195</td>
            <td>195</td>
            <td>0</td>
            <td>0</td>
          </tr>

          <tr>
            <td>18%</td>
            <td>129,500</td>
            <td>11,655</td>
            <td>11,655</td>
            <td>0</td>
            <td>0</td>
          </tr>

          <tr>
            <td>28%</td>
            <td>47,500</td>
            <td>6,650</td>
            <td>6,650</td>
            <td>0</td>
            <td>5,700</td>
          </tr>
        </tbody>
      </table>

      <!-- Invoice Summary -->
      <div>Invoice Summary</div>

      <table class="mb">
        <tr>
          <td>Subtotal</td>
          <td class="text-right">184,800</td>
        </tr>
        <tr>
          <td>Discount</td>
          <td class="text-right">184,800</td>
        </tr>
        <tr>
          <td>Taxable Value</td>
          <td class="text-right">184,800</td>
        </tr>
        <tr>
          <td>CGST</td>
          <td class="text-right">18,500</td>
        </tr>
        <tr>
          <td>SGST</td>
          <td class="text-right">18,500</td>
        </tr>
        <tr>
          <td>CESS</td>
          <td class="text-right">5,700</td>
        </tr>
        <tr>
          <td>Freight Charges</td>
          <td class="text-right">1,000</td>
        </tr>
        <tr>
          <td>Round Off</td>
          <td class="text-right">0.25</td>
        </tr>
        <tr>
          <td><strong>Grand Total</strong></td>
          <td class="text-right"><strong>228,500.25</strong></td>
        </tr>
      </table>

      <!-- Amount In Words -->
      <div class="mb">
        <strong>Amount in Words:</strong><br>
        Rupees Two Lakh Twenty Eight Thousand Five Hundred and Twenty Five Paise Only
      </div>

      <!-- Bank Details -->
      <div >Bank Details</div>

      <table class="mb">
        <tr>
          <td>
            Bank Name: State Bank of India<br>
            Account No: 1234567890<br>
            IFSC: SBIN0001234<br>
            UPI: abc@upi
          </td>
        </tr>
      </table>

      <!-- Declaration -->
      <div class="mb">
        <strong>Declaration</strong><br>
        We declare that this invoice shows the actual price of the goods/services
        described and that all particulars are true and correct.
      </div>

      <!-- Signature -->
      <table>
        <tr>
          <td class="no-border"></td>
          <td class="no-border" style="text-align:right;">
            For ABC Enterprises<br><br><br>
            Authorized Signatory
          </td>
        </tr>
      </table>

      </body>
      </html>

  <table>
</table>

<div class="invoice-bottom">

  <div class="summary-box">
    <h3>Invoice Summary</h3>
    <p>Subtotal: ₹10,000</p>
    <p>Discount: ₹500</p>
    <p>Taxable Value: ₹9,500</p>
  </div>

  <div class="tax-box">
    <h3>Tax Summary</h3>
    <p>CGST: ₹855</p>
    <p>SGST: ₹855</p>
    <p>CESS: ₹0</p>
  </div>

</div>

<div class="grand-total">
  Grand Total: ₹11,210
</div>
  `
//   const html = `
//     <html>
//       <body>
//         <h1>Invoice</h1>
//         <div style="disply: flex, flex-direction: row, justifyContent: spaced-between">
//         <p>Invoice No: INV-001</p>
//         <p>Customer: Rahul</p>
//         <p>Total: ₹5000</p>
//         </div>


//         <table border="1" cellspacing="0" cellpadding="6" style="width:100%; border-collapse:collapse;">
//   <thead>
//     <tr>
//       <th rowspan="2" style="width:25%;">Item Description</th>
//       <th rowspan="2">Qty</th>
//       <th rowspan="2">Price</th>
//       <th rowspan="2">Discount</th>
//       <th rowspan="2">Taxable Value</th>
//       <th colspan="4">Taxes</th>
//       <th rowspan="2">Total Amount</th>
//     </tr>
//     <tr>
//       <th>CGST</th>
//       <th>SGST</th>
//       <th>IGST</th>
//       <th>CESS</th>
//     </tr>
//   </thead>

//   <tbody>
//     <tr>
//       <td>
//         <strong>Samsung Galaxy S25</strong><br>
//         HSN: 85171290<br>
//         GST: 18%
//       </td>
//       <td>2</td>
//       <td>₹50,000</td>
//       <td>₹2,000</td>
//       <td>₹98,000</td>
//       <td>₹8,820</td>
//       <td>₹8,820</td>
//       <td>-</td>
//       <td>-</td>
//       <td>₹115,640</td>
//     </tr>

//     <tr>
//       <td>
//         <strong>HP LaserJet Printer</strong><br>
//         HSN: 84433240<br>
//         GST: 18%
//       </td>
//       <td>1</td>
//       <td>₹15,000</td>
//       <td>₹500</td>
//       <td>₹14,500</td>
//       <td>₹1,305</td>
//       <td>₹1,305</td>
//       <td>-</td>
//       <td>-</td>
//       <td>₹17,110</td>
//     </tr>

//     <tr>
//       <td>
//         <strong>Basmati Rice 25kg</strong><br>
//         HSN: 10063020<br>
//         GST: 5%
//       </td>
//       <td>4</td>
//       <td>₹2,000</td>
//       <td>₹200</td>
//       <td>₹7,800</td>
//       <td>₹195</td>
//       <td>₹195</td>
//       <td>-</td>
//       <td>-</td>
//       <td>₹8,190</td>
//     </tr>

//     <tr>
//       <td>
//         <strong>Office Chair</strong><br>
//         HSN: 94013000<br>
//         GST: 18%
//       </td>
//       <td>3</td>
//       <td>₹6,000</td>
//       <td>₹1,000</td>
//       <td>₹17,000</td>
//       <td>₹1,530</td>
//       <td>₹1,530</td>
//       <td>-</td>
//       <td>-</td>
//       <td>₹20,060</td>
//     </tr>

//     <tr>
//       <td>
//         <strong>Industrial Chemical</strong><br>
//         HSN: 38249990<br>
//         GST: 28% + CESS 12%
//       </td>
//       <td>5</td>
//       <td>₹10,000</td>
//       <td>₹2,500</td>
//       <td>₹47,500</td>
//       <td>₹6,650</td>
//       <td>₹6,650</td>
//       <td>-</td>
//       <td>₹5,700</td>
//       <td>₹66,500</td>
//     </tr>
//   </tbody>
// </table>
        
//       </body>
//     </html>
//   `

  const { uri } = await Print.printToFileAsync({
    html,
  })
  
  return uri
}