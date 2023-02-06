import axios from "axios";
import HeaderType from "../../components/header/HeaderType";

export interface MetadataSurvey {
  Header: HeaderType;
}

/**
 * Un endpoint vers stromae-api pour recup les url spécifique à l'enquête plutôt que les coller dans l'url.
 * @param survey
 * @returns
 */

async function getMetadataSurvey(
  survey: string
): Promise<MetadataSurvey | undefined> {
  try {
    // TODO: Faire en sorte que l'on puisse acceder aux fichiers externe de Stromae
    const {
      data,
      // status
    } = await axios.get<MetadataSurvey>("/rp/parametres.json");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("error message: ", error.message);
    }
    return undefined;
  }
}

export default getMetadataSurvey;
