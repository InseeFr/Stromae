import Heading from '@theme/Heading';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
	{
		title: `Système de Design de l'État - (DSFR)`,
		Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
		description: (
			<>
				Stromae utilise le Design Système Français de l'État, grâce à la
				librairie <code>@codegouvfr/react-dsfr</code>
			</>
		),
	},
	{
		title: 'Propulsé par @inseefr/Lunatic',
		Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
		description: (
			<>
				La librairie TS <code>@inseefr/lunatic</code> permet l'orchestration des
				composants à partir d'une description au format json d'un questionnaire.
			</>
		),
	},
];

function Feature({ Svg, title, description }) {
	return (
		<div className={clsx('col col--5')}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img" />
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
			</div>
		</div>
	);
}

export default function HomepageFeatures() {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
