import { Navigate, useNavigate } from "react-router";
import { createHouse } from "../api/housesApi";
import { HouseCreateSchema, type HouseCreate } from "../shared/types/house";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AddHousePage = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<HouseCreate>({
        resolver: zodResolver(HouseCreateSchema)
    })

    const onSubmit = async (data: HouseCreate) => {
        try {
            const newHouse = await createHouse(data);
            navigate("/houses/" + newHouse.id);
        } catch (error) {
            console.error("House creation failed:", error);
            alert("House creation failed. Please try again.");
        }
    };


    return (
        <>
            <h1 className="text-3xl font-bold mb-4">Add New House</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-bold mb-2">House Name</label>
                    <input type="text" id="name" {...register("name")} className="w-full p-2 border rounded" />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
                    <textarea id="description" {...register("description")} className="w-full p-2 border rounded"></textarea>
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700 font-bold mb-2">Address</label>
                    <input type="text" id="address" {...register("address")} className="w-full p-2 border rounded" />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="region" className="block text-gray-700 font-bold mb-2">Region</label>
                    <input type="text" id="region" {...register("region")} className="w-full p-2 border rounded" />
                    {errors.region && <p className="text-red-500 text-sm mt-1">{errors.region.message}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="pricePerNight" className="block text-gray-700 font-bold mb-2">Price Per Night</label>
                    <input type="number" id="pricePerNight" {...register("pricePerNight")} className="w-full p-2 border rounded" />
                    {errors.pricePerNight && <p className="text-red-500 text-sm mt-1">{errors.pricePerNight.message}</p>}
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                    Add House
                </button>
            </form>
        </>
    )
}
export default AddHousePage;