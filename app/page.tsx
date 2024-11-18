import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import ScrollButton from '@/components/ScrollButton';
import Testimonials from '@/components/Testimonials';
import TypeFormAndBookCall from '@/components/TypeFormAndBookCall';
import { fetchUTFiles } from '@/lib/actions';

const socials = {
	Instagram: 'https://www.instagram.com/fitwithelliot',
	TikTok: 'https://www.tiktok.com/@fitwithelliot',
	YouTube: 'https://youtube.com/@fitwithelliot',
	Facebook: 'https://www.facebook.com/profile.php?id=61560451147895',
	Twitter: 'https://x.com/fitwithelliot',
};

const sites = {
	'Site 1': '/next.svg',
	'Site 2': '/next.svg',
	'Site 3': '/next.svg',
	'Site 4': '/next.svg',
	'Site 5': '/next.svg',
	'Site 6': '/next.svg',
};

const featuredTestimonials = ['Zack-1', 'Ricky-1', 'a'];

export default async function Home() {
	const utFiles: UTFile[] = await fetchUTFiles();
	const mainVideo: UTFile | undefined = utFiles.find((utFile) => utFile.name === 'main.mp4');
	// const testimonials: UTFile[] = utFiles.filter((utFile) => {
	// 	const isMainVideo = utFile.name === 'main.mp4';
	// 	const isFeaturedTestimonial = featuredTestimonials.some(
	// 		(testimonial) =>
	// 			utFile.name === `${testimonial.toLowerCase()}.mp4` ||
	// 			new RegExp(`^${testimonial.toLowerCase()}-before-\\d+\\.webp$`).test(utFile.name) ||
	// 			new RegExp(`^${testimonial.toLowerCase()}-after-\\d+\\.webp$`).test(utFile.name),
	// 	);
	// 	return !isMainVideo && !isFeaturedTestimonial;
	// });
	const testimonials = utFiles.filter((utFile) => utFile.name !== 'main.mp4');
	const videoTestimonials = testimonials.filter((utFile) => utFile.name.endsWith('.mp4'));
	const imageTestimonials = Object.values(
		testimonials.reduce((acc: Record<string, Record<string, UTFile>>, utFile) => {
			const match = utFile.name.match(/^(.*)-(before|after)-\d+\.webp$/);
			if (match) {
				const [_, baseName, type] = match;
				if (!acc[baseName]) {
					acc[baseName] = {};
				}
				acc[baseName][type] = utFile;
			}
			return acc;
		}, {}),
	).filter((pair) => pair.before && pair.after) as { before: UTFile; after: UTFile }[];

	return (
		<main className='flex w-screen flex-col items-center gap-8 overflow-x-hidden pb-8'>
			<section className='flex w-full flex-col items-center gap-10 bg-[#000000E6] py-5 lg:min-h-[150vh]'>
				<div className='fixed right-2 top-2 z-20 flex flex-col items-center gap-2'>
					{Object.entries(socials).map(([key, value]: [string, string]) => (
						<Link
							key={key}
							href={value}
							target='_blank'
						>
							<Image
								alt={key}
								className='hover:scale-110 hover:brightness-150'
								height={50}
								src={`/${key.toLowerCase()}.webp`}
								width={50}
							/>
						</Link>
					))}
				</div>

				<Image
					alt='Logo'
					height={250}
					src='/logo.png'
					width={250}
				/>

				<h1 className='text-center text-6xl font-bold uppercase max-lg:hidden'>
					get the gameplan to building
					<br />
					your online fitness business
				</h1>

				<h1 className='text-center text-3xl font-bold uppercase lg:hidden'>
					get the gameplan to
					<br />
					building your online
					<br />
					fitness business
				</h1>

				<video
					className='h-[40%] w-[90%] lg:h-[56%] lg:w-[58%]'
					controls
					src={`${process.env.CDN}/${mainVideo?.key}`}
				/>

				<ScrollButton>i want to be a trainer</ScrollButton>
			</section>

			<section
				className='flex w-full flex-col items-center justify-center gap-10 lg:h-[130vh]'
				id='Typeform'
			>
				<TypeFormAndBookCall />

				<div className='flex h-2/5 w-full place-items-center items-center justify-between max-lg:grid max-lg:grid-cols-3 lg:h-1/5 lg:w-4/5'>
					{Object.entries(sites).map(([key, value]: [string, string]) => (
						<Image
							key={key}
							alt={key}
							className='object-fit h-[20vh] w-1/3 lg:h-[15vh] lg:w-1/12'
							height={50}
							src={value}
							width={50}
						/>
					))}
				</div>
			</section>

			<section className='items-between flex w-full items-center justify-center bg-[#000000E6] py-10 max-lg:flex-col max-lg:gap-16'>
				{featuredTestimonials.map((featuredTestimonial: string, index: number) => {
					const nameLC = featuredTestimonial.toLowerCase();

					const video = utFiles.find((testimonial) => testimonial.name === `${nameLC}.mp4`);

					const before = utFiles.find((testimonial) => testimonial.name.startsWith(`${nameLC}-before`));
					const after = utFiles.find((testimonial) => testimonial.name.startsWith(`${nameLC}-after`));

					const beforeWeight = before?.name.split('-')[3].split('.')[0];
					const afterWeight = after?.name.split('-')[3].split('.')[0];

					return (
						<div
							key={index}
							className='flex h-full w-[80%] flex-col items-center justify-center gap-4 lg:w-1/3 lg:gap-10'
						>
							<video
								className='h-[40vh] w-[90vw] lg:h-[40vh] lg:w-[90%]'
								controls
								playsInline
								src={`${process.env.CDN}/${video?.key}`}
							/>

							<h2 className='text-center text-xl font-extrabold uppercase'>{nameLC.split('-')[0]}</h2>

							<div className='flex w-[89vw] items-center justify-center gap-1 text-shadow-custom lg:w-[89%]'>
								<div className='relative flex w-1/2 lg:h-[40vh]'>
									<Image
										alt='Before'
										className='h-[40vh] w-full lg:size-full'
										height={200}
										src={`${process.env.CDN}/${before?.key}`}
										width={200}
									/>

									<h3 className='absolute left-1/2 top-2 -translate-x-1/2 text-center font-extrabold uppercase'>
										before
									</h3>

									<h3 className='absolute bottom-2 left-1/2 -translate-x-1/2 text-center font-extrabold uppercase'>
										{beforeWeight} lbs
									</h3>
								</div>

								<div className='relative flex w-1/2 lg:h-[40vh]'>
									<Image
										alt='After'
										className='h-[40vh] w-full lg:size-full'
										height={200}
										src={`${process.env.CDN}/${after?.key}`}
										width={200}
									/>

									<h3 className='absolute left-1/2 top-2 -translate-x-1/2 text-center font-extrabold uppercase'>
										after
									</h3>

									<h3 className='absolute bottom-2 left-1/2 -translate-x-1/2 text-center font-extrabold uppercase'>
										{afterWeight} lbs
									</h3>
								</div>
							</div>
						</div>
					);
				})}
			</section>

			<Testimonials
				button={`let's go!`}
				imageTestimonials={[...imageTestimonials, ...imageTestimonials, ...imageTestimonials]}
				videoTestimonials={[...videoTestimonials, ...videoTestimonials, ...videoTestimonials]}
			/>

			<Testimonials
				button={`okay i'm in!`}
				imageTestimonials={[...imageTestimonials, ...imageTestimonials, ...imageTestimonials]}
				videoTestimonials={[...videoTestimonials, ...videoTestimonials, ...videoTestimonials]}
			/>

			<Testimonials
				button='i want to be an online trainer'
				imageTestimonials={[...imageTestimonials, ...imageTestimonials, ...imageTestimonials]}
				videoTestimonials={[...videoTestimonials, ...videoTestimonials, ...videoTestimonials]}
			/>

			<Testimonials
				imageTestimonials={[...imageTestimonials, ...imageTestimonials, ...imageTestimonials]}
				videoTestimonials={[...videoTestimonials, ...videoTestimonials, ...videoTestimonials]}
			/>

			<Separator className='w-[92%] bg-[#D90007] lg:w-4/5' />

			<ScrollButton>alright i&apos;ve seen enough</ScrollButton>
		</main>
	);
}
