import api from "./axios";

export const getUsers = async (page: number, pageSize: number) => {
    const response = await api.get(`/users`, {
        params: {
            page,
            pageSize
        }
    });
    return response.data;
};

export const deleteUser = async (userId: number) => {
    await api.delete(`/users/${userId}`);
}