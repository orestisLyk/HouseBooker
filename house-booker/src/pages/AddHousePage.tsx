import { Navigate, useNavigate } from "react-router";
import { createHouse } from "../api/housesApi";
import type { HouseCreate } from "../shared/types/house";

const AddHousePage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const address = formData.get("address") as string;
        const region = formData.get("region") as string;
        const pricePerNight = parseFloat(formData.get("pricePerNight") as string);

        const newHouse : HouseCreate = {
            name,
            description,
            address,
            region,
            pricePerNight
        };

        try {
            const returnedHouse = await createHouse(newHouse);
            navigate("/houses/" + returnedHouse.id, { replace: true });
        } catch (error) {
            console.error("Error creating house:", error);
            alert("An error occurred while creating the house. Please try again.");
        }
        

    }


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Add New House</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded shadow-md" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">House Name</label>
                    <input type="text" id="name" name="name" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea id="description" name="description" className="w-full p-2 border rounded"></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                    <input type="text" id="address" name="address" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="region" className="block text-gray-700 font-bold mb-2">Region</label>
                    <input type="text" id="region" name="region" className="w-full p-2 border rounded" />
                </div>
                <div className="mb-4">
                    <label htmlFor="pricePerNight" className="block text-gray-700 font-bold mb-2">Price Per Night</label>
                    <input type="number" id="pricePerNight" name="pricePerNight" className="w-full p-2 border rounded" />
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                    Add House
                </button>
            </form>
        </>
    )
}
export default AddHousePage;