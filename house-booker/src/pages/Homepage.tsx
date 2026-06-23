import { useEffect, useState } from "react";
import { getHouses } from "../api/housesApi";
import type { HouseReadOnly } from "../shared/types/house";
import HouseCard from "../shared/ui/HouseCard";

const Homepage = () => {

    const [houses, setHouses] = useState<HouseReadOnly[]>([]);

    useEffect(() => {
        const fetchHouses = async () => {
            const houses = (await getHouses(1, 10)).data;
            setHouses(houses);
            console.log("Fetched houses:", houses);
            console.log("TYPE:", typeof houses);
            console.log("IS ARRAY:", Array.isArray(houses));
            console.log("VALUE:", houses);
        };
        fetchHouses();
    }, []);

    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Available Houses</h1>
            <div className="grid grid-cols-1 gap-4 mx-4 text-center">
                {houses.length > 0 && houses.map((house) => (
                    <HouseCard key={house.id} {...house} />
                ))}
            </div>

        </>
    )
}
export default Homepage;