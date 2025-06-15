'use client';
import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface PieChartProps {
	chartData: {
		labels: string[];
		datasets: {
			label: string;
			data: number[];
			backgroundColor: string[];
			hoverOffset?: number;
		}[];
	};
}

const PieChart: React.FC<PieChartProps> = ({ chartData }) => {
	const chartRef = useRef<HTMLCanvasElement>(null);
	useEffect(() => {
		let chart: Chart | undefined;
		if (chartRef.current) {
			chart = new Chart(chartRef.current, {
				type: 'pie',
				data: chartData,
				options: {
					plugins: {
						legend: {
							display: false
						},
						tooltip: {
							callbacks: {
								label: (context) => {
									const value = context.raw || 0;
									return `ticket: ${value}`;
								}
							}
						}
					}
				}
			});
		}
		return () => {
			chart?.destroy();
		};
	}, [chartData]);

	return (
		<div className="col-span-1 flex flex-col items-center justify-center rounded-xl bg-gray-800 p-6 shadow-sm md:col-span-2 lg:col-span-1 xl:col-span-2">
			<p className="font-inter mb-4 text-sm text-gray-300">Open Tickets</p>
			<div className="flex h-64 w-full items-center justify-center">
				<canvas className="cursor-pointer" ref={chartRef}></canvas>
			</div>
			<div className="font-inter mt-4 flex flex-wrap justify-center text-sm">
				{chartData.labels.map((label, index) => (
					<span key={index} className="mr-4 mb-2 flex items-center">
						<span className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}></span>
						{label}
					</span>
				))}
			</div>
		</div>
	);
};

export default PieChart;
