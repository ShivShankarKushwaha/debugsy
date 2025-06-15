const Footer = () => {
	return (
		<footer className="rounded-t-xl bg-gray-950 px-4 py-10 text-center text-sm text-gray-400 md:px-12">
			<p>&copy; {new Date().getFullYear()} DEBUGSY. All rights reserved.</p>
			<div className="mt-4 flex flex-col justify-center gap-6 sm:flex-row">
				<a href="#" className="hover:text-emerald-400">
					Privacy Policy
				</a>
				<a href="#" className="hover:text-emerald-400">
					Terms of Service
				</a>
				<a href="#" className="hover:text-emerald-400">
					Support
				</a>
			</div>
		</footer>
	);
};
export default Footer;
