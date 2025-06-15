import Sidebar from '@/Components/Sidebar';

const Layout = ({ children }) => {
	return (
		<div className="font-inter flex min-h-screen bg-gray-700/80">
			<Sidebar />
			<div className="flex flex-1 flex-col lg:ml-40">
				<main className="flex-1 overflow-y-auto sm:p-10">{children}</main>
			</div>
		</div>
	);
};
export default Layout;
