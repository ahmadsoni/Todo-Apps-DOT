/* eslint-disable @typescript-eslint/naming-convention */
import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';
import {Card, Row} from 'antd';
import Trash from '@/images/trash.svg';
import Warning from '@/images/warning.svg';
import Information from '@/images/information-modal.svg';
import Link from 'next/link';
import {type CardActivity} from '@/services/data-types';

export default function CardTodo(props: CardActivity) {
	const {id, title, created_at} = props;
	const date: Date = new Date(created_at);
	const options: Intl.DateTimeFormatOptions = {day: 'numeric', month: 'long', year: 'numeric'};
	const formattedDate: string = date.toLocaleDateString('id-ID', options);
	const [isOpen, setIsOpen] = useState(false);
	const [isOpen2, setIsOpen2] = useState(false);
	return (
		<>
			<div style={{width: 240, marginTop: 16}} className='bg-white shadow-lg rounded-xl h-56 p-4 flex flex-col justify-between'>
				<Link href={`/detail/${id}`}>
					<h4  className="text-lg font-bold cursor-pointer pt-2 hover:text-primary">{title}</h4>
				</Link>
				<div className='flex justify-between'>
					<span className="text-secondary font-semibold text-base font-poppins">{formattedDate}</span>
					<div className='cursor-pointer flex items-center'>
						<Trash clasName="w-full" onClick={
							() => {
								setIsOpen(true); 
							}
						}/>
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
									<div className='bg-white p-6 w-[497px] rounded-xl'>
										<Warning  className='mx-auto'/>
										<div className='py-10 text-lg text-center'>
                                            Apakah anda yakin menghapus activity
											<span className="font-bold"> &quot;{title}&quot;?</span>
										</div>
										<div className="flex justify-center gap-6">
											<button type='button' className="inline-flex justify-center rounded-full border border-transparent bg-[#F4F4F4] px-10 py-4 text-base font-medium text-slate-600 hover:bg-[#faffff] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => {
												setIsOpen(false);
											}}>Batal</button>
											<button className="inline-flex justify-center rounded-full border border-transparent bg-[#ED4C5C] px-10 py-4 text-base font-medium text-white hover:bg-[#fc5e6e] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2" onClick={() => {
												setIsOpen(false);
												setIsOpen2(true);
											}}>Hapus</button>
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
									<div className='bg-white p-6 flex gap-4 items-center w-[497px] rounded-xl'>
										<Information />
										<span>
											<h2>Activity berhasil dihapus</h2>
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
