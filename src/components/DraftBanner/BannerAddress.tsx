type Props = {
	address?: string;
}

export function BannerAddress(props: Props) {
	const {address} = props;

	if (!address) {
		return null;
	}
	return (
		<span className="fr-text--bold fr-mr-2w">Recensement du {address}</span>
	)
}
