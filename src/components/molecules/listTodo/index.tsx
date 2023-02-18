import {Fragment, useEffect, useState, useCallback} from 'react';
import {Checkbox} from 'antd';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import EditButton from '@/images/edit-button.svg';
import Trash from '@/images/trash.svg';
import {type UpdateCheckTodoProps, type AddActivityForm, type CardActivity, type GetStaticProps, type Todo, type SendIdProps} from '@/services/data-types';
import * as base from '@/services/todoApi';
import {useMutation, type UseMutationResult, type MutationFunction, useQuery, QueryClient} from 'react-query';
import {Dialog, Transition} from '@headlessui/react';
import Warning from '@/images/warning.svg';
import InformationSuccess from '@/images/information-success.svg';
import InformationFailed from '@/images/information-failed.svg';


const queryClient = new QueryClient();
function checkColor(color: string) {
	switch (color) {
		case 'very-high':
			return 'danger';
		case 'high':
			return 'warning';
		case 'normal':
			return 'success';
		case 'low':
			return 'dodger';
		case 'very-low':
			return 'purple';
		default:
			return '';
	}
}

const handleCheckedDefault = (check: string) => {
	const checkNumber = Number(check);
	if (checkNumber === 0) {
		return true;
	}

	return false;
};

function updateCheckTodo(): UseMutationResult<Todo[], Error, UpdateCheckTodoProps> {
	const mutationFn: MutationFunction<Todo[], UpdateCheckTodoProps> = async (input) => {
		const {activityId, isActive, title} = input;
		const {data} = await base.updateCheckTodo(activityId, isActive, title);
		return data;
	};

	return useMutation(mutationFn, {
		async onSuccess() {
			await queryClient.invalidateQueries('list-todo');
		},
	});
}

function deleteTodoList(): UseMutationResult<Todo[], Error, string> {
	const mutationFn: MutationFunction<Todo[], string> = async (id) => {
		const {data} = await base.deleteTodoList(id);
		return data;
	};

	return useMutation(mutationFn, {
		async onSuccess() {
			await queryClient.invalidateQueries('list-todo');
		},
	});
}

export default function ListTodo(props: SendIdProps) {
	const {id} = props;
	const [isOpen, setIsOpen] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	const [deleteTodoProps, setDeleteTodoProps ] = useState({
		id: '',
		title: '',
	});
	const [edit, setEdit] = useState(false);
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setEdit(!edit);
	}

	const handleCheckTodo = ({activityId, isActive, title}: UpdateCheckTodoProps) => {
		updateCheckTodoMutate({activityId, isActive, title});
		setTimeout(async () => {
			await todoRefetch();
		}, 500);
	};

	const cancelModal = () => {
		setIsOpen(false);
	};

	const deleteModal = () => {
		setIsOpen(true);
	};

	const deleteAction = async () => {
		deleteTodoListMutate(deleteTodoProps.id);
	};

	const handleDeleteTodo = (id: string, title: string) => {
		setDeleteTodoProps({
			id,
			title,
		});
		deleteModal();
	};

	
	const {mutate: updateCheckTodoMutate, isLoading: updateCheckTodoLoading, isError: updateCheckTodoError, isSuccess: updateCheckTodoSuccess} = updateCheckTodo();
	const {mutate: deleteTodoListMutate, isLoading: deleteTodoListLoading, isError: deleteTodoListError, isSuccess: deleteTodoListSuccess} = deleteTodoList();
	const {data:todoData, isLoading: todoIsLoading, isError: todoIsError, isSuccess: todoIsSuccess, refetch: todoRefetch} = useQuery<Todo []>(
		'list-todo', {
			refetchOnWindowFocus: true,
			refetchOnMount: true,
			staleTime: 2500,
		},
	);
	const deleteHandle = useCallback(() => {
		if (deleteTodoListError || deleteTodoListSuccess) {
			setIsOpen(false);
			setIsOpen2(true);
			setTimeout(async () => {
				await todoRefetch();
			}, 1500);
		}
	}, [deleteTodoListError, deleteTodoListSuccess]);

	useEffect(() => {
		deleteHandle();
	}, [deleteTodoListError, deleteTodoListSuccess]);
	return (
		<>
			<div className='pt-6 pb-10 flex flex-col gap-3'>
				{todoData?.map((todo, todoIdx: number) => (
					<div className='p-6 h-20 bg-white rounded-xl shadow-lg flex items-center justify-between' key={todoIdx}>
						<div className='flex items-center gap-3'>
							<div className='w-fit'>
								<Checkbox  onChange={async () => {
									handleCheckTodo({activityId: todo.id.toString(), isActive: !todo.is_active, title: todo.title}); 
								}} checked={handleCheckedDefault(todo.is_active)} className='mr-2  md:mr-5 scale-150'/>
							</div>
							<div className='flex gap-4 items-center text-lg font-medium'>
								<div className={`w-4 h-4 rounded-full bg-${checkColor(todo.priority)}`}></div>
								<span className={` ${todo.is_active ? '' : 'text-secondary line-through'}`}>
									{todo.title}
								</span>
								<button onClick={handleClick}>
									<EditButton />
								</button>
							</div>
						</div>
						<div>
							<div className='cursor-pointer'onClick={() => {
								handleDeleteTodo(todo.id.toString(), todo.title);
							}}>
								<Trash clasName="w-full" />
							</div>
						</div>
					</div>
				))}
			</div>
			 <Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => {
					setIsOpen(false);
				}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="relative transform text-left shadow-xl transition-all w-fit my-auto opacity-100 translate-y-0 sm:scale-100">
									<div className='bg-white p-6 w-full sm:w-[497px] rounded-xl'>
										<Warning  className='mx-auto'/>
										<div className='py-10 text-lg text-center'>
                                            Apakah anda yakin menghapus activity
											<span className="font-bold"> &quot;{deleteTodoProps.title}&quot;?</span>
										</div>
										<div className="flex justify-center gap-6">
											<button type='button' className="inline-flex justify-center rounded-full border border-transparent bg-[#F4F4F4] px-10 py-4 text-base font-medium text-slate-600 hover:bg-[#faffff] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={cancelModal}>Batal</button>
											<button className="inline-flex justify-center rounded-full border border-transparent bg-[#ED4C5C] px-10 py-4 text-base font-medium text-white hover:bg-[#fc5e6e] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={deleteAction} disabled={deleteTodoListLoading} >Hapus</button>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
			 <Transition appear show={isOpen2} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={() => {
					setIsOpen2(false);
				}}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="relative transform text-left shadow-xl transition-all w-fit my-auto opacity-100 translate-y-0 sm:scale-100">
									<div className='bg-white p-6 flex gap-4 items-center w-full sm:w-[497px] rounded-xl'>
										{deleteTodoListSuccess ? <InformationSuccess /> : deleteTodoListError ? <InformationFailed /> : null}
										<span>
											<h2>Activity {deleteTodoListSuccess ? 'berhasil' : deleteTodoListError ? 'tidak berhasil' : null} dihapus</h2>
										</span>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
