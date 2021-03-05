class Product {
  constructor(id, ownerId, title, imageUrl, description, price) {
    this.id = id;
    this.ownerId = ownerId;
    this.imageUrl = imageUrl;
    this.title = title;
    this.description = description;
    this.price = price;
  }
}

const data = [
  {
    address: "Vicente Guerrero 411, Centro",
    business_line: "Services",
    business_name: "Ciber Nadia",
    close_hour: "2000-01-01T20:00:00.000Z",
    created_at: "2021-02-18T23:14:30.608Z",
    district: "Colima",
    id: 1,
    latitud: 19.231114701112165,
    longitud: -103.7331146845459,
    open_hour: "2000-01-01T11:00:00.000Z",
    payment: "Credit Card",
    pickup_type: "Envió",
    postcode: 28000,
    selling: "Servicios de Computación",
    service_days: "Lunes a Viernes",
    updated_at: "2021-02-18T23:14:30.608Z",
    user_id: 1,
  },
  {
    address: "Jardín Cuauhtémoc 105, Zona Centro Sur",
    business_line: "Food",
    business_name: 'Pollos a la Leña "Torchic"',
    close_hour: "2000-01-01T17:00:00.000Z",
    created_at: "2021-02-18T23:18:37.424Z",
    district: "Guanajuato",
    id: 2,
    latitud: 20.447457,
    longitud: -100.62965009999999,
    open_hour: "2000-01-01T09:00:00.000Z",
    payment: "Efectivo",
    pickup_type: "Entrega en establecimiento",
    postcode: 38500,
    selling: "Pollos a la leña",
    service_days: "Lunes a Domingo",
    updated_at: "2021-02-18T23:18:37.424Z",
    user_id: 1,
  },
  {
    address:
      "Plaza San Miguel, Av. Constitución 2035, Local 11-20, Planta Alta, Santa Gertrudis",
    business_line: "Products",
    business_name: "MagmaLabs",
    close_hour: "2000-01-01T19:00:00.000Z",
    created_at: "2021-02-18T23:22:22.808Z",
    district: "Colima",
    id: 3,
    latitud: 19.265055022680972,
    longitud: -103.71099475367265,
    open_hour: "2000-01-01T09:00:00.000Z",
    payment: "Tarjeta de crédito y Efectivo",
    pickup_type: "Envió a domilio, Entrega en establecimiento",
    postcode: 28017,
    selling: "Desarrollo de Software",
    service_days: "Lunes a Viernes",
    updated_at: "2021-02-18T23:22:22.808Z",
    user_id: 1,
  },
];

export default Product;
