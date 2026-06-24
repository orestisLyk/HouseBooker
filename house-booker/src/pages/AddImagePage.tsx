import { useNavigate, useParams } from "react-router";
import { createImage } from "../api/HouseImagesApi";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import { getHouseById } from "../api/housesApi";
import { imageSchema } from "../shared/types/image";
import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import { useForm } from "react-hook-form";

const AddImagePage = () => {
    const navigate = useNavigate();

    const { user } = useAuth();
    const houseId = useParams().houseId as string;

        useEffect(() => {
            const checkOwnership = async () => {
                const houseReadOnly = await getHouseById(houseId);
                if(user?.ownerId !== houseReadOnly?.ownerId) {
                    navigate("/houses/" + houseId);
                }
            };
            checkOwnership();
        },[user])

        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: zodResolver(imageSchema),
        });

        const onSubmit = async (data: any) => {
            try {
                const url = await createImage(houseId, data.image);
                navigate("/houses/" + houseId);
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Image upload failed. Please try again.");
            }
        };


    return (
        <>
            <h1 className="text-3xl font-bold mb-4 mx-4">Add Image</h1>
            <form className="max-w-md mx-auto bg-white p-6 rounded shadow-md" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-bold mb-2">Image</label>
                    <input type="file" id="image" className="w-full p-2 border rounded" {...register("image")} />
                    {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                </div>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark">
                    Upload Image
                </button>
            </form>
        </>
    )
}
export default AddImagePage;