import React from "react";

interface Property {
  id: string;
  name: string;
  description: string;
  price: number;
}

interface PropertyDetailProps {
  property: Property;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
  return (
    <div>
      <h1>{property.name}</h1>
      <p>{property.description}</p>
      <p>Price: ${property.price}</p>
    </div>
  );
};

export default PropertyDetail;
