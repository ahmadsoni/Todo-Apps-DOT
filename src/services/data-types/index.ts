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
	deleted_at?: string | undefined;
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
export type UpdateActivityForm = {
	id: string;
	title?: string;
};

export type UpdateActivityProps = {
	activityId: string;
	title?: string;
	priority?: string;
};
export type UpdateCheckTodoProps = {
	activityId: string;
	title?: string;
	isActive: boolean;
};
export type CardActivity = {
	id: number;
	title: string;
	created_at: string;
};

export type GetStaticProps = {
	params: {
		random: string;
	};
};

export type GetIdProps = {
	random: string;
};

export type SendIdProps = {
	id: string;
};

export type ContentActivityProps = {
	id: string;
	title?: string;
};

export type AddTodoList = {
	activityId: string;
	title?: string;
	priority?: string;
};