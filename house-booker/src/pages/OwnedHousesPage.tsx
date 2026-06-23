import { useParams } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import type { HouseReadOnly } from "../shared/types/house";
import { getHousesByOwnerId } from "../api/housesApi";
import HouseCard from "../shared/ui/HouseCard";

const OwnedHousesPage = () => {
    const ownerId = useParams().ownerId;
    const ownerIdNumber = ownerId ? Number(ownerId) : null;

    const [houses, setHouses] = useState<HouseReadOnly[]>([]);

    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated || user?.role !== "Owner" || user?.ownerId !== ownerIdNumber) {
        return <p>You are not authorized to view this page.</p>;
    }

    useEffect(() => {
        const fetchHouses = async () => {
            if (ownerIdNumber !== null) {
                const houses = await getHousesByOwnerId(ownerIdNumber);
                setHouses(houses);
            }
        };
        fetchHouses();
    }, [ownerIdNumber]);


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">My Owned Houses</h1>
            <div className="grid grid-cols-1 gap-4 mx-4 text-center">
                {houses.length > 0 ? (
                    houses.map((house) => (
                        <HouseCard key={house.id} {...house} />
                    ))
                ) : (
                    <p>No houses found.</p>
                )}
            </div>
        </>
    )
}
export default OwnedHousesPage;