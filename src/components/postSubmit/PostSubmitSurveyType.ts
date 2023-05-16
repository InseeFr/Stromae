export type WelcomeType = {
	TitleAdditionalInformation: string;
	DescriptionAdditional?: string;
	Feedback?: {
		title?: string;
		link?: {
			label: string;
			href: string;
			imageSrc?: string;
		};
	};
	Results?: {
		title?: string;
		link?: {
			label: string;
			href: string;
		};
	};
};
