import { Link, useParams } from "react-router";
import { getHouseById } from "../api/housesApi";
import type { HouseReadOnly } from "../shared/types/house";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const HouseDetailsPage = () => {

    const { user, isAuthenticated } = useAuth();

    const id = useParams().id;
    const [houseReadOnly, setHouseReadOnly] = useState<HouseReadOnly | null>(null);

    useEffect(() => {
        const fetchHouse = async () => {
            const house = await getHouseById(id as string);
            setHouseReadOnly(house);
        };
        fetchHouse();
        console.log("Images:", houseReadOnly?.imageUrls);
    }, [id]);

    return (
        <>
            <h1 className="text-3xl font-bold mb-4 mx-4">{houseReadOnly?.name}</h1>
            <div className="mb-4 mx-4">
                {houseReadOnly?.imageUrls && houseReadOnly.imageUrls.length > 0 && houseReadOnly.imageUrls.map((url, index) => (
                    <img key={index} src={url} alt={`${houseReadOnly.name} ${index + 1}`} className="w-lg h-auto object-cover rounded mb-4" />
                ))}
            </div>
            <p className="text-gray-600 mb-2 mx-4">{houseReadOnly?.description}</p>
            <p className="text-gray-600 mb-2 mx-4">{houseReadOnly?.address}, {houseReadOnly?.region}</p>
            <p className="text-gray-800 font-semibold mx-4">€{houseReadOnly?.pricePerNight} per night</p>
            {isAuthenticated && user?.role === "Owner" && user.ownerId === houseReadOnly?.ownerId && (
                <>
                    <button className=" mx-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark mt-4">Delete</button>
                    <Link to={"/houses/" + houseReadOnly?.id + "/createImage"} className="mx-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark mt-4 ml-2">Add Image</Link>
                    <Link to={"/bookings/by-house/" + houseReadOnly?.id} className="mx-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark mt-4 ml-2">View Bookings</Link>
                </>
            )}
            {isAuthenticated && user?.role === "Renter" && (
                <Link to={"/houses/" + houseReadOnly?.id + "/book"} className="block w-sm mx-4 bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark mt-4">Book Now</Link>
            )}
        </>
    )
}
export default HouseDetailsPage;