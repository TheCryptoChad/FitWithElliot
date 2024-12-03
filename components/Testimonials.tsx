import Image from 'next/image';
import Testimonial from './Testimonial';
import ScrollButton from './ScrollButton';

type Props = {
	videoTestimonials: UTFile[];
	imageTestimonials: { before: UTFile; after: UTFile }[];
	button?: string;
};

export default function Testimonials(props: Props) {
	return (
		<section className='flex w-full flex-col items-center gap-8 px-10'>
			<div className='grid w-full place-items-center gap-y-20 pb-12 lg:grid-cols-4'>
				{props.videoTestimonials?.map((videoTestimonial: UTFile, index: number) => (
					<Testimonial
						key={index}
						title={videoTestimonial.name}
						video={videoTestimonial.key}
					/>
				))}
			</div>

			<div className='grid w-full gap-8 lg:grid-cols-3 lg:px-8'>
				{props.imageTestimonials?.map((imageTestimonial: { before: UTFile; after: UTFile }, index: number) => {
					const beforeWeight = imageTestimonial.before.name.split('-')[3].split('.')[0];
					const afterWeight = imageTestimonial.after.name.split('-')[3].split('.')[0];
					return (
						<div
							key={index}
							className='flex h-[40vh] w-full items-center justify-center gap-1 text-shadow-custom lg:h-[30vh]'
						>
							<div className='relative flex h-full w-1/2'>
								<Image
									alt='Before'
									className='size-full'
									height={200}
									src={`${process.env.CDN}/${imageTestimonial.before.key}`}
									width={200}
								/>

								<h3 className='absolute left-1/2 top-2 -translate-x-1/2 text-center font-extrabold uppercase'>
									before
								</h3>

								<h3 className='absolute bottom-2 left-1/2 -translate-x-1/2 text-center font-extrabold uppercase'>
									{beforeWeight} lbs
								</h3>
							</div>

							<div className='relative flex h-full w-1/2'>
								<Image
									alt='After'
									className='size-full'
									height={200}
									src={`${process.env.CDN}/${imageTestimonial.after.key}`}
									width={200}
								/>

								<h3 className='absolute left-1/2 top-2 -translate-x-1/2 text-center font-extrabold uppercase'>after</h3>

								<h3 className='absolute bottom-2 left-1/2 -translate-x-1/2 text-center font-extrabold uppercase'>
									{afterWeight} lbs
								</h3>
							</div>
						</div>
					);
				})}
			</div>

			{props.button && <ScrollButton>{props.button}</ScrollButton>}
		</section>
	);
}
