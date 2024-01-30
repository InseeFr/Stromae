import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export const ImgViewer = ({ src }: { src: string }) => {
	const { siteConfig } = useDocusaurusContext();
	let finalSrc = `${src}`;
	let finalLink = `${src}`;
	if (!src.startsWith('http')) {
		finalSrc = require(`@site/static/${src}`).default;
		finalLink = `${siteConfig.baseUrl}/${src}`;
	}
	return (
		<a
			href={finalLink}
			target="_blank"
			rel="noreferrer"
			aria-label="sdfsdfdsfsdf"
			title="Cliquez pour voir plus"
		>
			<img src={finalSrc} />
		</a>
	);
};
