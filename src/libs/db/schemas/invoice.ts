/**
 *
 * A tables.ts file is a clean, centralized place to store all your CREATE TABLE statements, separate from the migration logic.
 * It keeps your project organized and readable.
 * You then import these table definitions inside migrations.ts.
 *
 */

export const INVOICE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,

    invoice_type TEXT NOT NULL
      CHECK(invoice_type IN (
        'none',
        'taxable',
        'exempt'
      )),
    is_igst INTEGER NOT NULL DEFAULT 0
      CHECK (is_igst IN (0, 1)),

    invoice_number TEXT,
    invoice_date TEXT NOT NULL,
    place_of_supply TEXT NOT NULL,

    sales_channel TEXT NOT NULL,
    handled_by TEXT NOT NULL,
    order_id TEXT,
    order_date TEXT,

    subtotal INTEGER NOT NULL DEFAULT 0,

    item_discounts_total INTEGER NOT NULL DEFAULT 0,

    coupon_id TEXT,
    coupon_code TEXT,
    coupon_discount_type TEXT
      CHECK(coupon_discount_type IN (
        'percentage',
        'fixed'
      )),
    coupon_discount_value INTEGER NOT NULL DEFAULT 0,
    coupon_discount_amount INTEGER NOT NULL DEFAULT 0,

    invoice_discount_type TEXT 
      CHECK(invoice_discount_type IN (
        'percentage',
        'fixed'
      )),
    invoice_discount_value INTEGER NOT NULL DEFAULT 0,
    invoice_discount_amount INTEGER NOT NULL DEFAULT 0,

    discounts_total INTEGER NOT NULL DEFAULT 0,

    taxable_amount INTEGER NOT NULL DEFAULT 0,

    cgst_total INTEGER NOT NULL DEFAULT 0,
    sgst_total INTEGER NOT NULL DEFAULT 0,
    igst_total INTEGER NOT NULL DEFAULT 0,
    cess_total INTEGER NOT NULL DEFAULT 0,
    tax_total INTEGER NOT NULL DEFAULT 0,

    round_off_mode TEXT NOT NULL DEFAULT 'none'
      CHECK(round_off_mode IN (
        'none',
        'up',
        'down'
      )),
    round_off_amount INTEGER NOT NULL DEFAULT 0,

    grand_total INTEGER NOT NULL DEFAULT 0,
    paid_total INTEGER NOT NULL DEFAULT 0,

    internal_note TEXT,

    status TEXT NOT NULL DEFAULT 'draft'
      CHECK(status IN (
        'draft',
        'issued',
        'cancelled'
      )),
    
    payment_status TEXT NOT NULL DEFAULT 'unpaid' 
      CHECK(payment_status IN (
        'unpaid',
        'partially_paid',
        'paid',
        'overdue'
      )),
    
    
    created_at TEXT NOT NULL,
    issued_at TEXT,
    cancelled_at TEXT,
    updated_at TEXT NOT NULL,

    is_synced INTEGER NOT NULL DEFAULT 0 CHECK (
      is_synced IN (0, 1)
    ),

    UNIQUE(business_id, invoice_number)
  );
`;

export const INVOICE_CUSTOMER_SCHEMA = `
  CREATE TABLE IF NOT EXISTS invoice_customer (
    invoice_id TEXT PRIMARY KEY,
    customer_id TEXT,

    bill_to_name TEXT NOT NULL,
    bill_to_address_line1 TEXT NOT NULL,
    bill_to_address_line2 TEXT,
    bill_to_city TEXT NOT NULL,
    bill_to_state_code TEXT NOT NULL,
    bill_to_pincode TEXT,
    bill_to_phone TEXT NOT NULL,
    bill_to_email TEXT,
    bill_to_gstin TEXT,
    
    is_shipping_same_as_billing INTEGER NOT NULL DEFAULT 1 
      CHECK (is_shipping_same_as_billing IN (0, 1)),
    
    ship_to_name TEXT,
    ship_to_address_line1 TEXT,
    ship_to_address_line2 TEXT,
    ship_to_city TEXT,
    ship_to_state_code TEXT,
    ship_to_pincode TEXT,
    ship_to_phone TEXT,
    ship_to_email TEXT,
    ship_to_gstin TEXT,

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,

    is_synced INTEGER NOT NULL DEFAULT 0 
      CHECK (is_synced IN (0, 1)),

    FOREIGN KEY (invoice_id)
      REFERENCES invoices(id)
      ON DELETE CASCADE
  );
