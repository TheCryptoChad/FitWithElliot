'use client';

import { useEffect, useState } from 'react';
import { Widget } from '@typeform/embed-react';

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function TypeFormAndBookCall() {
	const [formSubmitted, setFormSubmitted] = useState(false);

	useEffect(() => {
		if (formSubmitted) {
			const script = document.createElement('script');
			script.src = 'https://assets.calendly.com/assets/external/widget.js';
			script.async = true;
			document.body.appendChild(script);

			return () => {
				document.body.removeChild(script);
			};
		}
	}, [formSubmitted]);

	return (
		<div className='flex-1 max-lg:h-[90vh] w-[90%] lg:w-[80%] rounded-md bg-white'>
			{!formSubmitted ? (
				<Widget
					id='Ulyr5VYI'
					className='size-full'
					onSubmit={async () => {
						await wait(3000);
						setFormSubmitted(true);
					}}
				/>
			) : (
				<div
					className='calendly-inline-widget size-full'
					data-url='https://calendly.com/elliotevans1738/15-minute-strategy-call'
				/>
			)}
		</div>
	);
}
