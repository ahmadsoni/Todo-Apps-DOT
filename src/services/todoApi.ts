/* eslint-disable @typescript-eslint/naming-convention */
import axios, {type AxiosInstance, type AxiosResponse} from 'axios';
import {type UpdateTodo, type Todo} from './data-types';

const base: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getTodo = async (activityId: string): Promise<{data: Todo[]}> => {
	const response: AxiosResponse<{data: Todo[]}> = await base.get(`/todo-items?activity_group_id=${activityId}`);
	return response.data;
};

export const updateCheckTodo = async (activityId: string, isActive: boolean, title?: string): Promise<{data: Todo[]}> => {
	const response: AxiosResponse<{data: Todo[]}> = await base.patch(`/todo-items/${activityId}`, {
		is_active: isActive,
		title,
	});
	return response.data;
};

export const addTodo = async (activityId: string, title?: string, priority?: string): Promise<{data: Todo[]}>  => {
	const response: AxiosResponse<{data: Todo[]}> = await base.post('/todo-items', {
		activity_group_id: activityId,
		title,
		priority,
	});
	return response.data;
};

export const updateTodoList = async (activityId: string, title?: string, priority?: string): Promise<{data: Todo[]}> => {
	const response: AxiosResponse<{data: Todo[]}> = await base.patch(`/todo-items/${activityId}`, {
		title,
		priority,
	});
	return response.data;
};

export const deleteTodoList = async (activityId: string): Promise<{data: Todo[]}> => {
	const response: AxiosResponse<{data: Todo[]}> = await base.delete(`/todo-items/${activityId}`);
	return response.data;
};