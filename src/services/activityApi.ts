/* eslint-disable @typescript-eslint/naming-convention */
import axios, {type AxiosInstance, type AxiosResponse} from 'axios';
import {type Activity, type ActivityAddUpdate} from './data-types';

const api: AxiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const getActivity = async (): Promise<Activity[]> => {
	const response: AxiosResponse<{data: Activity[]}> = await api.get('/activity-groups');
	return response.data.data.slice(0, 40);
};

export const getOneActivity = async (id: number): Promise<Activity[]> => {
	const response: AxiosResponse<{data: Activity[]}> = await api.get(`/activity-groups/${id}`);
	return response.data.data;
};

export const addActivity = async (title: string, email: string) => {
	const response: AxiosResponse<{data: Activity[]}> = await api.post('/activity-groups', {
		title,
		email,
	});
	return response.data.data;
};

export const updateActivity = async (id: number, title: string): Promise<Activity[]> => {
	const response:  AxiosResponse<{data: Activity[]}> = await api.patch(`/activity-groups/${id}`, {
		title,
	});
	return response.data.data;
};

export const deleteActivity = async (id: number): Promise<Activity[]> => {
	const response: AxiosResponse<{data: Activity[]}> = await api.delete(`/activity-groups/${id}`);
	return response.data.data;
};