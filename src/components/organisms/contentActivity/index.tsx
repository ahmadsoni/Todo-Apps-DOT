import {useEffect, useRef, useState, Fragment} from 'react';
import Arrow from '@/images/arrow.svg';
import EditButton from '@/images/edit-button.svg';
import Sort from '@/images/sort.svg';
import SelectDown from '@/images/select-down.svg';
import Close from '@/images/close.svg';
import Checklist from '@/images/checklist.svg';
import {Button} from 'antd';
import Link from 'next/link';
import Image from 'next/legacy/image';
import type {SizeType} from 'antd/es/config-provider/SizeContext';
import {PlusOutlined} from '@ant-design/icons';
import {Dialog, Transition, Listbox} from '@headlessui/react';

const priority = [
	{name:'Pilih Priority', color: ''},
	{name: 'Very High', color: 'danger'},
	{name: 'High', color: 'warning'},
	{name: 'Medium', color: 'success'},
	{name: 'Low', color: 'dodger'},
	{name: 'Very Low', color: 'purple'},
];

const filter = [
	{name: '', type:'Sort'},
	{name:'Terbaru', type:'filter-1'},
	{name:'Terlama', type:'filter-2'},
	{name:'A-Z', type:'filter-3'},
	{name:'Z-A', type:'filter-4'},
	{name:'Belum Selesai', type:'filter-5'},
];
export default function ContentActivity() {
	const [size, setSize] = useState<SizeType>('large');
	const [edit, setEdit] = useState(false);
	const [selected, setSelected] = useState(priority[0]);
	const [filterSelect, setfilterSelect] = useState(filter[0]);
	const [isOpen, setIsOpen] = useState(false);
	function handleBlur(event: React.FocusEvent<HTMLInputElement>): void {
		setEdit(false);
	}
	
	function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
		setEdit(!edit);
	}
	

	return (
		<>
			<div className='flex justify-between mb-6 mt-10'>
				<div className='flex items-center gap-3'>
					<Link href='/'>
						<Arrow />
					</Link>
					<div  className='flex items-center gap-3 false border-black py-2 edit'>
						{edit ? <input type="text" className='bg-transparent text-black text-2.25xl leading-2.5xl outline-none border-b-2 border-black w-500 font-bold text-2xl' value="New Activity" onBlur={handleBlur} />  : <h1 className='font-bold text-3xl'>New Activity</h1>}
					</div>
					<button onClick={handleClick}>
						<EditButton />
					</button>
				</div>
				<div className='flex items-center gap-3'>
					<div className='relative flex gap-3 items-center'>
						<Listbox value={filterSelect} onChange={setfilterSelect}>
							<Listbox.Button className='border border-gray-300 px-5 py-5 rounded-full text-gray-500 p-4 gap-3 flex'>
								<div className={`${filterSelect.name === '' ? 'absolute -mx-2.5 -my-2' : ''}`}>
									<Sort />
								</div>
								<span>{filterSelect.name === '' ? null : filterSelect.name}</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className='absolute bg-white w-[235px] mt-[23rem] rounded-md border shadow-lg z-10'>
									{filter.slice(1).map((filter, filterIdx) => (
										<Listbox.Option
											key={filterIdx}
											className={({active, selected}) =>
												`relative cursor-default select-none py-2 border-b-[1.5px] border-gray-200 ${
													active ? 'bg-blue-200' : 'text-gray-900'
												} ${ selected ? 'bg-blue-200' : 'text-gray-900'}`
											}
											value={filter}
										>
											{({selected}) => (
												<div className='relative flex justify-between items-center p-2'>
													<div className='flex items-center gap-3'>
														<div>
															<Image
																className=''
																width={18}
																height={18}
																src={`/webp/${filter.type}.webp`}
																alt=''
															/>
														</div>
														<span
															className={`block truncate ${
																selected ? 'font-medium' : 'font-normal'
															}`}
														>
															{filter.name}
														</span>
													</div>
													{selected ? (
														<div className=''>
															<Checklist />
														</div>
													) : null}
												</div>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							  </Transition>
						</Listbox>
						<Button className='bg-primary flex items-center justify-center mt-1' type="primary" shape="round" size={size} onClick={
							() => {
								setIsOpen(true); 
							}
						}>
							<PlusOutlined className="mr-2" />
							<span>Tambah</span>
						</Button>
					</div>
				</div>
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
									<div className='bg-white p-6  w-[830px] rounded-xl'>
										<div className='flex justify-between items-center px-8 py-6 border-b-2'>
											<h4 className="font-semibold text-xl">Tambah List Item</h4>
											<button type="button" className='cursor-pointer' onClick={() => {
												setIsOpen(false);
											}}>
												<Close />
											</button>
										</div>
										<div className='px-8 py-6'>
											<div className='mb-6'>
												<label className='font-semibold text-sm'>NAMA LIST ITEM</label>
												<input type="text" className={'w-full px-4 py-3 mt-2 border border-1 rounded focus:outline-4 outline-blue-200'} placeholder="Tambahkan nama item" data-cy="modal-add-name-input" value=""/>
											</div>
											<div className='mb-6'>
												<label className='font-semibold text-sm'>PRIORITY</label>
												<Listbox value={selected} onChange={setSelected}>
													<div className="relative mt-1">
														<Listbox.Button className="relative cursor-default  p-3 outline outline-1 outline-slate-200 w-[207px] rounded flex justify-between items-center shadow-top">
															<div className='flex items-center gap-3'>
																<div className={`w-3 h-3 rounded-full bg-${selected.color}`}></div>
																<span className="block truncate">{selected.name}</span>
															</div>
															<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
																<SelectDown />
															</span>
														</Listbox.Button>
														<Transition
															as={Fragment}
															leave="transition ease-in duration-100"
															leaveFrom="opacity-100"
															leaveTo="opacity-0"
														>
															<Listbox.Options className="absolute mt-1 w-[207px] overflow-auto rounded-md bg-white py-1 text-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-base">
																{priority.slice(1).map((priority, personIdx) => (
																	<Listbox.Option
																		key={personIdx}
																		className={({active, selected}) =>
																			`relative cursor-default select-none py-2 ${
																				active ? 'bg-blue-200' : 'text-gray-900'
																			} ${ selected ? 'bg-blue-200' : 'text-gray-900'}`
																		}
																		value={priority}
																	>
																		{({selected}) => (
																			<div className='relative flex justify-between items-center p-2'>
																				<div className='flex items-center gap-3'>
																					<div className={`w-3 h-3 rounded-full bg-${priority.color}`}></div>
																					<span
																						className={`block truncate ${
																							selected ? 'font-medium' : 'font-normal'
																						}`}
																					>
																						{priority.name}
																					</span>
																				</div>
																				{selected ? (
																					<div className=''>
																						<Checklist />
																					</div>
																				) : null}
																			</div>
																		)}
																	</Listbox.Option>
																))}
															</Listbox.Options>
														</Transition>
													</div>
												</Listbox>
											</div>
										</div>
										<div className='px-8 py-6 border-t-2 flex justify-end'>
											<button className="border-2 rounded-full py-3 px-6  font-medium text-lg bg-primary text-white ml-auto w-[150px] opacity-50 cursor-default">Simpan</button>
										</div>
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
