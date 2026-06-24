import api from "./axios";

export const createImage = async (houseId: string, imageFile: File): Promise<string> => {
    const formData = new FormData();
    formData.append("houseId", houseId);
    formData.append("File", imageFile);
    const response = await api.post<string>(`/house-images`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;

}