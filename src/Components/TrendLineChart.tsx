const TrendLineChart = () => {
	const dataPoints = [10, 12, 8, 15, 13, 18, 16, 20, 19, 22, 25, 23, 28, 26]; // Example task counts
	const dates = Array.from({ length: dataPoints.length }, (_, i) => {
		const d = new Date();
		d.setDate(d.getDate() - (dataPoints.length - 1 - i));
		return d;
	});

	const maxVal = Math.max(...dataPoints);
	const minVal = Math.min(...dataPoints);

	const svgWidth = 350;
	const svgHeight = 150;
	const plotXStart = 40;
	const plotYStart = 10;
	const plotWidth = svgWidth - plotXStart - 10;
	const plotHeight = svgHeight - plotYStart - 40;

	const yScale = (val) => {
		return plotYStart + plotHeight - ((val - minVal) / (maxVal - minVal + 1)) * plotHeight;
	};

	const xScale = (index) => {
		return plotXStart + (index * plotWidth) / (dataPoints.length - 1);
	};

	const yTicks = [];
	const tickStep = Math.max(1, Math.ceil((maxVal - minVal) / 4));
	for (let i = minVal; i <= maxVal + tickStep; i += tickStep) {
		yTicks.push(i);
	}
	if (!yTicks.includes(maxVal) && maxVal > minVal) {
		yTicks.push(maxVal);
		yTicks.sort((a, b) => a - b);
	}

	const getPathData = () => {
		if (dataPoints.length === 0) return '';
		let path = `M ${xScale(0)} ${yScale(dataPoints[0])}`;
		for (let i = 1; i < dataPoints.length; i++) {
			path += ` L ${xScale(i)} ${yScale(dataPoints[i])}`;
		}
		return path;
	};

	return (
		<div className="rounded-xl bg-gray-800 p-6 text-center shadow-sm">
			<h2 className="font-inter mb-4 text-xl font-semibold text-gray-400">Concurrent Tasks Trend</h2>
			<div className="flex h-48 items-center justify-center">
				{' '}
				{dataPoints.length > 1 ? (
					<svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="h-full w-full">
						{yTicks.map((tick, index) => (
							<g key={`y-tick-${index}`}>
								<line x1={plotXStart} y1={yScale(tick)} x2={plotXStart + plotWidth} y2={yScale(tick)} stroke="#e0e0e0" strokeWidth="0.5" />
								<text x={plotXStart - 5} y={yScale(tick)} dy="0.3em" textAnchor="end" fill="#6B7280" fontSize="10" fontFamily="Inter">
									{tick}
								</text>
							</g>
						))}

						{/* X-axis Line */}
						<line
							x1={plotXStart}
							y1={plotYStart + plotHeight}
							x2={plotXStart + plotWidth}
							y2={plotYStart + plotHeight}
							stroke="#6B7280"
							strokeWidth="1"
						/>

						{/* X-axis Labels (Dates) */}
						{dates.map((date, i) => (
							<text
								key={`x-label-${i}`}
								x={xScale(i)}
								y={plotYStart + plotHeight + 15}
								textAnchor="middle"
								fill="#6B7280"
								fontSize="9"
								fontFamily="Inter"
								transform={`rotate(45 ${xScale(i)} ${plotYStart + plotHeight + 15})`}
							>
								{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
							</text>
						))}

						<path d={getPathData()} fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

						{dataPoints.map((val, i) => (
							<circle key={i} cx={xScale(i)} cy={yScale(val)} r="3" fill="#4F46E5" stroke="white" strokeWidth="1.5" />
						))}
					</svg>
				) : (
					<p className="font-inter text-gray-600">Not enough data to display trend.</p>
				)}
			</div>
			<p className="font-inter mt-4 text-sm text-gray-500">Daily trend of tasks being worked on.</p>
		</div>
	);
};

export default TrendLineChart;
