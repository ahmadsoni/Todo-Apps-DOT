import React, {useState, useMemo, useEffect, useCallback} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import {Button, Divider, notification, Space} from 'antd';
import type {NotificationPlacement} from 'antd/es/notification/interface';
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import AddTodo from '../../molecules/addTodo';
import CardTodo from '../../molecules/cardTodo';
import * as api from '@/services/activityApi';
import {useMutation, type UseMutationResult, type MutationFunction, useQuery, QueryClient, QueryCache} from 'react-query';
import {type Activity, type AddActivityForm, type CardActivity} from '@/services/data-types';

const queryClient = new QueryClient();
const queryCache = new QueryCache();
function useAddActivity(): UseMutationResult<Activity[], Error, AddActivityForm> {
	const mutationFn: MutationFunction<Activity[], AddActivityForm> = async (input) => {
		const {title, email} = input;
		const data = await api.addActivity(title, email);
		return data;
	};

	 return useMutation(mutationFn, {
		async onSuccess() {
			await queryClient.invalidateQueries('todo-apps');
			console.log('hoy disini');
		}});
}

export default function Content() {
	const [info, contextHolder] = notification.useNotification();
	const [size, setSize] = useState<SizeType>('large');
	
	const {mutate, isLoading: addActivityLoading, isError: addActivityError, isSuccess: addActivitySuccess} = useAddActivity();
	const {data, isLoading: getActivityLoading, isError: getActivityError, isSuccess: getActivitySuccess, refetch: getActivityRefetch} = useQuery('todo-apps', api.getActivity, {
		refetchOnWindowFocus: false,
		refetchOnMount: true,
	});

	const addTodoList = async () => {
		 mutate({title: 'New test5', email: 'wow@gmail.com'});
	};

	const notificationSucces = (placement: NotificationPlacement) => {
		info.success({
			message: 'Data Berhasil Di Tambah',
			description:'Silahkan Membuat Todo List Kegiatan',
			placement,
		});
	};

	const notificationError = (placement: NotificationPlacement) => {
		info.error({
			message: 'Data Tidak Berhasil Di tambah',
			description:'Silahkan coba lagi',
			placement,
		});
	};

	const handleActivityUpdate = async () => {
		if (addActivitySuccess) {
			await getActivityRefetch();
			notificationSucces('topRight');
		}

		if (addActivityError) {
			notificationError('topRight');
		}
	};

	useEffect(() => {
		void handleActivityUpdate();
	}, [addActivitySuccess, addActivityError]);


	return (
		<main className='bg-light grow'>
			{contextHolder}
			<div className="container mx-auto">
				<div className='flex justify-between mb-6 mt-10'>
					<h1 className="text-4xl font-bold">Activity</h1>
					<Button className='bg-primary flex items-center justify-center' type="primary" shape="round" size={size} disabled={addActivityLoading} onClick={addTodoList} loading={addActivityLoading}>
						{addActivityLoading ? undefined : <PlusOutlined className="mr-2" />}			
						<span> {addActivityLoading ? 'Loading..' : 'Tambah'}</span>
					</Button>
				</div>
				<div className='pb-15 pt-10'>
					{data && data.length <= 0 ? <AddTodo /> : <div className='grid grid-cols-4 gap-5'>
						{data?.map((data: CardActivity) => (
							<div key={data.id}>
								<CardTodo key={data.id} title={data.title} created_at={data.created_at} id={data.id}/>
							</div>
						))}
					</div>}
				</div>
			</div>
		</main>
	);
}
