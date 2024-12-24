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
				The information provided on this website is for general informational purposes only and should not be construed
				as medical advice. While every effort has been made to ensure the accuracy of the information presented, the
				owner of this website makes no representations or warranties regarding the completeness, reliability, and
				suitability of the information.
			
				You should always consult with a physician or other qualified health provider before starting any new exercise
				program. The exercises, suggestions, and tips provided by this website may not be suitable for everyone. Any
				reliance you place on such information is strictly at your own risk.
			
				In no event will the owner or employees of this website be liable for any loss or damage arising from the use of
				this website or any linked websites. This includes, without limitation, indirect or consequential loss or
				damage, or any loss or damage whatsoever arising from loss of data or profits.
			</p>

			<p className='text-center text-xs'>Copyright &copy; onlinetrainersecrets.com. All Rights Reserved.</p>
		</footer>
	);
}
