export type Activity = {
	id: number;
	email: string;
	title: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | undefined;
};

export type ActivityAdd = {
	created_at: string;
	updated_at: string;
	id: number;
	title: string;
	email: string;
};

export type ActivityAddUpdate = {
	status: string;
	message: string;
	data: ActivityAdd;
};
export type Todo = {
	id: number;
	activity_group_id: string;
	title: string;
	is_active: string;
	priority: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | undefined;
};

export type UpdateTodo = {
	status: string;
	message: string;
	data: Todo;
};

export type AddActivityForm = {
	title: string;
	email: string;
};

export type CardActivity = {
	id: number;
	title: string;
	created_at: string;
};