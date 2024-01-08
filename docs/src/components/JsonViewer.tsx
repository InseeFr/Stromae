import CodeBlock from '@theme/CodeBlock';

export const JsonViewer = ({ json }) => {
	return <CodeBlock language="json">{JSON.stringify(json, null, 2)}</CodeBlock>;
};
