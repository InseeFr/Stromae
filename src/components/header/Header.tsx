import { 
  useEffect,
  useState 
} from "react"; 

import { Header as HeaderDSFR } from "@codegouvfr/react-dsfr/Header"; 
import { HeaderType } from "../../lib/surveys/getMetadataSurvey";

interface HeaderProps {
  header?: HeaderType
}

function Header(props: HeaderProps) {
//   useEffect(function(){
//     async function init() {
//       const data = await surveys.getMetadataSurvey(survey)
//         if (data) { 
//           const { Header } = data; 
//           setHeader(Header);
//         } 
//     };
//     init();
// },
//     [ survey ]
// )
  console.log(props)
  // if (props.header) {
    // const { brandTop } = props.header;
  // }
  const { header, setHeader } = useState(undefined);

  useEffect(function({header, setHeader, props}:{header: HeaderProps | undefined, setHeader: Function, props: HeaderProps})  {
    if (!header) {
      setHeader(props.header)
    }
  },[props])

  return (
    <HeaderDSFR
      brandTop={brandTop}
      homeLinkProps={{
        href: '/',
        title: 'Accueil - Nom de l’entité (ministère, secrétariat d‘état, gouvernement)'
      }}
      serviceTitle="Le recensement de la population"
      operatorLogo={{
        alt: '[À MODIFIER - texte alternatif de l’image]',
        imgUrl: process.env.PUBLIC_URL + "/logoINSEE.png" as string,
        orientation: 'horizontal'
      }}
      quickAccessItems={[
        {
          iconId: 'fr-icon-add-circle-line',
          linkProps: {
            href: '#'
          },
          text: 'Contacter l’assistance'
        },
        {
          iconId: 'fr-icon-lock-line',
          linkProps: {
            href: '#'
          },
          text: 'Me déconnecter'
        },
      ]}
    />
  ) ;
}

export default Header;
