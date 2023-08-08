/* eslint-disable max-len */
type Image = string;
type Duration = string;
type Rateable = boolean;
// type Rating = number;
type DecimalValue = string | number;
type Gps = string;

/** @description Describes the name of a person in format: ./{given_name}/{honorific_prefix}/{first_name}/{middle_name}/{last_name}/{honorific_suffix} */
type Name = string;

/* eslint-disable */
/** @description Describes an order executor */
type Agent = Person &
  Contact & {
    rateable?: Rateable;
  };
/* eslint-disable */

interface Descriptor {
  name?: string;
  code?: string;
  symbol?: string;
  short_desc?: string;
  long_desc?: string;
  images?: Image[];
  /** Format: uri */
  audio?: string;
  /** Format: uri */
  "3d_render"?: string;
}

interface Schedule {
  frequency?: Duration;
  holidays?: string[];
  times?: string[];
}

interface Time {
  label?: string;
  /** Format: date-time */
  timestamp?: string | number;
  duration?: Duration;
  range?: {
    /** Format: date-time */
    start?: string;
    /** Format: date-time */
    end?: string;
  };
  /** @description comma separated values representing days of the week */
  days?: string;
  schedule?: Schedule;
}
interface Tags {
  [key: string]: string | undefined;
}

interface Category {
  /** @description Unique id of the category */
  id?: string | number;
  parent_category_id?: Category["id"];
  descriptor?: Descriptor;
  time?: Time;
  tags?: Tags;
}

interface Price {
  currency: string;
  value: DecimalValue;
  estimated_value?: DecimalValue;
  computed_value?: DecimalValue;
  listed_value?: DecimalValue;
  offered_value?: DecimalValue;
  minimum_value?: DecimalValue;
  maximum_value?: DecimalValue;
}
interface Address {
  /** @description Door / Shop number of the address */
  door?: string;
  /** @description Name of address if applicable. Example, shop name */
  name?: string;
  /** @description Name of the building or block */
  building?: string;
  /** @description Street name or number */
  street?: string;
  /** @description Name of the locality, apartments */
  locality?: string | null;
  /** @description Name or number of the ward if applicable */
  ward?: string | null;
  /** @description City name */
  city?: string;
  /** @description State name */
  state?: string;
  /** @description Country name */
  country?: string;
  /** @description Area code. This can be Pincode, ZIP code or any equivalent */
  area_code?: string;
}

/** @description An object representing a scalar quantity. */
interface Scalar {
  /** @enum {string} */
  type?: "CONSTANT" | "VARIABLE";
  value: string | number;
  estimated_value?: number;
  computed_value?: number;
  range?: {
    min?: number;
    max?: number;
  };
  unit: string;
}

interface Circle {
  gps: Gps;
  radius: Scalar;
}

/** @description Describes a city */
interface City {
  /** @description Name of the city */
  name?: string;
  /** @description Codification of city code will be using the std code e.g. Bengaluru city code 'std:080' */
  code?: string;
}

/** @description Describes a country. */
interface Country {
  /** @description Name of the country */
  name?: string;
  /** @description Country code as per ISO 3166 Alpha-3 code format */
  code?: string;
}

interface Location {
  id?: string;
  descriptor?: "Descriptor";
  gps?: Gps;
  address?: Address;
  station_code?: string;
  city?: City;
  country?: Country;
  circle?: Circle;
  polygon?: string;
  "3dspace"?: string;
  time?: Time;
}

/** @description Describes a state */
interface State {
  descriptor?: Descriptor;
  /** Format: date-time */
  updated_at?: string;
  /** @description ID of entity which changed the state */
  updated_by?: string;
}

/** @description Describes a person. */
interface Person {
  name?: Name;
  image?: Image;
  /** Format: date */
  dob?: string;
  /** @description Gender of something, typically a Person, but possibly also fictional characters, animals, etc. While Male and Female may be used, text strings are also acceptable for people who do not identify as a binary gender */
  gender?: string;
  cred?: string;
  tags?: Tags;
}

interface Contact {
  phone?: string;
  email?: string;
  tags?: Tags;
}

