import React, {useState} from 'react';
import {Checkbox} from 'antd';
import type {CheckboxChangeEvent} from 'antd/es/checkbox';
import EditButton from '@/images/edit-button.svg';
import Trash from '@/images/trash.svg';
const onChange = (e: CheckboxChangeEvent) => {
	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	console.log(`checked = ${e.target.checked}`);
};


export default function ListTodo() {
	const [edit, setEdit] = useState(false);
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setEdit(!edit);
	}

	return (
		<div className='pt-6 pb-10 flex flex-col gap-3'>
			<div className='p-6 h-20 bg-white rounded-xl shadow-lg flex items-center justify-between'>
				<div className='flex items-center gap-3'>
					<div className='w-fit'>
						<Checkbox onChange={onChange} className='mr-2 md:mr-5 md:scale-150'/>
					</div>
					<div className='flex gap-4 items-center text-lg font-medium'>
						<div className='w-4 h-4 rounded-full bg-danger'></div>
						<span>Mabar</span>
						<button onClick={handleClick}>
							<EditButton />
						</button>
					</div>
				</div>
				<div>
					<div className='cursor-pointer'>
						<Trash clasName="w-full" />
					</div>
				</div>
			</div>
		</div>
	);
}
