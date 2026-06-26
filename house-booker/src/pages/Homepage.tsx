import { useEffect, useState } from "react";
import { getHouses } from "../api/housesApi";
import type { HouseReadOnly } from "../shared/types/house";
import HouseCard from "../shared/ui/HouseCard";
import Pagination from "../shared/ui/Pagination";

const Homepage = () => {

    const [houses, setHouses] = useState<HouseReadOnly[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);


    useEffect(() => {
        const fetchHouses = async () => {
            const houses = (await getHouses(1, 5));
            setHouses(houses.data);
            setTotalPages(houses.totalPages);
        };
        fetchHouses();
    }, []);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
        const fetchHouses = async () => {
            const houses = (await getHouses(page, 5));
            setHouses(houses.data);
            setTotalPages(houses.totalPages);
        };
        fetchHouses();
    };


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Available Houses</h1>
            <div className="grid grid-cols-1 gap-4 mx-4 text-center">
                {houses.length > 0 && houses.map((house) => (
                    <HouseCard key={house.id} {...house} />
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </>
    )
}
export default Homepage;