/** @description Describes an authorization mechanism */
interface Authorization {
  /** @description Type of authorization mechanism used */
  type?: string;
  /** @description Token used for authorization */
  token?: string;
  /**
   * Format: date-time
   * @description Timestamp in RFC3339 format from which token is valid
   */
  valid_from?: string;
  /**
   * Format: date-time
   * @description Timestamp in RFC3339 format until which token is valid
   */
  valid_to?: string;
  /** @description Status of the token */
  status?: string;
}

/** @description Describes the properties of a vehicle used in a mobility service */
interface Vehicle {
  category?: string;
  capacity?: number;
  make?: string;
  model?: string;
  size?: string;
  variant?: string;
  color?: string;
  energy_type?: string;
  registration?: string;
}

/** @description Describes how a single product/service will be rendered/fulfilled to the end customer. state can have following values - "Searching-for-Agent", "Assigned-Agent", "En-route-to-drop", "At-pickup-location", "At-drop-location", "Delivered-package", "Cancelled-package", "Returned-package" */
interface Fulfillment {
  /** @description Unique reference ID to the fulfillment of an order */
  id?: string;
  /**
   * @description This describes the type of fulfillment ("Pickup" - Buyer picks up from store by themselves or through their logistics provider; "Delivery" - seller delivers to buyer)
   * @enum {string}
   */
  type?: "Pickup" | "Delivery" | "Delivery and Pickup" | "Self-Pickup" | "Delivery and Self-Pickup" | "Reverse QC";
  provider_id?: Provider["id"];
  rating?: Rating["value"];
  state?: State;
  /**
   * @description Indicates whether the fulfillment allows tracking
   * @default false
   */
  tracking?: boolean;
  customer?: {
    person?: Person;
    contact?: Contact;
  };
  agent?: Agent;
  person?: Person;
  contact?: Contact;
  vehicle?: Vehicle;
  /** @description Details on the start of fulfillment */
  start?: {
    location?: Location;
    time?: Time;
    instructions?: Descriptor;
    contact?: Contact;
    person?: Person;
    authorization?: Authorization;
  };
  /** @description Details on the end of fulfillment */
  end?: {
    location?: Location;
    time?: Time;
    instructions?: Descriptor;
    contact?: Contact;
    person?: Person;
    authorization?: Authorization;
  };
  rateable?: Rateable;
  tags?: Tags;
}

