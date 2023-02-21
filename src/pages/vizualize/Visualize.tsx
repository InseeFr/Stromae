import LocalLoadSourceData from './LocalLoadSourceData';

const RP = {
	source: '/rp/source.json',
	data: '/rp/data.json',
	metadata: '/rp/metadata.json',
};

function onChange() {}

function Hello() {
	return <>Hello!</>;
}

function Visualize() {
	return (
		<LocalLoadSourceData
			hrefSource={RP.source}
			hrefData={RP.data}
			onChange={onChange}
		>
			<Hello />
		</LocalLoadSourceData>
	);
}

export default Visualize;
