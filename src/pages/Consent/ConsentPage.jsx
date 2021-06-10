import React from 'react'
import { useLocation, useParams } from 'react-router';
import AxiosCaller from '../../utils/AxiosCaller';

const ConsentPage = () => {

  //const { consent_challenge, client_name: clientName, requested_scope: requestedScopes } = useParams();

  const location = useLocation();

  const onConsent = async () => {
    try {
      const searchParams = new URLSearchParams(location.search);
      const challenge = searchParams.get("challenge");

      const { data: response } = await AxiosCaller.post("/v1/consent", { challenge })
      if (response?.redirectUri) {
        window.location.href = response?.redirectUri
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <p> The application {/* {clientName } */} wants access to the following information: </p>
{/*       <ul>
        {requestedScopes.map((scope, index) => (<li key={index}>{{ scope }}</li>))}
      </ul> */}
      <button onClick={onConsent}>Consent</button>
    </div>

  )
}

export default ConsentPage;