interface Item {
  id: string | number;
  parent_item_id?: Item["id"];
  descriptor?: Descriptor;
  price?: Price;
  category_id?: Category["id"];
  fulfillment_id?: Fulfillment["id"];
  rating?: Rating["value"];
  location_id?: Location["id"];
  time?: Time;
  rateable?: Rateable;
  matched?: boolean;
  related?: boolean;
  recommended?: boolean;
  /** @description whether the item is returnable */
  "./ondc-returnable"?: boolean;
  /** @description in case of return, whether the item should be picked up by seller */
  "./ondc-seller_pickup_return"?: boolean;
  /** @description return window for the item in ISO8601 durations format e.g. 'PT24H' indicates 24 hour return window */
  "./ondc-return_window"?: string;
  /** @description whether the item is cancellable */
  "./ondc-cancellable"?: boolean;
  /** @description time from order confirmation by which item ready to ship in ISO8601 durations format e.g. 'PT2H' indicates item ready to ship in 2 hrs */
  "./ondc-time_to_ship"?: string;
  /** @description whether the catalog item is available on COD */
  "./ondc-available_on_cod"?: boolean;
  /** @description <br> mandatory attributes include the following<br> common_or_generic_name_of_commodity<br> net_quantity_or_measure_of_commodity_in_pkg<br> month_year_of_manufacture_packing_import<br> contact_details_consumer_care<br> */
  "./ondc-statutory_reqs_packaged_commodities"?: {
    /** @description name of manufacturer or packer (in case manufacturer is not the packer) or name of importer for imported goods */
    manufacturer_or_packer_name?: string;
    /** @description address of manufacturer or packer (in case manufacturer is not the packer) or address of importer for imported goods */
    manufacturer_or_packer_address?: string;
    /** @description common or generic name of commodity */
    common_or_generic_name_of_commodity?: string;
    /** @description for packages with multiple products, the name and number of quantity of each (can be shown as "name1-number_or_quantity; name2-number_or_quantity..") */
    multiple_products_name_number_or_qty?: string;
    /** @description net quantity of commodity in terms of standard unit of weight or measure of commodity contained in package */
    net_quantity_or_measure_of_commodity_in_pkg?: string;
    /** @description month and year of manufacture or packing or import */
    month_year_of_manufacture_packing_import?: string;
    /** @description country of origin for imported products (ISO 3166 Alpha-3 code format) */
    imported_product_country_of_origin?: string;
    /** @description name, address, telephone no, email of person or office for contacting for consumer complaints (can be shown as name-"name of person or office; email-"email address";..) */
    contact_details_consumer_care?: string;
  };
  /** @description <br> mandatory attributes include the following<br> ingredients_info<br> nutritional_info<br> additives_info<br> net_quantity<br> contact_details_consumer_care<br> */
  "./ondc-statutory_reqs_prepackaged_food"?: {
    /** @description list of ingredients (except single ingredient foods), can be shown as ingredient (with percentage); ingredient (with percentage);..)<br> e.g. "Puffed Rice (40%); Split Green Gram (20%); Ground Nuts (20%);.." */
    ingredients_info?: string;
    /** @description nutritional info (can be shown as nutritional info (with unit, per standard unit, per serving);..)<br> e.g. "Energy(KCal) - (per 100kg) 420, (per serving 50g) 250; Protein(g) - (per 100kg) 12, (per serving 50g)6;.." */
    nutritional_info?: string;
    /** @description food additives together with specific name or recognized International Numbering System (can be shown as additive1-name or number;additive2-name or number;..) */
    additives_info?: string;
    /** @description name of manufacturer or packer (for non-retail containers) */
    manufacturer_or_packer_name?: string;
    /** @description address of manufacturer or packer (for non-retail containers) */
    manufacturer_or_packer_address?: string;
    /** @description name of brand owner */
    brand_owner_name?: string;
    /** @description address of brand owner */
    brand_owner_address?: string;
    /** @description FSSAI logo of brand owner (url based image e.g. uri:http://path/to/image) */
    brand_owner_FSSAI_logo?: string;
    /** @description FSSAI license no of brand owner */
    brand_owner_FSSAI_license_no?: string;
    /** @description FSSAI license no of manufacturer or marketer or packer or bottler if different from brand owner */
    other_FSSAI_license_no?: string;
    /** @description net quantity */
    net_quantity?: string;
    /** @description name of importer */
    importer_name?: string;
    /** @description address of importer */
    importer_address?: string;
    /** @description FSSAI logo of importer (url based image e.g. uri:http://path/to/image) */
    importer_FSSAI_logo?: string;
    /** @description FSSAI license no of importer */
    importer_FSSAI_license_no?: string;
    /** @description country of origin for imported products (ISO 3166 Alpha-3 code format) */
    imported_product_country_of_origin?: string;
    /** @description name of importer for product manufactured outside but packaged or bottled in India */
    other_importer_name?: string;
    /** @description address of importer for product manufactured outside but packaged or bottled in India */
    other_importer_address?: string;
    /** @description premises where product manufactured outside are packaged or bottled in India */
    other_premises?: string;
    /** @description country of origin for product manufactured outside but packaged or bottled in India (ISO 3166 Alpha-3 code format) */
    other_importer_country_of_origin?: string;
    /** @description name, address, telephone no, email of person or office for contacting for consumer complaints (can be shown as name-"name of person or office; email-"email address";..) */
    contact_details_consumer_care?: string;
  };
  tags?: Tags;
}

interface ItemQuantity {
  allocated?: {
    count: string | number;
    measure?: Scalar;
  };
  available?: {
    count: string | number;
    measure?: Scalar;
  };
  maximum?: {
    count: string | number;
    measure?: Scalar;
  };
  minimum?: {
    count: string | number;
    measure?: Scalar;
  };
  selected?: {
    count: string | number;
    measure?: Scalar;
  };
}

interface Offer {
  id?: string;
  descriptor?: Descriptor;
  location_ids?: Location["id"][];
  category_ids?: Category["id"][];
  item_ids?: Item["id"][];
  time?: Time;
}

