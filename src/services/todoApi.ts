/* eslint-disable @typescript-eslint/naming-convention */
import axios, {type AxiosInstance, type AxiosResponse} from 'axios';
import {type UpdateTodo, type Todo} from './data-types';

const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getTodo = async (activityId: number): Promise<{data: UpdateTodo[]}> => {
	const response: AxiosResponse<{data: UpdateTodo[]}> = await api.get(`/todo-items/${activityId}`);
	return response.data;
};

export const updateCheckTodo = async (activityId: number, isActive: boolean): Promise<{data: UpdateTodo[]}> => {
	const response: AxiosResponse<{data: UpdateTodo[]}> = await api.patch(`/todo-items/${activityId}`, {
		is_active: isActive,
	});
	return response.data;
};

export const addTodo = async (activityId: number,
	title: string,
	priority: string): Promise<{data: UpdateTodo[]}>  => {
	const response: AxiosResponse<{data: UpdateTodo[]}> = await api.post('/todo-items', {
		activity_id: activityId,
		title,
		priority,
	});
	return response.data;
};

export const updateTodo = async (activityId: number,
	title: string,
	priority: string): Promise<{data: UpdateTodo[]}> => {
	const response: AxiosResponse<{data: UpdateTodo[]}> = await api.patch(`/todo-items/${activityId}`, {
		title,
		priority,
	});
	return response.data;
};

export const deleteTodo = async (activityId: number): Promise<{data: Todo[]}> => {
	const response: AxiosResponse<{data: Todo[]}> = await api.delete(`/todo-items/${activityId}`);
	return response.data;
};