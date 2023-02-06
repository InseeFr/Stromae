/*
 * TODO : regarder si certain type existent pas déjà dans react dsfr
 */

type Link = {
  href: string;
  targer?: string;
};

type ButtonProps = {
  onClick: (...args: any) => void;
};

export type QuickAccessItem = {
  iconId: string;
  linkProps?: Link;
  buttonProps?: ButtonProps;
  text: string;
};

type HeaderType = {
  brandTop: string;
  operatorLogo?: {
    alt?: string;
    imgUrl: string;
    orientation: "horizontal" | "vertical";
  };
  quickAccessItems?: Array<QuickAccessItem>;
};

export default HeaderType;
