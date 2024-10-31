import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import ScrollButton from '@/components/ScrollButton';
import Testimonials from '@/components/Testimonials';

const socials = {
	Instagram: 'https://www.instagram.com/',
	TikTok: 'https://www.tiktok.com/',
	YouTube: 'https://www.youtube.com/',
	Twitter: 'https://www.twitter.com/',
	Facebook: 'https://www.facebook.com/',
	LinkedIn: 'https://www.linkedin.com/',
} as const;

const sites = {
	'Site 1': '/next.svg',
	'Site 2': '/next.svg',
	'Site 3': '/next.svg',
	'Site 4': '/next.svg',
	'Site 5': '/next.svg',
	'Site 6': '/next.svg',
} as const;

const featuredVideos = {
	'Title 1': '.',
	'Title 2': '.',
	'Title 3': '.',
} as const;

export default function Home() {
	return (
		<main className='flex w-screen flex-col items-center gap-8 overflow-x-hidden pb-8'>
			<section className='flex h-[100vh] w-full flex-col items-center justify-around bg-[#000000E6]'>
				<div className='fixed right-2 top-2 z-20 flex flex-col items-center gap-2'>
					{Object.entries(socials).map(([key, value]: [string, string]) => (
						<Link
							key={key}
							href={value}
						>
							<Image
								alt={key}
								height={50}
								src={`/${key.toLowerCase()}.webp`}
								width={50}
							/>
						</Link>
					))}
				</div>

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

				{/* <video
					className='h-[40%] w-[90%] lg:h-[56%] lg:w-[58%]'
					controls
					src='https://www.youtube.com/watch?v=53PQmXIF9ZU&pp=ygUQbW9kZXJubGlmZWRhdGluZw%3D%3D'
				/> */}
				<iframe
					className='h-[40%] w-[90%] lg:h-[56%] lg:w-[58%]'
					src='https://www.youtube.com/embed/53PQmXIF9ZU'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
					allowFullScreen
				></iframe>

				<ScrollButton>i want to be an online trainer</ScrollButton>
			</section>

			<section
				className='flex h-[100vh] w-full flex-col items-center justify-center gap-10'
				id='Typeform'
			>
				<div className='size-[80%] rounded-md bg-white max-lg:size-[95%]'>a</div>

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

			<section className='flex w-full items-center justify-center gap-10 bg-[#000000E6] py-10 max-lg:flex-col lg:h-[50vh]'>
				{Object.entries(featuredVideos).map(([key, value]: [string, string]) => (
					<div
						key={key}
						className='flex h-full flex-col items-center justify-center gap-1 lg:gap-5'
					>
						<video
							className='h-[40vh] w-[90vw] lg:h-[60%] lg:w-[90%]'
							controls
							src={value}
						/>

						<h2 className='text-center text-sm uppercase'>{key}</h2>

						<Image
							alt='5 Stars'
							height={30}
							src='/five-stars.png'
							width={200}
						/>
					</div>
				))}
			</section>

			<Testimonials
				videos={[]}
				images={[]}
				button={`let's go!`}
			/>

			<Testimonials
				videos={[]}
				images={[]}
				button={`okay i'm in!`}
			/>

			<Testimonials
				videos={[]}
				images={[]}
				button='i want to be an online trainer'
			/>

			<Testimonials
				videos={[]}
				images={[]}
			/>

			<Separator className='w-[92%] bg-[#D90007] lg:w-4/5' />

			<ScrollButton>alright i&apos;ve seen enough</ScrollButton>
		</main>
	);
}
