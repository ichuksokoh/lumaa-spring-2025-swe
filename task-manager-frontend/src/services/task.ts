import API from './api';

export const getTasks = async () => {
  const response = await API.get('/tasks');
  return response.data;
};

export const createTask = async (title: string, description: string) => {
  return API.post('/tasks', { title, description });
};

export const updateTask = async (id: number, title: string, description: string, isComplete: boolean) => {
    return API.put(`/tasks/${id}`, { title, description, isComplete});
}

export const deleteTask = async (id: number) => {
    return API.delete(`/tasks/${id}`);
}