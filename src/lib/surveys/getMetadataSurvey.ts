import axios from "axios"; 

export type HeaderType = { 
    brandTop: string, 
    operatorLogo?: {
        alt?: string, 
        imgUrl: string, 
        orientation: "horizontal" | "vertical"
    }   
}

export interface MetadataSurvey {
    Header: HeaderType;
  }
  
  /**
   * Un endpoint vers stromae-api pour recup les url spécifique à l'enquête plutôt que les coller dans l'url.
   * @param survey
   * @returns
   */

  async function getMetadataSurvey(survey: string): Promise<MetadataSurvey | undefined>{
    try {
        const {data, status } = await axios.get<MetadataSurvey>("/rp/parametres.json")  
        console.log("status: " + status) 
        console.log("data: " + data) 
        return data; 
    } catch(error) {
        if (axios.isAxiosError(error)) {
            console.error("error message: ", error.message)
        }
    return undefined
    }
  }

  
  export default getMetadataSurvey;
  