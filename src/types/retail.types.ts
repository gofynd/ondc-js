export interface SearchMessage {
  intent: {
    descriptor?: Descriptor;
    provider?: Provider;
    fulfillment?: Fulfillment;
    payment?: Payment;
    category?: Category;
    offer?: Offer;
    item?: Item;
    tags?: Tags;
  };
}

export interface OrderMessage {
  order: Order;
}

export interface SelectMessage extends OrderMessage {}
export interface InitMessage extends OrderMessage {}
export interface ConfirmMessage extends OrderMessage {}

export interface StatusMessage {
  order_id: Order["id"];
}

export interface TrackMessage {
  order_id: Order["id"];
  callback_url: string;
}

export interface CancelMessage {
  order_id: Order["id"];
  cancellation_reason_id: Option["id"];
  descriptor: Descriptor;
}

export interface UpdateMessage {
  update_target: string;
  order: Order;
}

export interface SupportMessage {
  ref_id: string;
}

export interface RatingMessage extends Rating {}

export interface OnSearchMessage {
  catalog: Catalog;
}

export interface OnSelectMessage {
  order?: {
    provider?: Provider;
    provider_location?: Location;
    items?: (Item & {
      quantity?: ItemQuantity;
    })[];
    add_ons?: AddOn[];
    offers?: Offer[];
    quote?: Quotation;
  };
}

export interface OnInitMessage {
  order: {
    provider?: {
      id?: Provider["id"];
    };
    provider_location?: {
      id?: Location["id"];
    };
    items?: {
      id?: Item["id"];
      quantity?: ItemQuantity["selected"];
    }[];
    add_ons?: {
      id?: AddOn["id"];
    }[];
    offers?: {
      id?: Offer["id"];
    }[];
    billing?: Billing;
    fulfillments?: Fulfillment[];
    quote?: Quotation;
    payment?: Payment;
  };
}

export interface OnConfirmMessage extends OrderMessage {}

export interface OnStatusMessage extends OrderMessage {}

export interface OnTrackMessage {
  tracking: Tracking;
}

export interface OnCancelMessage extends OrderMessage {}

export interface OnUpdateMessage extends OrderMessage {}

export interface OnSupportMessage {
  /** Format: phone */
  phone?: string;
  /** Format: email */
  email?: string;
  /** Format: uri */
  uri?: string;
}
