
type ConvertContentProps = { content?: any };

function ConvertContent(props: ConvertContentProps) {
    if (!props.content.type) {
        return props.content;
    }
    if (props.content.type && props.content.type == "string") {
        return props.content?.value;
    }
    else if (props.content.type && props.content.type == "html") {
        return (
            <span dangerouslySetInnerHTML={{ __html: props.content?.value }
            } />
        )
    }
}

export default ConvertContent;

