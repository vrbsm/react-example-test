import React from "react";
import { Login } from "../components";
const actionType = {
  START: "START",
  RESOLVE: "RESOLVE",
  REJECT: "REJECT",
};
function loginSubmissionReducer(state, action) {
  switch (action.type) {
    case actionType.START:
      return { status: "pending", responseData: null, errorMessage: null };
    case actionType.RESOLVE:
      return {
        status: "resolved",
        responseData: action.responseData,
        errorMessage: null,
      };
    case actionType.REJECT:
      return {
        status: "rejected",
        responseData: null,
        errorMessage: action.error.message,
      };
    default:
      return state;
  }
}

function useFormSubmission({ endpoint, data }) {
  const [state, dispatch] = React.useReducer(loginSubmissionReducer, {
    status: "idle",
    responseData: null,
    errorMessage: null,
  });
  // console.log("data", data);
  const fetchBody = data ? JSON.stringify(data) : null;

  React.useEffect(() => {
    if (fetchBody) {
      // console.log(fetchBody);
      dispatch({ type: actionType.START });
      window
        .fetch(endpoint, {
          method: "POST",
          body: fetchBody,
          headers: {
            "content-type": "application/json",
          },
        })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            dispatch({ type: actionType.RESOLVE, responseData: data });
          } else {
            dispatch({ type: actionType.REJECT, error: data });
          }
        })
        .catch((error) => dispatch({ type: actionType.REJECT, error: error }));
    }
  }, [fetchBody, endpoint]);

  // console.log(state);
  return state;
}

function LoginSubmission() {
  const [formData, setFormData] = React.useState(null);
  const { status, responseData, errorMessage } = useFormSubmission({
    endpoint: "https://reqres.in/api/login",
    data: formData,
  });

  return (
    <>
      {status}
      {status === "resolved" ? (
        <div>
          <span>Welcome - {responseData.token}</span>
        </div>
      ) : (
        <Login onSubmit={(data) => setFormData(data)} />
      )}
      {status === "pending" && (
        <div className="lds-ripple" aria-label="loading...">
          <div />
          <div />
        </div>
      )}
      {status === "rejected" && (
        <span>{errorMessage}</span>
      )}
    </>
  );
}

export default LoginSubmission;

// {
//     "email": "eve.holt@reqres.in",
//     "password": "cityslicka"
// }
