import Image from 'next/image';

type Props = {
	title: string;
	video: string;
};

export default function Testimonial(props: Props) {
	return (
		<article className='flex h-[45vh] w-full flex-col items-center border-4 border-blue-600 bg-black lg:h-[35vh] lg:w-3/4'>
			<h3 className='flex h-1/3 w-full items-center justify-center border-0 border-b-4 border-blue-600 text-center text-xl font-bold uppercase'>
				{props.title.split('-')[0]}
			</h3>

			<video
				className='h-2/3 w-full'
				controls
				playsInline
				src={`${process.env.CDN}/${props.video}`}
			/>
		</article>
	);
}
