import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { READ_ONLY } from 'utils/constants';
import { useAPI, useAuth, usePutData, useRemoteData } from 'utils/hooks';
import { API } from 'utils/api';

const OrchestratorManger = () => {
  const { authenticationType, oidcUser, login, logout } = useAuth();
  const { readonly, idQ, idSU } = useParams();
  const { search } = useLocation();

  const [sending, setSending] = useState(false);
  const [errorSending, setErrorSending] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const questionnnaireUrl = searchParams.get('questionnaire');
  }, [search]);

  const { data, questionnaire, errorMessage } = useRemoteData(idSU, idQ);
  const { putData } = useAPI(idQ, idSU);

  const sendData = async () => {
    setErrorSending(null);
    setSending(true);
    const { status, error } = await putData({});
    setSending(false);
    if (error) setErrorSending('Error during sending');
  };

  const isAuthenticated = oidcUser?.profile;

  useEffect(() => {
    if (questionnaire) {
      console.log(questionnaire);
    }
  }, [questionnaire]);

  return (
    <main>
      <h1>{`OrchestratorManger`}</h1>
      {authenticationType === 'OIDC' && (
        <>
          <button type="button" onClick={isAuthenticated ? logout : login}>
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
          <p>{`Readonly : ${readonly === READ_ONLY}`}</p>
          <p>{`Questionnaire : ${idQ}`}</p>
          <p>{`Survey unit : ${idSU}`}</p>
        </>
      )}
      {!errorMessage && (!data || !questionnaire) && <h3>chargement ...</h3>}
      {!errorMessage && data && questionnaire && (
        <>
          <h3>Pas d'erreur au chargement :)</h3>
          <button onClick={sendData}>Send data</button>
          {sending && <h4>Envoie en cours ...</h4>}
          {errorSending && <h4>{errorSending}</h4>}
        </>
      )}
      {errorMessage && <h3>{`Erreur : ${errorMessage}`}</h3>}
    </main>
  );
};
export default OrchestratorManger;