`;

export const INVOICE_ITEM_SCHEMA = `
  CREATE TABLE IF NOT EXISTS invoice_items (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    invoice_id TEXT NOT NULL,
    item_id TEXT,

    type TEXT
      CHECK (type IN ('product', 'service')),
    name TEXT NOT NULL,
    description TEXT,
    measure_unit_id INTEGER NOT NULL,

    rate INTEGER NOT NULL
      CHECK (rate >= 1 AND rate <= 1000000000),
    rate_type TEXT
      CHECK (rate_type IN ('inclusive', 'exclusive')),
    
    quantity REAL NOT NULL CHECK (quantity > 0),
    amount INTEGER DEFAULT 0,

    discount_type TEXT NOT NULL
      CHECK(discount_type IN (
        'fixed',
        'percentage'
      )),
    discount_value REAL NOT NULL DEFAULT 0,
    discount_amount INTEGER NOT NULL DEFAULT 0,

    invoice_discount_amount INTEGER NOT NULL DEFAULT 0,
    coupon_discount_amount INTEGER NOT NULL DEFAULT 0,

    taxable_amount INTEGER NOT NULL,

    hsn_sac_code TEXT,
    tax_rate REAL
      CHECK (
        tax_rate = -1
        OR (tax_rate >= 0 AND tax_rate <= 100)
      ),
    cgst_amount INTEGER NOT NULL DEFAULT 0,
    sgst_amount INTEGER NOT NULL DEFAULT 0,
    igst_amount INTEGER NOT NULL DEFAULT 0,

    cess_type TEXT 
      CHECK (cess_type IN (
        'fixed',
        'percentage'
      )),
    cess_value REAL 
      CHECK (
        CASE
          WHEN cess_type IS NULL THEN
            cess_value IS NULL

          WHEN cess_type = 'percentage' THEN
            cess_value IS NOT NULL
            AND cess_value >= 0
            AND cess_value <= 100

          WHEN cess_type = 'fixed' THEN
            cess_value IS NOT NULL
            AND cess_value >= 0

          ELSE 0
        END
      ),
    cess_amount INTEGER NOT NULL DEFAULT 0,

    total_amount INTEGER NOT NULL,

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    is_synced INTEGER NOT NULL DEFAULT 0
      CHECK (is_synced IN (0, 1)),

    FOREIGN KEY (invoice_id)
      REFERENCES invoices_new(id)
      ON DELETE CASCADE
  );
`;

export const INVOICE_PAYMENT_SCHEMA = `
  CREATE TABLE IF NOT EXISTS invoice_payments (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    invoice_id TEXT NOT NULL,

    paid_at TEXT NOT NULL,
    amount INTEGER NOT NULL DEFAULT 0 CHECK(amount > 0),
    method TEXT NOT NULL
    CHECK(method IN (
      'cash',
      'upi',
      'card',
      'bank_transfer',
      'cheque',
      'demand draft',
      'voucher',
      'credit_note',
      'other'
    )),
    reference_id TEXT,
    notes TEXT,

    status TEXT NOT NULL DEFAULT 'completed'
    CHECK(status IN (
      'pending',
      'completed',
      'failed',
      'cancelled',
      'refunded'
    )),

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    is_synced INTEGER NOT NULL DEFAULT 0 CHECK (is_synced IN (
      0, 1
    )),

    FOREIGN KEY (invoice_id) REFERENCES invoices(id)
  );
`;

export const INVOICE_REFUND_SCHMEA = `
  CREATE TABLE IF NOT EXISTS invoice_refunds (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    invoice_id TEXT NOT NULL,
    credit_note_id TEXT,

    amount REAL NOT NULL
      CHECK (amount > 0),

    method TEXT NOT NULL CHECK (
      method IN ('cash', 'upi', 'card', 'cheque', 'demand_draft', 'bank_transfer')
    ),
    
    reference_no TEXT,
    reason TEXT,
    notes TEXT,
    
    status TEXT NOT NULL CHECK (
      status IN ('pending', 'processed', 'failed', 'cancelled')
    ),

    initiated_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    processed_at INTEGER DEFAULT NULL,

    FOREIGN KEY (invoice_id) 
      REFERENCES invoices(id),

    FOREIGN KEY (credit_note_id)
      REFERENCES credit_notes(id)
  );
`;

export const CREDIT_NOTE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS credit_notes (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    invoice_id TEXT NOT NULL,
    credit_note_number TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'draft',

    subtotal REAL NOT NULL,

    item_discount_amount
    invoice_discount_amount
    coupon_discount_amount

    tax REAL NOT NULL,
    total REAL NOT NULL,

    reason_code TEXT,
    reason_notes TEXT,

    refunded_amount REAL DEFAULT 0,
    used_amount REAL DEFAULT 0,
    remaining_amount REAL DEFAULT,
    
    issue_date TEXT NOT NULL
  );
`;

