import { Link } from "react-router";
import type { HouseReadOnly } from "../types/house";

const HouseCard = ({
    id,
    name,
    description,
    address,
    region,
    pricePerNight,
    imageUrls
}: HouseReadOnly) => {

    return (
        <>
            <Link to={`/houses/${id}`} className="block mb-4">
                <div className="mb-2 border p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
                    {imageUrls && imageUrls.length > 0 && (
                        <img src={imageUrls[0]} alt={name} className="w-full h-48 object-cover rounded mb-4" />
                    )}
                    <h2 className="text-xl font-semibold mb-2">{name}</h2>
                    <p className="text-gray-600 mb-2">{description}</p>
                    <p className="text-gray-600 mb-2">{address}, {region}</p>
                    <p className="text-gray-800 font-semibold">€{pricePerNight} per night</p>
                </div>
            </Link>

        </>
    )
}

export default HouseCard;