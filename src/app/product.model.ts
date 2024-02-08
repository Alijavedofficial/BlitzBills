export interface Product {
    sku: string;
    name: string;
    category: string;
    quantity: number;
    unitPrice: number;
    vatPercentage: number;
    vatAmount: number;
    grossTotal: number;
    clientName: string ;
    contactPerson: string  ;
    shippingAddress: string ;
    clientEmail: string ;
    shippingAddressType: string ;
  }

  export interface Client {
    name: string;
    referenceCode: string;
    currency: string;
    contactPerson?: string;
    email?: string;
    // Add other client properties as needed
  }

 export interface ClientDetails {
    referenceCode: string;
    currency: string;
    name: string;
    contactPerson: string;
    email: string;
    // Add other properties as needed
  }
  