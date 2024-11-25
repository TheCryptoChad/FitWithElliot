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

const featuredTestimonials = ['Zack-1', 'Ricky-1', 'Kyle-1'];

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

export default async function Home() {
	const utFiles: UTFile[] = await fetchUTFiles();
	const mainVideo: UTFile | undefined = utFiles?.find((utFile) => utFile.name === 'main.mp4');
	const elliotProgress = utFiles
		?.filter((utFile) => utFile.name.startsWith('elliot'))
		.sort((a, b) => a.name.localeCompare(b.name));
	// const testimonials: UTFile[] = utFiles?.filter((utFile) => {
	// 	const isMainVideo = utFile.name === 'main.mp4';
	// 	const isFeaturedTestimonial = featuredTestimonials.some(
	// 		(testimonial) =>
	// 			utFile.name === `${testimonial.toLowerCase()}.mp4` ||
	// 			new RegExp(`^${testimonial.toLowerCase()}-before-\\d+\\.webp$`).test(utFile.name) ||
	// 			new RegExp(`^${testimonial.toLowerCase()}-after-\\d+\\.webp$`).test(utFile.name),
	// 	);
	// 	return !isMainVideo && !isFeaturedTestimonial;
	// });
	const testimonials = utFiles?.filter((utFile) => utFile.name !== 'main.mp4');
	const videoTestimonials = testimonials?.filter((utFile) => utFile.name.endsWith('.mp4'));
	const imageTestimonials = Object.values(
		testimonials?.reduce((acc: Record<string, Record<string, UTFile>>, utFile) => {
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
	)?.filter((pair) => pair.before && pair.after) as { before: UTFile; after: UTFile }[];

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
					get the gameplan
					<br />
					to your dream body!
				</h1>

				<h1 className='text-center text-3xl font-bold uppercase lg:hidden'>
					get the gameplan
					<br />
					to your dream body!
				</h1>

				<video
					className='h-[40%] w-[90%] lg:h-[56%] lg:w-[58%]'
					controls
					src={`${process.env.CDN}/${mainVideo?.key}`}
				/>

				<ScrollButton>i&apos;m ready!</ScrollButton>
			</section>

			<section
				className='flex w-full flex-col items-center justify-center lg:h-[110vh]'
				id='Typeform'
			>
				<TypeFormAndBookCall />
			</section>

			<section className='-mb-8 flex w-full flex-col items-center gap-6 bg-white pb-20 pt-10 lg:h-[80vh]'>
				<h2 className='text-center text-5xl font-extrabold uppercase text-black lg:text-6xl'>my personal journey...</h2>

				<div className='flex w-full place-items-center items-center justify-between gap-3 max-lg:flex-col lg:h-[80%] lg:w-4/5 lg:gap-1'>
					{elliotProgress?.map((elliotProgress: UTFile, index: number) => (
						<div
							key={index}
							className={`${index % 2 !== 0 ? 'max-lg:ml-16 lg:mt-32' : 'max-lg:mr-16'} relative flex size-full lg:w-1/5`}
						>
							<Image
								alt='Progress'
								className='size-full object-cover'
								height={200}
								src={`${process.env.CDN}/${elliotProgress.key}`}
								width={200}
							/>

							<h3 className='absolute left-1/2 top-2 -translate-x-1/2 text-center text-xl font-extrabold uppercase'>
								Step {index + 1}
							</h3>

							<h3 className='absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-xl font-extrabold uppercase'>
								{elliotProgress.name.split('.')[0].split('-')[2]} lbs
							</h3>
						</div>
					))}
				</div>
			</section>

			<section className='flex w-full flex-col items-center gap-10 bg-[#000000E6] py-10'>
				<h2 className='w-full text-center text-5xl font-extrabold uppercase'>my success stories</h2>
				<div className='items-between flex w-full items-center justify-center max-lg:flex-col max-lg:gap-16'>
					{featuredTestimonials.map((featuredTestimonial: string, index: number) => {
						const nameLC = featuredTestimonial.toLowerCase();

						const video = utFiles?.find((testimonial) => testimonial.name === `${nameLC}.mp4`);

						const before = utFiles?.find((testimonial) => testimonial.name.startsWith(`${nameLC}-before`));
						const after = utFiles?.find((testimonial) => testimonial.name.startsWith(`${nameLC}-after`));

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

								<Image
									alt='5 Stars'
									height={30}
									src='/five-stars.png'
									width={200}
								/>
							</div>
						);
					})}
				</div>
			</section>

			<Testimonials
				button={`let's go!`}
				imageTestimonials={imageTestimonials}
				videoTestimonials={videoTestimonials}
			/>

			<Testimonials
				button={`okay i'm in!`}
				imageTestimonials={imageTestimonials}
				videoTestimonials={videoTestimonials}
			/>

			<Testimonials
				button={`i'm ready!`}
				imageTestimonials={imageTestimonials}
				videoTestimonials={videoTestimonials}
			/>

			<Testimonials
				imageTestimonials={imageTestimonials}
				videoTestimonials={videoTestimonials}
			/>

			<Separator className='w-[92%] bg-[#D90007] lg:w-4/5' />

			<ScrollButton>alright i&apos;ve seen enough</ScrollButton>
		</main>
	);
}
