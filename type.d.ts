type CollectionType = {
    length: number;
    map(arg0: (collections: CollectionType) => React.JSX.Element): React.ReactNode;
    _id: string;
    title: string;
    image: string;
    description: string;
    products: CollectionType[];
  };

  type ProductsType = {
    [x: string]: any;
    
    _id: string;
    title: string;
    barcode: string;
    category:string;
    description: string;
    media: [string];
    collections:[CollectionType];
    tags: [string];
    sizes: [string];
    colors: [string];
    price: string;
    expense :string;
    createdAt : Date;
    updatedAt : Date;
  
  }

  type WishlistType ={
    userId : String,
    wishlist : [string],
    createdAt : string,
    updatedAt : string
  }

 