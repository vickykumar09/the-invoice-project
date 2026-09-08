export const PURCHASE_TYPES = [
  {
    id: 1,
    label: "Walk-in",
    value: "WALK_IN",
  },
  {
    id: 2,
    label: "In-Store",
    value: "IN_STORE",
  },
  {
    id: 3,
    label: "Online",
    value: "ONLINE",
  },
  {
    id: 4,
    label: "Phone Order",
    value: "PHONE_ORDER",
  },
  {
    id: 5,
    label: "WhatsApp",
    value: "WHATSAPP",
  },
  {
    id: 6,
    label: "Marketplace",
    value: "MARKETPLACE",
  },
  {
    id: 7,
    label: "Distributor",
    value: "DISTRIBUTOR",
  },
  {
    id: 8,
    label: "Dealer",
    value: "DEALER",
  },
  {
    id: 9,
    label: "Home Delivery",
    value: "HOME_DELIVERY",
  },
  {
    id: 10,
    label: "Other",
    value: "OTHER",
  },
] as const;

export const PURCHASE_TYPES_VALUES = PURCHASE_TYPES.map(option => option.value);