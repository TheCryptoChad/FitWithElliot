import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Footer from '@/components/Footer';
import './globals.css';

const geistSans = localFont({
	src: './fonts/GeistVF.woff',
	variable: '--font-geist-sans',
	weight: '100 900',
});
const geistMono = localFont({
	src: './fonts/GeistMonoVF.woff',
	variable: '--font-geist-mono',
	weight: '100 900',
});

export const metadata: Metadata = {
	applicationName: 'FitWithElliot',
	title: 'FitWithElliot',
	description: `Get in shape like you've always wanted to!`,
	keywords:
		'FitWithElliot, Elliot, gym trainer, personal trainer, fitness, workout, exercise, health, wellness, bodybuilding, strength training, weight loss, muscle gain, fitness coach, online training, fitness programs, nutrition, healthy living, gym, training, personal coaching, fitness tips, workout plans, fitness goals, fitness journey, FitWithElliot training, FitWithElliot fitness, FitWithElliot programs, FitWithElliot coaching, cardio, HIIT, functional training, flexibility, endurance, stamina, sports training, athletic training, custom workout plans, diet plans, meal prep, fitness motivation, fitness inspiration, gym routines, fitness challenges, fitness community, fitness blog, fitness articles, fitness videos, fitness tutorials, fitness classes, group training, one-on-one training, virtual training, home workouts, gym workouts, fitness equipment, fitness gear, fitness apparel, fitness lifestyle, fitness transformation, fitness results, fitness success, fitness achievements, fitness milestones, fitness progress, fitness tracker, fitness app, fitness technology, fitness gadgets, fitness accessories, fitness supplements, fitness nutrition, fitness recipes, fitness meals, fitness snacks, fitness drinks, fitness hydration, fitness recovery, fitness rest, fitness sleep, fitness mental health, fitness mindset, fitness discipline, fitness consistency, fitness dedication, fitness perseverance, fitness goals, fitness achievements, fitness milestones, fitness progress, fitness tracker, fitness app, fitness technology, fitness gadgets, fitness accessories, fitness supplements, fitness nutrition, fitness recipes, fitness meals, fitness snacks, fitness drinks, fitness hydration, fitness recovery, fitness rest, fitness sleep, fitness mental health, fitness mindset, fitness discipline, fitness consistency, fitness dedication, fitness perseverance',
	authors: [{ name: 'Adham - TheCryptoChad', url: 'https://www.x.com/@TheCryptoChad_' }],
	openGraph: {
		title: 'FitWithElliot',
		description: `Get in shape like you've always wanted to!`,
		url: 'https://www.fitwithelliot.net/',
		siteName: 'FitWithElliot',
		type: 'website',
		images: [
			{
				url: 'https://www.fitwithelliot.net/logo.png',
				width: 630,
				height: 630,
				alt: 'FitWithElliot',
			},
		],
	},
	twitter: {
		card: 'summary',
		site: '@FitWithElliot',
		title: 'FitWithElliot',
		description: `Get in shape like you've always wanted to!`,
		images: 'https://www.fitwithelliot.net/logo.png',
	},
	robots: 'index, follow',
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${geistSans.variable} ${geistMono.variable} bg-[#EEEEEEE6] text-white antialiased`}>
				{children}
				<Footer />
			</body>
		</html>
	);
}
