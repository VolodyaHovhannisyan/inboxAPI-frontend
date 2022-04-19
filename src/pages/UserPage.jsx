import { useEffect } from "react";
import { useState } from "react";
import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ExcelToJson from "../components/Converter";
import DataTable from "../components/Table";
import "../Home.css";
import { useRef } from "react";

function UserPage() {
  const [userData, setUserData] = useState([]);
  const [userDataFromDb, setUserDataFromDb] = useState([]);
  const [serverData, setServerData] = useState([]);
  const [initialUserData, setInitialUserData] = useState([]);
  const [showData, setShowData] = useState(true);
  const [downloadServerData, setDownloadServerData] = useState([]);
  const btnRef = useRef();

  useEffect(() => {
    fetch("https://inbox-api-backend.herokuapp.com/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setInitialUserData(data);
        setShowData(true);
      });

    return () => {
      fetch("https://inbox-api-backend.herokuapp.com/users", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          setInitialUserData(data);
          setShowData(true);
        });
    };
  }, []);

  const sendServer = async () => {
    if (userData.length > 1) {
      await fetch("https://inbox-api-backend.herokuapp.com/users/addw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => {
          setServerData(data);
          setDownloadServerData(
            userData.map((user, i) => {
              return {
                Name: user.name,
                Surname: user.surName,
                Email: user.login + "@" + data[0][i].domain,
                Password: data[1][i],
              };
            })
          );
          setShowData(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const saveInDatabase = async () => {
    if (userData.length > 1) {
      await fetch("https://inbox-api-backend.herokuapp.com/users/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadServerData),
      })
        .then((res) => res.json())
        .then((data) => {
          const successRegUsers = [];
          data.map((status, i) => {
            if (status === "Success") {
              successRegUsers.push(downloadServerData[i]);
            }
            return '';
          });
          if (successRegUsers.length > 1) {
              setDownloadServerData(successRegUsers);
              alert(`Saved ${successRegUsers.length} new accounts from ${downloadServerData.length} inserted`)
          } else {
            setDownloadServerData([]);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      {showData && <ExcelToJson setData={setUserData} />}
      {userData.length > 1 && showData && (
        <Stack sx={{ justifyContent: "center" }} direction="row" spacing={2}>
          <Button onClick={sendServer} variant="contained">
            Send to a server
          </Button>
        </Stack>
      )}
      {showData && (
        <DataTable initUserData={initialUserData} userDataDb={userDataFromDb} />
      )}
      {userData.length > 1 && serverData.length > 1 && !showData && (
        <DataTable userData={userData} regData={serverData[0]} />
      )}

      {downloadServerData.length > 1 && (
        <>
          <p id="notation">
            *Note, that in case if the some part or all of your inserted user
            credentials already exist, those won't saved in database.
          </p>
          <Stack sx={{ justifyContent: "center" }} direction="row" spacing={2}>
            <Button
              onClick={() => {
                btnRef.current.style.display = "none";
                return saveInDatabase();
              }}
              ref={btnRef}
              variant="contained"
            >
              Save in database
            </Button>
          </Stack>
        </>
      )}
      { downloadServerData.length > 1 ? (
        <ExcelToJson getData={downloadServerData} />
      ) : (
        <a href="/" id="hpbtn">
          Back to Homepage
        </a>
      )}
    </div>
  );
}

export default UserPage;