export const CREDIT_NOTE_ITEM_SCHEMA = `
  CREATE TABLE credit_note_items (
    id TEXT PRIMARY KEY,
    credit_note_id TEXT NOT NULL,
    invoice_item_id TEXT NOT NULL,

    description TEXT NOT NULL,

    credited_quantity REAL NOT NULL,
    unit_price REAL NOT NULL,
    tax_rate REAL DEFAULT 0,

    subtotal REAL NOT NULL,
    tax_amount REAL NOT NULL,
    total REAL NOT NULL,

    created_at INTEGER NOT NULL,

    FOREIGN KEY (credit_note_id)
      REFERENCES credit_notes(id),

    FOREIGN KEY (invoice_item_id)
      REFERENCES invoice_items(id)
  );
`;

export const DEBIT_NOTE_SCHEMA = `
  CREATE TABLE IF NOT EXISTS debit_notes (
    id TEXT PRIMARY KEY,
    business_id TEXT NOT NULL,
    invoice_id TEXT NOT NULL,
    debit_note_number TEXT NOT NULL,

    status TEXT NOT NULL DEFAULT 'draft',

    subtotal REAL NOT NULL,

    item_discount_amount
    invoice_discount_amount
    coupon_discount_amount

    tax REAL NOT NULL,
    total REAL NOT NULL,

    reason_code TEXT,
    reason_notes TEXT,

    refunded_amount REAL DEFAULT 0,
    used_amount REAL DEFAULT 0,
    remaining_amount REAL DEFAULT,
    
    issue_date TEXT NOT NULL
  );
`;

export const DEBIT_NOTE_ITEM_SCHEMA = `
  CREATE TABLE IF NOT EXISTS debit_note_items (
    id TEXT PRIMARY KEY,
    debit_note_id TEXT NOT NULL,
    invoice_item_id TEXT NOT NULL,

    description TEXT NOT NULL,

    credited_quantity REAL NOT NULL,
    unit_price REAL NOT NULL,
    tax_rate REAL DEFAULT 0,

    subtotal REAL NOT NULL,
    tax_amount REAL NOT NULL,
    total REAL NOT NULL,

    created_at INTEGER NOT NULL,

    FOREIGN KEY (credit_note_id)
      REFERENCES credit_notes(id),

    FOREIGN KEY (invoice_item_id)
      REFERENCES invoice_items(id)
  );
`;

export const INVOICE_FEEDBACK_SCHEMA = `
  CREATE TABLE IF NOT EXISTS invoice_feedback (
    invoice_id TEXT PRIMARY KEY,
    rating INTEGER,
    comment TEXT,
    reviewed_at TEXT,

    FOREIGN KEY (invoice_id)
      REFERENCES invoices(id)
  )
`;

export const INVOICE_DISPATCH_SCHEMA = `
  CREATE TABLE IF NOT EXISTS invoice_dispatch (
    invoice_id TEXT PRIMARY KEY,

    transport_mode TEXT CHECK(
      transport_mode IN (
        'road',
        'rail',
        'air',
        'sea',
        'courier',
        'other'
      )
    ),

    transporter_name TEXT,
    vehicle_number TEXT,
    transport_document_number TEXT,
    eway_bill_number TEXT,

    dispatch_date TEXT,
    expected_delivery_date TEXT,

    remarks TEXT,

    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    is_synced INTEGER DEFAULT 0
      CHECK (is_synced IN (0, 1)),

    FOREIGN KEY (invoice_id)
      REFERENCES invoices(id)
  )
`;

export const TABLES = {
  invoice_activities: `
    CREATE TABLE IF NOT EXISTS invoice_activities (
      id TEXT PRIMARY KEY,
      business_id TEXT NOT NULL,
      invoice_id TEXT NOT NULL,

      type TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,

      created_at TEXT NOT NULL
    )
  `,

  meta: `
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `,
};

// function resolveOrder(tables) {
//   const visited = new Set();
//   const result = [];

//   function visit(name) {
//     if (visited.has(name)) return;

//     const table = tables[name];

//     for (const dep of table.dependsOn) {
//       visit(dep);
//     }

//     visited.add(name);
//     result.push(name);
//   }

//   Object.keys(tables).forEach(visit);

//   return result;
// }

// const orderedTables = resolveOrder(TABLES);

// for (const name of orderedTables) {
//   await db.execAsync(TABLES[name].sql);
// }
