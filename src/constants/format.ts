/**
 * 
 */

export const FORMAT_VALIDATORS = {
  email: {
    regex: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/,
    message: "Enter a valid email address.",
  },
  phone: {
    regex: /^[6-9]\d{9}$/,
    message: "Enter a valid phone number.",
  },
  gstin: {
    regex: /^(0[1-9]|1[0-9]|2[0-467]|29|3[0-8]|97|99)[A-Z]{3}[CHPFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    message: "Enter a valid GSTIN.",
  },
  pan: {
    regex: /^[A-Z]{5}[0-9]{4}[A-Z]$/,
    message: "Enter a valid PAN.",
  },
  ifsc: {
    regex: /^[A-Z]{4}0[A-Z0-9]{6}$/,
    message: "Enter a valid IFSC code.",
  },
  pincode: {
    regex: /^[1-9][0-9]{5}$/,
    message: "Enter a valid PIN code.",
  },
} as const;


/**
 * 
 * GSTIN Structure :
 *  - First 2 Characters (State Code): Shows exactly where the company sits. For example, 09 means Uttar Pradesh and 27 identifies Maharashtra.
 *  - Next 10 Characters (PAN): This is the direct Income Tax Permanent Account Number belonging to the individual or business entity.
 *  - 13th Character (Entity Code): Tracks the total number of physical business branches registered within that single state using the exact same PAN. The very first registry gets assigned a 1, the second branch gets a 2, and it scales up through alphabets if a company has more than 9 setups.
 *  - 14th Character (Fixed Literal): This is always hardcoded as the letter Z for standard businesses.
 *  - 15th Character (Checksum): A variable character computed dynamically by an internal verification math formula to instantly spot typos or validation mistakes.
 */

/**
 * 
 * A PAN is a 10-character alphanumeric string structured precisely as:
 * 
 * PAN Structure
 * - [A-Z]{3}: The first 3 characters are sequential alpha series running from AAA to ZZZ.
 * - [A-Z]{1}: The 4th character represents the Status of the Taxpayer (e.g., P for Individual, C for Company, F for Firm, H for HUF).
 * - [A-Z]{1}: The 5th character is the First Character of the Surname (for individuals) or the Entity's Name.
 * - [0-9]{4}: Four sequential numbers from 0001 to 9999.
 * - [A-Z]{1}: A final alphabetic check digit.
 */

/**
 * 
 * C – Company
 * H – Hindu Undivided Family (HUF)
 * B – Body of Individuals (BOI)
 * P – Individual / Person
 * F – Firm / Limited Liability Partnership (LLP)
 * A – Association of Persons (AOP)
 * T – TrustB – (Included twice in the block, which is safe but redundant. You can write it as a single B)
 * L – Local AuthorityJ – Artificial Juridical Person
 * G – Government Agency
 */






