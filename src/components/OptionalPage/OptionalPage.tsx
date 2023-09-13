import { useContext, useState, useEffect, ReactElement } from 'react';
import { useNavigate } from 'react-router';
import { uri404 } from '../../lib/domainUri';
import { useAsyncEffect } from '../../hooks/useAsyncEffect';
import { loadSourceDataContext } from '../loadSourceData/LoadSourceDataContext';
import {
	OptionalPageElementsEnum,
	AcceptedElements,
	MetadataSurvey,
} from '../../typeStromae/type';
import { Link } from './elements/Link';
import { Title } from './elements/Title';
import { List } from './elements/List';
import { Section } from './elements/Section';

export function createPageElement(element: AcceptedElements, altId: string) {
	const { type, id } = element;

	switch (type) {
		case OptionalPageElementsEnum.Link:
			return <Link key={id ?? altId} {...element} />;
		case OptionalPageElementsEnum.Title:
			return <Title key={id ?? altId} {...element} />;
		case OptionalPageElementsEnum.List:
			return <List key={id ?? altId} {...element} />;
		case OptionalPageElementsEnum.Section:
			return <Section key={id ?? altId} {...element} />;
		default:
			return <></>;
	}
}

function createContent(
	content?: Array<AcceptedElements>
): Array<React.ReactElement> {
	if (!content) {
		return [];
	}
	return content.reduce((acc, element, index) => {
		return [...acc, createPageElement(element, `element-${index}`)];
	}, [] as Array<ReactElement>);
}

export function OptionalPage({ name }: { name?: string }) {
	const { getMetadata } = useContext(loadSourceDataContext);
	const [content, setContent] = useState<Array<AcceptedElements>>([]);
	const [metadata, setMetadata] = useState<MetadataSurvey>();
	const navigate = useNavigate();

	useEffect(() => {
		if (name && metadata) {
			if (name in metadata) {
				setContent(metadata[name]);
			} else {
				navigate(uri404());
			}
		}
	}, [name, metadata, navigate]);

	const body = createContent(content);

	useAsyncEffect(async () => {
		setMetadata(await getMetadata());
	}, [getMetadata]);

	return <div className="fr-col-lg-6 fr-col-md-9 fr-col-12">{body}</div>;
}
