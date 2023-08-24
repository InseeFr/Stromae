type Props = {
	label?: string | number | boolean;
};

function toTitleCase(str: string) {
	// Transforms string to lowercase, except the first letter.
	return `${str.charAt(0).toUpperCase()}${str.toLowerCase().substring(1)}`;
}

export function BannerAddress(props: Props) {
	const { label } = props;

	if (!label) {
		return null;
	}
	return (
		<span className="fr-text--bold fr-mr-2w">
			{toTitleCase(label.toString())}
		</span>
	);
}
