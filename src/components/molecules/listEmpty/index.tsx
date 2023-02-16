import React from 'react';
import Image from 'next/legacy/image';
export default function ListEmpty() {
	return (
		<div className='pt-6 flex justify-center items-center'>
			<Image
				className='flex mx-auto z-0'
				width={500}
				height={400}
				src='/png/todo-empty.png'
				alt=''
			/>
		</div>
	);
}
