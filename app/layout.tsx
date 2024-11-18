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
	title: 'FitWithElliot',
	description: "Get in shape like you've always wanted to!",
	icons: {
		icon: '/logo.png',
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
