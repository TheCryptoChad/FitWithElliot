import Image from 'next/image';
import Testimonial from './Testimonial';
import ScrollButton from './ScrollButton';

type Props = {
	videos: {
		title: string;
		video: string;
	}[];
	images: string[];
	button?: string;
};

const videoTestimonials = Array.from({ length: 16 }, (_, index) => ({
	title: `Testimonial ${index + 1}`,
	video: '.',
}));

const imageTestimonials = Array.from(
	{ length: 9 },
	() =>
		'https://cdn.prod.website-files.com/64b92de9ad5a6e90a1e6c597/65a9230fd495e22277365758_M6kSqQ0H15wZhJvmVeQJbejjFoQgX9IaUAgDyaoYNvDbrlz-fC4Wsj0HUOmCpI6xR_DvUoDcSDsvan9lWaj8FZ90xkOoWrdKFVmsqAfboM1a6yndxhZEDJmwTbLt1gyL1QtliAwHLdDOkFdwl2MFroY.png',
);

export default function Testimonials(props: Props) {
	return (
		<section className='flex w-full flex-col items-center gap-8 px-10'>
			<div className='grid w-full place-items-center gap-y-20 pb-12 lg:grid-cols-4'>
				{videoTestimonials.map((videoTestimonial: { title: string; video: string }) => (
					<Testimonial
						key={videoTestimonial.title}
						title={videoTestimonial.title}
						video={videoTestimonial.video}
					/>
				))}
			</div>

			<div className='grid w-full gap-8 lg:grid-cols-3 lg:px-8'>
				{imageTestimonials.map((imageTestimonial: string, index: number) => (
					<Image
						key={index}
						alt='Testimonial'
						className='object-fit h-[40vh] w-full lg:h-[30vh]'
						height={100}
						src={imageTestimonial}
						width={200}
					/>
				))}
			</div>

			{props.button && <ScrollButton>{props.button}</ScrollButton>}
		</section>
	);
}