interface settlementDetails {
  /** @enum {string} */
  settlement_counterparty?: "buyer-app" | "seller-app" | "logistics-provider";
  /** @enum {string} */
  settlement_phase?: "sale-amount" | "withholding-amount";
  /** @enum {string} */
  settlement_type?: "neft" | "rtgs" | "upi";
  settlement_bank_account_no?: string;
  settlement_ifsc_code?: string;
  /** @description UPI payment address e.g. VPA */
  upi_address?: string;
  /** @enum {string} */
  settlement_status?: "PAID" | "NOT-PAID";
  /** @description Settlement transaction reference number */
  settlement_reference?: string;
  /**
   * Format: date-time
   * @description Settlement transaction timestamp
   */
  settlement_timestamp?: string;
}
interface Payment {
  /**
   * Format: uri
   * @description A payment uri to be called by the Buyer App. If empty, then the payment is to be done offline. The details of payment should be present in the params object. If ```tl_method``` = http/get, then the payment details will be sent as url params. Two url param values, ```$transaction_id``` and ```$amount``` are mandatory. And example url would be : https://www.example.com/pay?txid=$transaction_id&amount=$amount&vpa=upiid&payee=shopez&billno=1234
   */
  uri?: string;
  /** @enum {string} */
  tl_method?: "http/get" | "http/post" | "payto" | "upi";
  params?: {
    /** @description This value will be placed in the the $transaction_id url param in case of http/get and in the requestBody http/post requests */
    transaction_id?: string;
    transaction_status?: string;
    amount?: DecimalValue & undefined;
    currency?: Price["currency"];
    [key: string]: string | undefined;
  };
  /** @enum {string} */
  type?: "ON-ORDER" | "PRE-FULFILLMENT" | "ON-FULFILLMENT" | "POST-FULFILLMENT";
  /** @enum {string} */
  status?: "PAID" | "NOT-PAID" | "PENDING";
  time?: Time;
  /** @enum {string} */
  collected_by?: "BAP" | "BPP";
  /** @enum {string} */
  "./ondc-collected_by_status"?: "Assert" | "Agree" | "Disagree" | "Terminate";
  /** @enum {string} */
  "./ondc-buyer_app_finder_fee_type"?: "Amount" | "Percent";
  "./ondc-buyer_app_finder_fee_amount"?: DecimalValue;
  "./ondc-withholding_amount"?: DecimalValue;
  /** @enum {string} */
  "./ondc-withholding_amount_status"?: "Assert" | "Agree" | "Disagree" | "Terminate";
  /** @description return window for the item in ISO8601 durations format e.g. 'PT24H' indicates 24 hour return window */
  "./ondc-return_window"?: string;
  /** @enum {string} */
  "./ondc-return_window_status"?: "Assert" | "Agree" | "Disagree" | "Terminate";
  /**
   * @description In case of prepaid payment, whether settlement between counterparties should be on the basis of collection, shipment or delivery
   * @enum {string}
   */
  "./ondc-settlement_basis"?: "Collection" | "Shipment" | "Delivery";
  /** @enum {string} */
  "./ondc-settlement_basis_status"?: "Assert" | "Agree" | "Disagree" | "Terminate";
  /** @description return window for the item in ISO8601 durations format e.g. 'PT24H' indicates 24 hour return window */
  "./ondc-settlement_window"?: string;
  /** @enum {string} */
  "./ondc-settlement_window_status"?: "Assert" | "Agree" | "Disagree" | "Terminate";
  "./ondc-settlement_details"?: settlementDetails[];
}

interface Provider {
  /** @description Id of the provider */
  id: string | number;
  descriptor?: Descriptor;
  /** @description Category Id of the provider */
  category_id?: string;
  rating?: Rating["value"];
  time?: Time;
  categories?: Category[];
  fulfillments?: Fulfillment[];
  payments?: Payment[];
  locations?: (Location & {
    rateable?: Rateable;
  })[];
  offers?: Offer[];
  items?: (Item & {
    quantity?: ItemQuantity;
  })[];
  /**
   * Format: date-time
   * @description Time after which catalog has to be refreshed
   */
  exp?: string;
  rateable?: Rateable;
  tags?: Tags;
}

interface Catalog {
  "bpp/descriptor"?: Descriptor;
  "bpp/categories"?: Category[];
  "bpp/fulfillments"?: Fulfillment[];
  "bpp/payments"?: Payment[];
  "bpp/offers"?: Offer[];
  "bpp/providers": Provider[];
  /**
   * Format: date-time
   * @description Time after which catalog has to be refreshed
   */
  exp?: string;
}

/** @description Describes an add-on */
interface AddOn {
  /** @description ID of the add-on. This follows the syntax {item.id}/add-on/{add-on unique id} for item specific add-on OR */
  id?: string;
  descriptor?: Descriptor;
  price?: Price;
}

