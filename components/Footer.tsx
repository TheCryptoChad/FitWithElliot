import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='flex flex-col items-center gap-5 border-0 border-b-[10px] border-[#D90007] bg-black p-8'>
			<div className='flex items-center justify-center gap-5 max-lg:w-full max-lg:justify-between'>
				<Link
					className='text-xl font-bold text-[#D90007]'
					href='/'
				>
					Terms And Conditions
				</Link>

				<Link
					className='text-xl font-bold text-[#D90007]'
					href='/'
				>
					Privacy Policy
				</Link>
			</div>

			<p className='text-center text-xs font-bold italic'>IMPORTANT: Earnings and Legal Disclaimers</p>

			<p className='text-center text-xs'>
				We don't believe in get-rich-quick programs. We believe in hard work, adding value and serving others. And
				that's what our programs are designed to help you do. As stated by law, we can not and do not make any
				guarantees about your own ability to get results or earn any money with our ideas, information, programs or
				strategies. We don't know you and, besides, your results in life are up to you. Agreed? We're here to help by
				giving you our greatest strategies to move you forward, faster. However, nothing on this page or any of our
				websites or emails is a promise or guarantee of future earnings. Any financial numbers referenced here, or on
				any of our sites or emails, are simply estimates or projections or past results, and should not be considered
				exact, actual or as a promise of potential earnings - all numbers are illustrative only. Thanks for stopping by.
				Until next time, remember: close high-ticket offers, change your life.
			</p>

			<p className='text-center text-xs'>Copyright &copy; onlinetrainersecrets.com. All Rights Reserved.</p>
		</footer>
	);
}
