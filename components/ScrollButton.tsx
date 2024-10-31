'use client';

import { Button } from './ui/button';

const scrollToTarget = (): void => {
	setTimeout(() => {
		const targetSection: HTMLElement | null = document.getElementById('Typeform');

		if (targetSection) targetSection.scrollIntoView({ behavior: 'smooth' });
	}, 300);
};

export default function ScrollButton({ children }: Readonly<{ children: React.ReactNode }>) {
	return (
		<Button
			className='text-shadow-custom hover:shadow-custom-hover rounded-none border-2 border-[#00000033] bg-[#11D15D] px-6 py-8 text-center text-2xl font-bold uppercase shadow-sm hover:bg-[#11D15D] max-lg:w-[90vw] lg:px-12 lg:text-3xl'
			onClick={scrollToTarget}
		>
			{children}
		</Button>
	);
}