interface Organization {
  name?: string;
  cred?: string;
}

/** @description Describes a billing event */
interface Billing {
  /** @description Personal details of the customer needed for billing. */
  name: string;
  organization?: Organization;
  address?: Address;
  /** Format: email */
  email?: string;
  phone: string;
  time?: Time;
  /** @description GST number */
  tax_number?: string;
  /** Format: date-time */
  created_at?: string;
  /** Format: date-time */
  updated_at?: string;
}

interface Policy {
  id?: string;
  descriptor?: Descriptor;
  parent_policy_id?: Policy["id"];
  time?: Time;
}

interface Option {
  id?: string;
  descriptor?: Descriptor;
}

/** @description Describes a cancellation event */
interface Cancellation {
  /** @enum {string} */
  type?: "full" | "partial";
  ref_id?: string;
  policies?: Policy[];
  /** Format: date-time */
  time?: string;
  cancelled_by?: string;
  reasons?: Option;
  selected_reason?: {
    id?: Option["id"];
  };
  additional_description?: Descriptor;
}

/** @description Describes a feedback form that a Seller App can send to get feedback from the Buyer App */
type FeedbackForm = FeedbackFormElement[];

/** @description An element in the feedback form. It can be question or an answer to the question. */
interface FeedbackFormElement {
  id?: string;
  parent_id?: FeedbackFormElement["id"];
  /** @description Specifies the question to which the answer options will be contained in the child FeedbackFormElements */
  question?: string;
  /** @description Specifies an answer option to which the question will be in the FeedbackFormElement specified in parent_id */
  answer?: string;
  /**
   * @description Specifies how the answer option should be rendered.
   * @enum {string}
   */
  answer_type?: "radio" | "checkbox" | "text";
}

/** @description This value will be placed in the the $feedback_id url param in case of http/get and in the requestBody http/post requests */
interface FeedbackUrlParams {
  feedback_id: string;
  [key: string]: string | undefined;
}

/** @description Describes how a feedback URL will be sent by the Seller App */
interface FeedbackUrl {
  /**
   * Format: uri
   * @description feedback URL sent by the Seller App
   */
  url?: string;
  /** @enum {string} */
  tl_method?: "http/get" | "http/post";
  params?: FeedbackUrlParams;
}

/** @description Describes the rating of a person or an object. */
interface Rating {
  /** @description Category of the object being rated */
  rating_category?: string;
  /** @description Id of the object being rated */
  id?: string;
  /** @description Rating value given to the object (1 - Poor; 2 - Needs improvement; 3 - Satisfactory; 4 - Good; 5 - Excellent) */
  value?: number;
  feedback_form?: FeedbackForm;
  feedback_id?: FeedbackUrlParams["feedback_id"];
}

interface Quotation {
  price?: Price;
  breakup: {
    title?: string;
    price?: Price;
  }[];
  ttl?: Duration;
}

interface Order {
  /** @description Hash of order object without id<br> Will be created by buyer app in confirm API */
  id?: number | string;
  /** @enum {string} */
  state?:
    | "Created"
    | "Active"
    | "Accepted"
    | "In-progress"
    | "Completed"
    | "Packed"
    | "Shipped"
    | "Out-for-delivery"
    | "Delivered"
    | "Updated"
    | "Returned"
    | "Replaced"
    | "Cancelled";
  provider?: {
    id?: Provider["id"];
    locations?: {
      id: Location["id"];
    }[];
  };
  items?: {
    id: Item["id"];
    quantity?: ItemQuantity["selected"];
  }[];
  add_ons?: {
    id: AddOn["id"];
  }[];
  offers?: {
    id: Offer["id"];
  }[];
  documents?: Document[];
  billing?: Billing;
  fulfillments?: Fulfillment[];
  quote?: Quotation;
  payment?: Payment;
  /** Format: date-time */
  created_at?: string;
  /** Format: date-time */
  updated_at?: string;
  "./ondc-cancellation"?: Cancellation;
  /** @description payload for cascaded orders e.g. order for logistics services linked to a retail order */
  "./ondc-linked_orders"?: {
    id?: string;
  }[];
}

interface Tracking {
  /** Format: uri */
  url?: string;
  /** @enum {string} */
  status?: "active" | "inactive" | "Active";
}
